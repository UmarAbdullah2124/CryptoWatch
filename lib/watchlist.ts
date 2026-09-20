import { prisma } from "@/lib/prisma";
import { getPrices } from "@/lib/prices";
import { auth } from "@/auth";

const DEFAULT_OPERATOR_EMAIL =
  process.env.DEFAULT_OPERATOR_EMAIL ?? "zargham12@gmail.com";

export interface WatchlistAsset {
  id: string;
  asset_id: string;
  asset_name: string;
  added_at: string;
  symbol: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  price_change_percentage_24h: number | null;
}

export async function getDefaultUser() {
  return prisma.user.upsert({
    where: { email: DEFAULT_OPERATOR_EMAIL },
    update: {},
    create: {
      email: DEFAULT_OPERATOR_EMAIL,
      password_hash: "development-placeholder",
    },
  });
}

export async function getCurrentWatchlistUser() {
  const session = await auth();

  if (session?.user?.id) {
    return prisma.user.findUniqueOrThrow({
      where: { id: session.user.id },
    });
  }

  return getDefaultUser();
}

export async function listWatchlistAssets(): Promise<WatchlistAsset[]> {
  const user = await getCurrentWatchlistUser();
  const [entries, prices] = await Promise.all([
    prisma.watchlist.findMany({
      where: { user_id: user.id },
      orderBy: { added_at: "desc" },
    }),
    getPrices(),
  ]);

  return entries.map((entry) => {
    const coin = prices.coins.find((item) => item.id === entry.asset_id);

    return {
      id: entry.id,
      asset_id: entry.asset_id,
      asset_name: entry.asset_name,
      added_at: entry.added_at.toISOString(),
      symbol: coin?.symbol ?? entry.asset_id,
      image: coin?.image ?? "",
      current_price: coin?.current_price ?? null,
      market_cap: coin?.market_cap ?? null,
      price_change_percentage_24h: coin?.price_change_percentage_24h ?? null,
    };
  });
}

export async function addToWatchlist(input: {
  asset_id: string;
  asset_name: string;
}) {
  const user = await getCurrentWatchlistUser();

  return prisma.watchlist.upsert({
    where: {
      user_id_asset_id: {
        user_id: user.id,
        asset_id: input.asset_id,
      },
    },
    update: {},
    create: {
      user_id: user.id,
      asset_id: input.asset_id,
      asset_name: input.asset_name,
    },
  });
}

export async function removeFromWatchlist(id: string) {
  const user = await getCurrentWatchlistUser();

  return prisma.watchlist.deleteMany({
    where: {
      id,
      user_id: user.id,
    },
  });
}
