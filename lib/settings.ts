import { getCurrentWatchlistUser } from "@/lib/watchlist";
import { prisma } from "@/lib/prisma";

export interface UserSettingsPayload {
  critical_sensitivity: number;
  updated_at: string;
}

function normalizeSensitivity(value: number) {
  if (!Number.isFinite(value)) {
    return -2;
  }

  return Math.min(-0.5, Math.max(-10, value));
}

export async function getUserSettings(): Promise<UserSettingsPayload> {
  const user = await getCurrentWatchlistUser();
  const settings = await prisma.userSetting.upsert({
    where: { user_id: user.id },
    update: {},
    create: { user_id: user.id },
  });

  return {
    critical_sensitivity: settings.critical_sensitivity,
    updated_at: settings.updated_at.toISOString(),
  };
}

export async function updateUserSettings(input: {
  critical_sensitivity?: number;
}): Promise<UserSettingsPayload> {
  const user = await getCurrentWatchlistUser();
  const settings = await prisma.userSetting.upsert({
    where: { user_id: user.id },
    update: {
      ...(typeof input.critical_sensitivity === "number"
        ? { critical_sensitivity: normalizeSensitivity(input.critical_sensitivity) }
        : {}),
    },
    create: {
      user_id: user.id,
      critical_sensitivity:
        typeof input.critical_sensitivity === "number"
          ? normalizeSensitivity(input.critical_sensitivity)
          : -2,
    },
  });

  return {
    critical_sensitivity: settings.critical_sensitivity,
    updated_at: settings.updated_at.toISOString(),
  };
}
