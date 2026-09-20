"use client";

import { useAlerts } from "@/app/alerts/live/use-alerts";

export function useDashboardAlerts() {
  return useAlerts(5);
}
