"use client";

import { useEffect, useState } from "react";
import type { WatchlistAsset } from "@/lib/watchlist";
import { usePollingInterval } from "@/hooks/use-polling-interval";

interface WatchlistState {
  assets: WatchlistAsset[];
  error: string | null;
  loading: boolean;
}

export function useWatchlistAssets(): WatchlistState & {
  removeAsset: (id: string) => Promise<void>;
} {
  const pollingInterval = usePollingInterval();
  const [state, setState] = useState<WatchlistState>({
    assets: [],
    error: null,
    loading: true,
  });

  async function loadAssets() {
    try {
      const response = await fetch("/api/watchlist", { cache: "no-store" });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to load watchlist");
      }

      setState({
        assets: payload.assets ?? [],
        error: null,
        loading: false,
      });
    } catch (error) {
      setState((current) => ({
        ...current,
        error:
          error instanceof Error ? error.message : "Unable to load watchlist",
        loading: false,
      }));
    }
  }

  useEffect(() => {
    loadAssets();
    const intervalId = window.setInterval(loadAssets, pollingInterval);

    return () => window.clearInterval(intervalId);
  }, [pollingInterval]);

  async function removeAsset(id: string) {
    const previousAssets = state.assets;
    setState((current) => ({
      ...current,
      assets: current.assets.filter((asset) => asset.id !== id),
    }));

    try {
      const response = await fetch(`/api/watchlist/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to remove asset");
      }
    } catch (error) {
      setState((current) => ({
        ...current,
        assets: previousAssets,
        error: error instanceof Error ? error.message : "Unable to remove asset",
      }));
    }
  }

  return {
    ...state,
    removeAsset,
  };
}
