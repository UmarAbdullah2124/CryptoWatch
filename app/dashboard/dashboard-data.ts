import type { CoinMarket, PricesPayload } from "@/lib/prices";

export const fallbackBtcSparkline =
  "0,45 30,38 55,42 75,30 95,28 115,35 140,20 165,25 185,18 220,22";
export const fallbackEthSparkline =
  "0,42 25,44 50,38 80,36 100,40 125,28 150,30 175,22 200,26 220,20";

export const fallbackBarHeights = [35, 50, 42, 65, 48, 70, 58, 80, 62, 88, 72, 95];

export function formatCurrency(value: number | null | undefined): string {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "--";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value);
}

export function formatCompactCurrency(value: number | null | undefined): string {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "--";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number | null | undefined): string {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "--";
  }

  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function findCoin(data: PricesPayload | null, id: string): CoinMarket | undefined {
  return data?.coins.find((coin) => coin.id === id);
}

export function sparklinePoints(
  prices: number[] | undefined,
  fallback: string,
  width = 220,
  height = 78
): string {
  if (!prices || prices.length < 2) {
    return fallback;
  }

  const sampleSize = 12;
  const step = Math.max(1, Math.floor(prices.length / sampleSize));
  const sampled = prices.filter((_, index) => index % step === 0).slice(-sampleSize);
  const min = Math.min(...sampled);
  const max = Math.max(...sampled);
  const spread = max - min || 1;

  return sampled
    .map((price, index) => {
      const x = (index / Math.max(sampled.length - 1, 1)) * width;
      const y = height - ((price - min) / spread) * (height - 10) - 5;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function marketBarHeights(coins: CoinMarket[]): number[] {
  const values = coins
    .slice(0, 12)
    .map((coin) => Math.abs(coin.price_change_percentage_24h ?? 0));

  if (values.length < 12 || Math.max(...values) === 0) {
    return fallbackBarHeights;
  }

  const max = Math.max(...values);
  return values.map((value) => Math.max(18, Math.round((value / max) * 78)));
}

export function marketBarColor(change: number | null | undefined): string {
  return typeof change === "number" && change >= 0 ? "#245f31" : "#7b2b25";
}
