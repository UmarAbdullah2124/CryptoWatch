"use client";

import { useEffect, useState } from "react";
import { usePollingInterval } from "@/hooks/use-polling-interval";

export interface CryptoAlert {
  id: string;
  asset_id: string;
  asset_name: string;
  price_at_drop: number;
  drop_percentage: number;
  detected_at: string;
}

interface AlertsState {
  alerts: CryptoAlert[];
  error: string | null;
  loading: boolean;
}

export function useAlerts(limit = 50) {
  const pollingInterval = usePollingInterval();
  const [state, setState] = useState<AlertsState>({
    alerts: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadAlerts() {
      try {
        const response = await fetch(`/api/alerts?limit=${limit}`, {
          cache: "no-store",
        });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error ?? "Unable to load alerts");
        }

        if (isMounted) {
          setState({
            alerts: payload.alerts ?? [],
            error: null,
            loading: false,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState((current) => ({
            alerts: current.alerts,
            error: error instanceof Error ? error.message : "Unable to load alerts",
            loading: false,
          }));
        }
      }
    }

    loadAlerts();
    const intervalId = window.setInterval(loadAlerts, pollingInterval);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [limit, pollingInterval]);

  return state;
}
