"use client";

import { Activity, BarChart3, Database, Globe2, TrendingUp } from "lucide-react";
import { TerminalShell } from "@/components/terminal-shell";
import {
  findCoin,
  formatCompactCurrency,
  formatCurrency,
  formatPercent,
} from "../dashboard-data";
import { useDashboardPrices } from "../use-dashboard-prices";
import { useAlerts } from "@/app/alerts/live/use-alerts";
import styles from "./dashboard-live.module.css";

export default function DashboardLivePage() {
  const { data, loading } = useDashboardPrices();
  const { alerts, error: alertsError, loading: alertsLoading } = useAlerts(5);
  const bitcoin = findCoin(data, "bitcoin");
  const ethereum = findCoin(data, "ethereum");
  const globalChange = data?.global.market_cap_change_percentage_24h_usd;
  const trendLabel = typeof globalChange === "number" && globalChange >= 0 ? "BULLISH" : "BEARISH";

  return (
    <TerminalShell active="dashboard">
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.titleIcon}>
              <BarChart3 size={24} color="#35ff62" />
            </div>
            <div>
              <h1 className={styles.title}>TERMINAL ONE</h1>
              <p className={styles.subtitle}>Real-Time Intelligence Aggregate V4.2.0</p>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.stack}>
            <div className={styles.cards}>
              <Panel title="Market Overview" icon={<Globe2 size={18} color="#35ff62" />}>
                <Metric label="Global Market Cap" value={formatCompactCurrency(data?.global.total_market_cap?.usd)} />
                <Metric label="24H Volume" value={formatCompactCurrency(data?.global.total_volume?.usd)} />
                <Metric label="Market Change" value={formatPercent(globalChange)} />
              </Panel>

              <CoinPanel
                name={bitcoin?.name ?? "Bitcoin"}
                pair={`${bitcoin?.symbol ?? "BTC"}/USD`}
                price={formatCurrency(bitcoin?.current_price)}
                change={bitcoin?.price_change_percentage_24h}
              />

              <CoinPanel
                name={ethereum?.name ?? "Ethereum"}
                pair={`${ethereum?.symbol ?? "ETH"}/USD`}
                price={formatCurrency(ethereum?.current_price)}
                change={ethereum?.price_change_percentage_24h}
              />
            </div>

            <Panel title="Sentry Analytics" icon={<TrendingUp size={18} color="#35ff62" />}>
              <p className={styles.analyticsText}>
                System sentiment is currently{" "}
                <span className={styles.accent}>{trendLabel}</span>.
                {loading ? " Syncing live CoinGecko market data." : " Live market data is synced."}
              </p>
            </Panel>
          </div>

          <Panel title="" icon={null}>
            <div className={styles.alertHeader}>
              <Activity size={18} color="#35ff62" />
              <div className={styles.panelTitle}>System Alerts</div>
              <div className={styles.feed}>Live Feed</div>
            </div>

            {alertsLoading ? (
              <div className={styles.empty}>Scanning top 100 assets</div>
            ) : null}

            {!alertsLoading && alertsError ? (
              <div className={styles.empty}>{alertsError}</div>
            ) : null}

            {!alertsLoading && !alertsError && alerts.length === 0 ? (
              <div className={styles.empty}>No alerts triggered</div>
            ) : null}

            {!alertsLoading && !alertsError && alerts.length > 0 ? (
              <div className={styles.alertList}>
                {alerts.map((alert) => (
                  <div className={styles.alertItem} key={alert.id}>
                    <div className={styles.alertTop}>
                      <div className={styles.alertAsset}>{alert.asset_name} Critical</div>
                      <div className={styles.alertDrop}>
                        {alert.drop_percentage.toFixed(2)}%
                      </div>
                    </div>
                    <div className={styles.alertText}>
                      Price crossed the -2% threshold at{" "}
                      {formatCurrency(alert.price_at_drop)}.
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </Panel>
        </div>
      </div>
    </TerminalShell>
  );
}

function Panel({
  children,
  icon,
  title,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className={styles.panel}>
      {title ? (
        <div className={styles.panelTitle}>
          {icon}
          <span>{title}</span>
        </div>
      ) : null}
      {children}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}

function CoinPanel({
  change,
  name,
  pair,
  price,
}: {
  change?: number | null;
  name: string;
  pair: string;
  price: string;
}) {
  const isDown = (change ?? 0) < 0;

  return (
    <div className={styles.panel}>
      <div className={styles.label}>{name}</div>
      <div className={styles.value}>{pair}</div>
      <div className={styles.price}>{price}</div>
      <div className={`${styles.badge} ${isDown ? styles.badgeDown : ""}`}>
        {formatPercent(change)}
      </div>
    </div>
  );
}
