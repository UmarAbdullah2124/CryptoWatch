import { NextResponse } from "next/server";
import { removeFromWatchlist } from "@/lib/watchlist";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Watchlist id is required" }, { status: 400 });
    }

    await removeFromWatchlist(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to remove watchlist item",
      },
      { status: 500 }
    );
  }
}
