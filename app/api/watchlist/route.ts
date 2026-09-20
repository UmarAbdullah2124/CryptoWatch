import { NextResponse } from "next/server";
import { addToWatchlist, listWatchlistAssets } from "@/lib/watchlist";

export async function GET() {
  try {
    const assets = await listWatchlistAssets();
    return NextResponse.json({ assets });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to load watchlist",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const assetId = String(body.asset_id ?? "").trim();
    const assetName = String(body.asset_name ?? "").trim();

    if (!assetId || !assetName) {
      return NextResponse.json(
        { error: "asset_id and asset_name are required" },
        { status: 400 }
      );
    }

    const entry = await addToWatchlist({
      asset_id: assetId,
      asset_name: assetName,
    });

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to update watchlist",
      },
      { status: 500 }
    );
  }
}
