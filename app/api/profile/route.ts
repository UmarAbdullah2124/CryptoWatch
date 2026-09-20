import { NextResponse } from "next/server";
import { getProfileSummary } from "@/lib/profile";

export async function GET() {
  try {
    const profile = await getProfileSummary();

    if (!profile) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to load profile",
      },
      { status: 500 }
    );
  }
}
