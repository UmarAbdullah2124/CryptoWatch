"use client";

import { useEffect, useState } from "react";

export interface SettingsState {
  critical_sensitivity: number;
  updated_at: string;
}

const DEFAULT_SETTINGS: SettingsState = {
  critical_sensitivity: -2,
  updated_at: "",
};

export function useSettings() {
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        const response = await fetch("/api/settings", { cache: "no-store" });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error ?? "Unable to load settings");
        }

        if (isMounted) {
          setSettings(payload.settings);
          setError("");
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error instanceof Error ? error.message : "Unable to load settings");
          setLoading(false);
        }
      }
    }

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  async function saveSettings() {
    setSaving(true);
    setError("");
    setSavedMessage("");

    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to save settings");
      }

      setSettings(payload.settings);
      setSavedMessage("Settings committed");
      window.dispatchEvent(new Event("cryptowatch-settings-updated"));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to save settings");
    } finally {
      setSaving(false);
    }
  }

  return {
    error,
    loading,
    savedMessage,
    saving,
    saveSettings,
    setSettings,
    settings,
  };
}
