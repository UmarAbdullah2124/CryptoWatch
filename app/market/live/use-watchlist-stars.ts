"use client";

import { useEffect, useMemo, useState } from "react";

interface WatchlistEntry {
  id: string;
  asset_id: string;
}

export function useWatchlistStars() {
  const [entries, setEntries] = useState<WatchlistEntry[]>([]);
  const [busyAssetId, setBusyAssetId] = useState<string | null>(null);

  async function loadWatchlist() {
    const response = await fetch("/api/watchlist", { cache: "no-store" });
    const payload = await response.json();

    if (response.ok) {
      setEntries(payload.assets ?? []);
      return payload.assets ?? [];
    }

    setEntries([]);
    return [] as WatchlistEntry[];
  }

  useEffect(() => {
    let isMounted = true;

    loadWatchlist().catch(() => {
      if (isMounted) {
        setEntries([]);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const entryByAssetId = useMemo(() => {
    return new Map(entries.map((entry) => [entry.asset_id, entry]));
  }, [entries]);

  async function toggleStar(asset: { id: string; name: string }) {
    const existing = entryByAssetId.get(asset.id);
    setBusyAssetId(asset.id);

    try {
      if (existing) {
        setEntries((current) =>
          current.filter((entry) => entry.asset_id !== asset.id)
        );

        const response = await fetch(`/api/watchlist/${existing.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Unable to remove asset from watchlist");
        }

        await loadWatchlist();

        return;
      }

      const optimisticId = `pending-${asset.id}`;
      setEntries((current) => [
        ...current,
        { id: optimisticId, asset_id: asset.id },
      ]);

      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asset_id: asset.id,
          asset_name: asset.name,
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to add asset to watchlist");
      }

      setEntries((current) =>
        current.map((entry) =>
          entry.id === optimisticId
            ? { id: payload.entry.id, asset_id: payload.entry.asset_id }
            : entry
        )
      );

      await loadWatchlist();
    } catch {
      await loadWatchlist();
    } finally {
      setBusyAssetId(null);
    }
  }

  return {
    busyAssetId,
    entryByAssetId,
    toggleStar,
  };
}
