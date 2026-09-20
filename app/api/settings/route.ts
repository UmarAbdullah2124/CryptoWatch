import { NextResponse } from "next/server";
import { getUserSettings, updateUserSettings } from "@/lib/settings";

export async function GET() {
  try {
    const settings = await getUserSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to load settings",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const settings = await updateUserSettings({
      critical_sensitivity:
        typeof body.critical_sensitivity === "number"
          ? body.critical_sensitivity
          : undefined,
    });

    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to save settings",
      },
      { status: 500 }
    );
  }
}
