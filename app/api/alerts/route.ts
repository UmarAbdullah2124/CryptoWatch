import { NextResponse } from "next/server";
import { listAlerts } from "@/lib/alerts";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") ?? 50);
    const alerts = await listAlerts(Number.isFinite(limit) ? limit : 50);

    return NextResponse.json({ alerts });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to load alerts",
      },
      { status: 500 }
    );
  }
}
