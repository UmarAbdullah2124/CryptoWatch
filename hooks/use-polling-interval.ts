"use client";

import { useEffect, useState } from "react";

const DEFAULT_INTERVAL_MS = 30_000;
const AGGRESSIVE_INTERVAL_MS = 10_000;

export function usePollingInterval() {
  const [intervalMs, setIntervalMs] = useState(DEFAULT_INTERVAL_MS);

  useEffect(() => {
    let isMounted = true;

    async function loadPollingPreference() {
      try {
        const response = await fetch("/api/settings", { cache: "no-store" });
        const payload = await response.json();

        if (response.ok && isMounted) {
          setIntervalMs(
            payload.settings?.aggressive_polling
              ? AGGRESSIVE_INTERVAL_MS
              : DEFAULT_INTERVAL_MS
          );
        }
      } catch {
        if (isMounted) {
          setIntervalMs(DEFAULT_INTERVAL_MS);
        }
      }
    }

    loadPollingPreference();
    window.addEventListener("cryptowatch-settings-updated", loadPollingPreference);

    return () => {
      isMounted = false;
      window.removeEventListener("cryptowatch-settings-updated", loadPollingPreference);
    };
  }, []);

  return intervalMs;
}
