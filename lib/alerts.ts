import { prisma } from "@/lib/prisma";
import { getPrices } from "@/lib/prices";
import { getUserSettings } from "@/lib/settings";

export interface AlertPayload {
  id: string;
  asset_id: string;
  asset_name: string;
  price_at_drop: number;
  drop_percentage: number;
  detected_at: string;
}

const DEDUPE_WINDOW_MS = 30 * 60 * 1000;
const DEFAULT_DROP_THRESHOLD = -2;

function buildLiveAlerts(
  prices: Awaited<ReturnType<typeof getPrices>>,
  dropThreshold: number,
  limit: number
): AlertPayload[] {
  return prices.coins
    .filter((coin) => {
      return (
        typeof coin.price_change_percentage_24h === "number" &&
        coin.price_change_percentage_24h <= dropThreshold &&
        typeof coin.current_price === "number"
      );
    })
    .slice(0, limit)
    .map((coin) => ({
      id: `live-${coin.id}`,
      asset_id: coin.id,
      asset_name: coin.symbol.toUpperCase(),
      price_at_drop: coin.current_price ?? 0,
      drop_percentage: coin.price_change_percentage_24h ?? 0,
      detected_at: prices.cachedAt,
    }));
}

async function getDropThreshold() {
  try {
    const settings = await getUserSettings();
    return settings.critical_sensitivity;
  } catch {
    return DEFAULT_DROP_THRESHOLD;
  }
}

async function persistPriceDropAlerts(
  prices: Awaited<ReturnType<typeof getPrices>>,
  dropThreshold: number
) {
  const dedupeSince = new Date(Date.now() - DEDUPE_WINDOW_MS);
  const droppingCoins = prices.coins.filter((coin) => {
    return (
      typeof coin.price_change_percentage_24h === "number" &&
      coin.price_change_percentage_24h <= dropThreshold &&
      typeof coin.current_price === "number"
    );
  });

  await Promise.all(
    droppingCoins.map(async (coin) => {
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
        return null;
      }

      return prisma.cryptoAlert.create({
        data: {
          asset_id: coin.id,
          asset_name: coin.symbol.toUpperCase(),
          price_at_drop: coin.current_price ?? 0,
          drop_percentage: coin.price_change_percentage_24h ?? 0,
        },
      });
    })
  );
}

export async function syncPriceDropAlerts() {
  const prices = await getPrices();
  const dropThreshold = await getDropThreshold();

  await persistPriceDropAlerts(prices, dropThreshold);
}

export async function listAlerts(limit = 50): Promise<AlertPayload[]> {
  const prices = await getPrices();
  const dropThreshold = await getDropThreshold();
  const liveAlerts = buildLiveAlerts(prices, dropThreshold, limit);

  try {
    const alerts = await prisma.cryptoAlert.findMany({
      orderBy: {
        detected_at: "desc",
      },
      take: limit,
    });

    return alerts.map((alert) => ({
      id: alert.id,
      asset_id: alert.asset_id,
      asset_name: alert.asset_name,
      price_at_drop: alert.price_at_drop,
      drop_percentage: alert.drop_percentage,
      detected_at: alert.detected_at.toISOString(),
    }));
  } catch {
    return liveAlerts;
  }
}
