const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const PORT = Number(process.env.PORT ?? 4000);
const COINGECKO_API = "https://api.coingecko.com/api/v3";
const POLL_INTERVAL_MS = Number(process.env.SURVEILLANCE_POLL_INTERVAL_MS ?? 30_000);
const DROP_THRESHOLD = Number(process.env.CRITICAL_DROP_THRESHOLD ?? -2);
const ALERT_DEDUPE_MS = Number(process.env.ALERT_DEDUPE_MS ?? 60_000);

const baselinePrices = new Map();
const recentAlerts = new Map();

let latestPayload = null;
let latestError = null;
let polling = false;
let intervalId = null;
let server = null;
let lastStartedAt = null;
let lastFinishedAt = null;

app.use(express.json());

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function log(event, context = {}) {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      event,
      ...context,
    })
  );
}

async function fetchJson(path, retries = 3) {
  const url = `${COINGECKO_API}${path}`;

  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "User-Agent": "CryptoWatch-Engine/1.0",
        },
      });

      if (response.status === 429) {
        const waitTime = 2 ** attempt * 1000;
        log("COINGECKO_RATE_LIMIT", { attempt: attempt + 1, waitTime });
        await sleep(waitTime);
        continue;
      }

      if (!response.ok) {
        throw new Error(`CoinGecko request failed with status ${response.status}`);
      }

      return response.json();
    } catch (error) {
      log("COINGECKO_FETCH_FAILED", {
        attempt: attempt + 1,
        error: error instanceof Error ? error.message : String(error),
      });

      if (attempt === retries - 1) {
        throw error;
      }

      await sleep(2 ** attempt * 1000);
    }
  }

  throw new Error("CoinGecko request failed");
}

async function fetchMarketData() {
  const [coins, globalResponse] = await Promise.all([
    fetchJson(
      "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d&locale=en"
    ),
    fetchJson("/global"),
  ]);

  return {
    coins,
    global: globalResponse.data,
    cachedAt: new Date().toISOString(),
  };
}

async function createAlert(coin, dropPercentage) {
  const now = Date.now();
  const lastAlertTime = recentAlerts.get(coin.id) ?? 0;

  if (now - lastAlertTime < ALERT_DEDUPE_MS) {
    return;
  }

  const dedupeSince = new Date(now - ALERT_DEDUPE_MS);
  const existingAlert = await prisma.cryptoAlert.findFirst({
    where: {
      asset_id: coin.id,
      detected_at: {
        gte: dedupeSince,
      },
    },
    select: {
      id: true,
    },
  });

  if (existingAlert) {
    recentAlerts.set(coin.id, now);
    return;
  }

  const alert = await prisma.cryptoAlert.create({
    data: {
      asset_id: coin.id,
      asset_name: coin.symbol.toUpperCase(),
      price_at_drop: coin.current_price ?? 0,
      drop_percentage: dropPercentage,
    },
  });

  recentAlerts.set(coin.id, now);
  log("ALERT_TRIGGERED", {
    asset: coin.symbol.toUpperCase(),
    price: coin.current_price,
    drop: Number(dropPercentage.toFixed(4)),
    alertId: alert.id,
  });
}

async function detectFlashCrashes(coins) {
  for (const coin of coins) {
    if (typeof coin.current_price !== "number" || coin.current_price <= 0) {
      continue;
    }

    const baseline = baselinePrices.get(coin.id);

    if (typeof baseline !== "number" || baseline <= 0) {
      baselinePrices.set(coin.id, coin.current_price);
      continue;
    }

    const dropPercentage = ((coin.current_price - baseline) / baseline) * 100;

    if (dropPercentage <= DROP_THRESHOLD) {
      await createAlert(coin, dropPercentage);
    }

    baselinePrices.set(coin.id, coin.current_price);
  }
}

async function runSurveillanceCycle() {
  if (polling) {
    log("SURVEILLANCE_SKIPPED", { reason: "previous cycle still running" });
    return;
  }

  polling = true;
  lastStartedAt = new Date().toISOString();

  try {
    const payload = await fetchMarketData();
    latestPayload = payload;
    latestError = null;
    await detectFlashCrashes(payload.coins);
    lastFinishedAt = new Date().toISOString();
    log("SURVEILLANCE_CYCLE_COMPLETE", {
      coins: payload.coins.length,
      cachedAt: payload.cachedAt,
    });
  } catch (error) {
    latestError = error instanceof Error ? error.message : String(error);
    log("SURVEILLANCE_CYCLE_FAILED", { error: latestError });
  } finally {
    polling = false;
  }
}

app.get("/health", (_request, response) => {
  response.json({
    status: latestError ? "degraded" : "ok",
    engine: "cryptowatch-surveillance-engine",
    polling,
    cachedCoins: latestPayload?.coins.length ?? 0,
    cachedAt: latestPayload?.cachedAt ?? null,
    lastStartedAt,
    lastFinishedAt,
    lastError: latestError,
    pollIntervalMs: POLL_INTERVAL_MS,
  });
});

app.get("/prices", (_request, response) => {
  if (!latestPayload) {
    response.status(503).json({
      error: latestError ?? "Surveillance cache is warming up",
    });
    return;
  }

  response.json(latestPayload);
});

app.get("/alerts", async (request, response) => {
  const limit = Number(request.query.limit ?? 50);

  try {
    const alerts = await prisma.cryptoAlert.findMany({
      orderBy: {
        detected_at: "desc",
      },
      take: Number.isFinite(limit) ? limit : 50,
    });

    response.json({
      alerts: alerts.map((alert) => ({
        id: alert.id,
        asset_id: alert.asset_id,
        asset_name: alert.asset_name,
        price_at_drop: alert.price_at_drop,
        drop_percentage: alert.drop_percentage,
        detected_at: alert.detected_at.toISOString(),
      })),
    });
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : "Unable to load alerts",
    });
  }
});

async function shutdown(signal) {
  log("ENGINE_SHUTDOWN_REQUESTED", { signal });

  if (intervalId) {
    clearInterval(intervalId);
  }

  await prisma.$disconnect();

  if (server) {
    server.close(() => {
      log("ENGINE_STOPPED");
      process.exit(0);
    });
    return;
  }

  process.exit(0);
}

server = app.listen(PORT, () => {
  log("ENGINE_STARTED", { port: PORT, pollIntervalMs: POLL_INTERVAL_MS });
  runSurveillanceCycle();
  intervalId = setInterval(runSurveillanceCycle, POLL_INTERVAL_MS);
});

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
