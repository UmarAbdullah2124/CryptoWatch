import { NextResponse } from "next/server";
import { getPrices } from "@/lib/prices";

export async function GET() {
  try {
    const prices = await getPrices();

    return NextResponse.json(prices, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load CoinGecko market data",
      },
      { status: 502 }
    );
  }
}
