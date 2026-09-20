"use client";

import { Bell, CheckCircle2, Cog, Save } from "lucide-react";
import { TerminalShell } from "@/components/terminal-shell";
import { useSettings } from "./use-settings";
import styles from "./settings-live.module.css";

export default function LiveSettingsPage() {
  const {
    error,
    loading,
    savedMessage,
    saving,
    saveSettings,
    setSettings,
    settings,
  } = useSettings();

  const updateSensitivity = (value: string) => {
    setSettings((current) => ({
      ...current,
      critical_sensitivity: Number(value),
    }));
  };

  return (
    <TerminalShell active="settings">
      <section className={styles.settingsPage}>
        <header className={styles.header}>
          <div className={styles.titleIcon}>
            <Cog size={24} color="#35ff62" />
          </div>
          <div>
            <h1 className={styles.title}>System Settings</h1>
            <p className={styles.subtitle}>Global Protocol Configurations</p>
          </div>
        </header>

        {loading ? (
          <div className={styles.state}>Loading settings...</div>
        ) : (
          <div className={styles.stack}>
            <section className={styles.card}>
              <div className={styles.cardTitle}>
                <Bell size={18} color="#35ff62" />
                Threshold Monitoring
              </div>

              <div className={styles.settingRow}>
                <div>
                  <div className={styles.settingName}>Critical Sensitivity</div>
                  <div className={styles.settingHelp}>
                    Alerts are created when a coin drops beyond this 24H
                    percentage.
                  </div>
                </div>
                <div className={styles.value}>
                  {settings.critical_sensitivity.toFixed(1)}%
                </div>
              </div>

              <input
                aria-label="Critical sensitivity"
                className={styles.range}
                max="-0.5"
                min="-10"
                onChange={(event) => updateSensitivity(event.target.value)}
                step="0.1"
                type="range"
                value={settings.critical_sensitivity}
              />
            </section>

            <div className={styles.actions}>
              {(savedMessage || error) && (
                <span
                  className={`${styles.message} ${error ? styles.error : ""}`}
                >
                  {error || savedMessage}
                </span>
              )}
              <button
                className={styles.commit}
                disabled={saving}
                onClick={saveSettings}
                type="button"
              >
                {saving ? (
                  <>
                    <Save size={16} />
                    Committing
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    Commit Settings
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </section>
    </TerminalShell>
  );
}
