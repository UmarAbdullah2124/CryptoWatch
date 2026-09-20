"use client";

import { useEffect, useState } from "react";
import type { PricesPayload } from "@/lib/prices";
import { usePollingInterval } from "@/hooks/use-polling-interval";

interface MarketPricesState {
  data: PricesPayload | null;
  error: string | null;
  loading: boolean;
}

export function useMarketPrices(): MarketPricesState {
  const pollingInterval = usePollingInterval();
  const [state, setState] = useState<MarketPricesState>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadPrices() {
      try {
        const response = await fetch("/api/prices", { cache: "no-store" });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error ?? "Unable to load market data");
        }

        if (isMounted) {
          setState({
            data: payload as PricesPayload,
            error: null,
            loading: false,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState((current) => ({
            data: current.data,
            error:
              error instanceof Error
                ? error.message
                : "Unable to load market data",
            loading: false,
          }));
        }
      }
    }

    loadPrices();
    const intervalId = window.setInterval(loadPrices, pollingInterval);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [pollingInterval]);

  return state;
}
