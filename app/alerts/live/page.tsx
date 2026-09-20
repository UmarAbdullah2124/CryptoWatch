"use client";

import { AlertTriangle, Bell, Clock3 } from "lucide-react";
import { TerminalShell } from "@/components/terminal-shell";
import styles from "./alerts-live.module.css";
import { type CryptoAlert, useAlerts } from "./use-alerts";

export default function AlertsLivePage() {
  const { alerts, error, loading } = useAlerts(50);

  return (
    <TerminalShell active="alerts">
      <div className={styles.alertsPage}>
        <div className={styles.header}>
          <div className={styles.titleIcon}>
            <Bell size={24} color="#35ff62" />
          </div>
          <div>
            <h1 className={styles.title}>ALERT LOG</h1>
            <p className={styles.subtitle}>Drops beyond -2% / Database Feed</p>
          </div>
        </div>

        {loading ? (
          <State title="Scanning Market" text="Checking top 100 assets for -2% drops." />
        ) : null}

        {!loading && error ? (
          <State title="Alert Feed Offline" text={error} error />
        ) : null}

        {!loading && !error && alerts.length === 0 ? (
          <State
            title="No Alerts Triggered"
            text="No top-100 asset is currently below the -2% threshold."
          />
        ) : null}

        {!loading && !error && alerts.length > 0 ? (
          <div className={styles.list}>
            {alerts.map((alert) => (
              <AlertRow alert={alert} key={alert.id} />
            ))}
          </div>
        ) : null}
      </div>
    </TerminalShell>
  );
}

function AlertRow({ alert }: { alert: CryptoAlert }) {
  return (
    <div className={styles.alertRow}>
      <div className={styles.alertIcon}>
        <AlertTriangle size={18} />
      </div>

      <div className={styles.content}>
        <div className={styles.alertHead}>
          <span className={styles.asset}>{alert.asset_name} Critical</span>
          <span className={styles.price}>@{formatPrice(alert.price_at_drop)} USD</span>
        </div>
        <div className={styles.message}>
          {alert.asset_name} dropped {Math.abs(alert.drop_percentage).toFixed(2)}%.
          Emergency protocols triggered after crossing the -2% threshold.
        </div>
      </div>

      <div className={styles.time}>
        <Clock3 size={13} />
        {formatTimestamp(alert.detected_at)}
      </div>
    </div>
  );
}

function State({
  error,
  text,
  title,
}: {
  error?: boolean;
  text: string;
  title: string;
}) {
  return (
    <div className={`${styles.state} ${error ? styles.error : ""}`}>
      <div>
        <div className={styles.stateTitle}>{title}</div>
        <div className={styles.stateText}>{text}</div>
      </div>
    </div>
  );
}

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function formatPrice(price: number): string {
  if (price >= 1000) {
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  }

  return price.toString();
}
