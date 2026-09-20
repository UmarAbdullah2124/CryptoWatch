export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  total_volume: number | null;
  price_change_percentage_24h: number | null;
  price_change_percentage_7d_in_currency?: number | null;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface GlobalMarketData {
  active_cryptocurrencies: number;
  markets: number;
  total_market_cap: Record<string, number>;
  total_volume: Record<string, number>;
  market_cap_percentage: Record<string, number>;
  market_cap_change_percentage_24h_usd: number;
}

export interface PricesPayload {
  coins: CoinMarket[];
  global: GlobalMarketData;
  cachedAt: string;
}

const COINGECKO_API = "https://api.coingecko.com/api/v3";
const EXPRESS_ENGINE_URL =
  process.env.EXPRESS_ENGINE_URL ?? "http://localhost:4000";
const CACHE_TTL_MS = 30_000;

let memoryCache: PricesPayload | null = null;
let cacheExpiresAt = 0;
let pendingRequest: Promise<PricesPayload> | null = null;

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${COINGECKO_API}${path}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "User-Agent": "CryptoWatch/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`CoinGecko request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function refreshPrices(): Promise<PricesPayload> {
  const [coins, globalResponse] = await Promise.all([
    fetchJson<CoinMarket[]>(
      "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d&locale=en"
    ),
    fetchJson<{ data: GlobalMarketData }>("/global"),
  ]);

  const payload = {
    coins,
    global: globalResponse.data,
    cachedAt: new Date().toISOString(),
  };

  memoryCache = payload;
  cacheExpiresAt = Date.now() + CACHE_TTL_MS;
  return payload;
}

async function getEnginePrices(): Promise<PricesPayload | null> {
  try {
    const response = await fetch(`${EXPRESS_ENGINE_URL}/prices`, {
      cache: "no-store",
      signal: AbortSignal.timeout(1500),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as PricesPayload;
  } catch {
    return null;
  }
}

export async function getPrices(): Promise<PricesPayload> {
  const enginePrices = await getEnginePrices();

  if (enginePrices) {
    memoryCache = enginePrices;
    cacheExpiresAt = Date.now() + CACHE_TTL_MS;
    return enginePrices;
  }

  if (memoryCache && Date.now() < cacheExpiresAt) {
    return memoryCache;
  }

  if (!pendingRequest) {
    pendingRequest = refreshPrices().finally(() => {
      pendingRequest = null;
    });
  }

  return pendingRequest;
}
