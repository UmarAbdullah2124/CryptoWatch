"use client";

import { Activity, BarChart3, Database, Globe2, TrendingUp, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { TerminalShell } from "@/components/terminal-shell";
import {
  fallbackBtcSparkline,
  fallbackEthSparkline,
  findCoin,
  formatCompactCurrency,
  formatCurrency,
  formatPercent,
  marketBarColor,
  marketBarHeights,
  sparklinePoints,
} from "./dashboard-data";
import { useDashboardPrices } from "./use-dashboard-prices";
import { useDashboardAlerts } from "./use-dashboard-alerts";
import { useWatchlistStars } from "../market/live/use-watchlist-stars";

export default function DashboardPage() {
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [spotlight, setSpotlight] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const { data, error, loading } = useDashboardPrices();
  const { alerts, error: alertsError, loading: alertsLoading } = useDashboardAlerts();
  const { busyAssetId, entryByAssetId, toggleStar } = useWatchlistStars();
  const bitcoin = findCoin(data, "bitcoin");
  const ethereum = findCoin(data, "ethereum");
  const globalChange = data?.global.market_cap_change_percentage_24h_usd;
  const barHeights = marketBarHeights(data?.coins ?? []);
  const changeColor = typeof globalChange === "number" && globalChange >= 0 ? "#35ff62" : "#ff5b5b";
  const trendLabel = typeof globalChange === "number" && globalChange >= 0 ? "BULLISH" : "BEARISH";
  const btcDominance = data?.global.market_cap_percentage?.btc;

  const tutorialTargets = [
    { id: "terminal-header", title: "Overview", description: "This panel gives you a quick snapshot of the live market intelligence feed." },
    { id: "market-overview-panel", title: "Market Overview", description: "Track global cap, volume, and sentiment across the entire crypto market." },
    { id: "priority-target-panel", title: "Watchlist", description: "Keep your most important assets pinned here for quick follow-up." },
    { id: "alerts-panel", title: "Alerts", description: "Review critical price moves and sudden volatility events in real time." },
  ];

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("cryptowatch-dashboard-tutorial") === "true";
    if (!hasSeenTutorial) {
      setTutorialOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!tutorialOpen) {
      return;
    }

    const target = document.getElementById(tutorialTargets[tutorialStep]?.id ?? "");

    if (!target) {
      return;
    }

    const rect = target.getBoundingClientRect();
    setSpotlight({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    });
  }, [tutorialOpen, tutorialStep]);

  const closeTutorial = () => {
    localStorage.setItem("cryptowatch-dashboard-tutorial", "true");
    setTutorialOpen(false);
  };

  const nextTutorialStep = () => {
    if (tutorialStep < tutorialTargets.length - 1) {
      setTutorialStep((current) => current + 1);
      return;
    }

    closeTutorial();
  };

  return (
    <TerminalShell active="dashboard" scrollable={false}>
      <div style={{ width: "100%", maxWidth: 1180, margin: "0 auto" }}>
        <div
          id="terminal-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                border: "1px solid #1f5a2b",
                background: "linear-gradient(135deg, rgba(53,255,98,0.16), rgba(16,41,18,0.8))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 28px rgba(53,255,98,0.15)",
              }}
            >
              <BarChart3 size={23} color="#35ff62" />
            </div>
            <div>
              <div
                style={{
                  margin: 0,
                  fontSize: 10,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "#6f7681",
                }}
              >
                Real-Time Intelligence Aggregate
              </div>
              <h1
                style={{
                  margin: "6px 0 0",
                  fontSize: 32,
                  fontWeight: 900,
                  fontStyle: "italic",
                  letterSpacing: "-0.05em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                CryptoWatch Terminal
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 12px",
                borderRadius: 12,
                background: "rgba(22, 38, 23, 0.9)",
                border: "1px solid #24462b",
                color: "#8ef0a7",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#35ff62",
                  boxShadow: "0 0 12px #35ff62",
                  display: "inline-block",
                }}
              />
              Live System
            </div>

          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2.1fr) minmax(270px, 0.9fr)",
            gap: 16,
          }}
        >
          <div style={{ display: "grid", gap: 18 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(220px, 0.9fr) minmax(0, 1fr) minmax(0, 1fr)",
                gap: 16,
              }}
            >
              <Panel id="market-overview-panel">
                <PanelTitle icon={<Globe2 size={18} color="#35ff62" />} title="Market Overview" />
                <StatRow
                  icon={<Globe2 size={18} color="#35ff62" />}
                  label="Global Market Cap"
                  value={formatCompactCurrency(data?.global.total_market_cap?.usd)}
                />
                <StatRow
                  icon={<Database size={18} color="#60a5fa" />}
                  label="24H Volume"
                  value={formatCompactCurrency(data?.global.total_volume?.usd)}
                />
                <StatRow
                  icon={<BarChart3 size={18} color={changeColor} />}
                  label="Market Change"
                  value={formatPercent(globalChange)}
                />
              </Panel>

              <PriceCard
                assetId={bitcoin?.id ?? "bitcoin"}
                assetName={bitcoin?.name ?? "Bitcoin"}
                coin={bitcoin?.name ?? "Bitcoin"}
                pair={`${bitcoin?.symbol ?? "BTC"}/USD`}
                price={formatCurrency(bitcoin?.current_price)}
                sparkline={sparklinePoints(bitcoin?.sparkline_in_7d?.price, fallbackBtcSparkline)}
                status={formatPercent(bitcoin?.price_change_percentage_24h)}
                isDown={(bitcoin?.price_change_percentage_24h ?? 0) < 0}
                isStarred={entryByAssetId.has(bitcoin?.id ?? "bitcoin")}
                isBusy={busyAssetId === (bitcoin?.id ?? "bitcoin")}
                onToggleStar={() =>
                  toggleStar({
                    id: bitcoin?.id ?? "bitcoin",
                    name: bitcoin?.name ?? "Bitcoin",
                  })
                }
              />
              <PriceCard
                assetId={ethereum?.id ?? "ethereum"}
                assetName={ethereum?.name ?? "Ethereum"}
                coin={ethereum?.name ?? "Ethereum"}
                pair={`${ethereum?.symbol ?? "ETH"}/USD`}
                price={formatCurrency(ethereum?.current_price)}
                sparkline={sparklinePoints(ethereum?.sparkline_in_7d?.price, fallbackEthSparkline)}
                status={formatPercent(ethereum?.price_change_percentage_24h)}
                isDown={(ethereum?.price_change_percentage_24h ?? 0) < 0}
                isStarred={entryByAssetId.has(ethereum?.id ?? "ethereum")}
                isBusy={busyAssetId === (ethereum?.id ?? "ethereum")}
                onToggleStar={() =>
                  toggleStar({
                    id: ethereum?.id ?? "ethereum",
                    name: ethereum?.name ?? "Ethereum",
                  })
                }
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(220px, 0.72fr)",
                gap: 16,
              }}
            >
              <Panel>
                <PanelTitle icon={<TrendingUp size={18} color="#35ff62" />} title="Sentry Analytics" />
                <p
                  style={{
                    margin: "10px 0 0",
                    maxWidth: 460,
                    fontSize: 13,
                    color: "#a7adb7",
                    lineHeight: 1.5,
                  }}
                >
                  AI-driven sentiment analysis suggests a{" "}
                  <span style={{ color: changeColor, fontWeight: 800 }}>{trendLabel}</span> trend.
                  {loading ? " Syncing live CoinGecko market data." : " Live market data is synced."}
                </p>
                <div style={{ position: "absolute", right: 22, top: 18, opacity: 0.14 }}>
                  <Zap size={60} color="#35ff62" />
                </div>
                <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <MetricCard
                    label="BTC Dominance"
                    value={btcDominance ? `${btcDominance.toFixed(1)}%` : "--"}
                  />
                  <MetricCard
                    label="Active Coins"
                    value={data?.global.active_cryptocurrencies.toLocaleString("en-US") ?? "--"}
                    valueColor="#35ff62"
                  />
                </div>
              </Panel>

              <Panel>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.24em",
                    color: "#6f7681",
                    textTransform: "uppercase",
                  }}
                >
                  24H Market Change
                </div>
                <div style={{ marginTop: 10, color: changeColor, fontSize: 32, fontWeight: 900 }}>
                  {formatPercent(globalChange)}
                </div>
                <div style={{ marginTop: 24, display: "flex", alignItems: "flex-end", gap: 6, height: 78 }}>
                  {barHeights.map((height, index) => (
                    <div
                      key={index}
                      style={{
                        flex: 1,
                        height,
                        borderRadius: "6px 6px 0 0",
                        background: marketBarColor(data?.coins[index]?.price_change_percentage_24h),
                      }}
                    />
                  ))}
                </div>
              </Panel>
            </div>
          </div>

          <Panel id="alerts-panel">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Activity size={18} color="#35ff62" />
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 900,
                  fontStyle: "italic",
                  textTransform: "uppercase",
                }}
              >
                System Alerts
              </div>
              <div
                style={{
                  height: 22,
                  padding: "0 10px",
                  borderRadius: 10,
                  background: "#251515",
                  color: "#ff5b5b",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Live Feed
              </div>
            </div>

            <div
              id="priority-target-panel"
              style={{
                marginTop: 16,
                padding: "10px 12px",
                borderRadius: 14,
                border: "1px solid #213a28",
                background: "rgba(16, 41, 18, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#7d8a94",
                  }}
                >
                  Priority Targets
                </div>
                <div style={{ marginTop: 4, fontSize: 20, fontWeight: 900 }}>{entryByAssetId.size}</div>
              </div>
              <div style={{ fontSize: 11, color: "#a7adb7", textAlign: "right" }}>
                {entryByAssetId.size > 0
                  ? Array.from(entryByAssetId.values())
                      .slice(0, 3)
                      .map((item) => item.asset_id)
                      .join(" / ")
                  : "No targets"}
              </div>
            </div>

            <div style={{ minHeight: 374, marginTop: 22 }}>
              {alertsLoading ? (
                <div
                  style={{
                    minHeight: 330,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#5f6671",
                    fontSize: 15,
                  }}
                >
                  Scanning market drops
                </div>
              ) : null}

              {!alertsLoading && (alertsError || error) ? (
                <div style={{ color: "#ff7474", fontSize: 12 }}>
                  {alertsError ?? error}
                </div>
              ) : null}

              {!alertsLoading && !alertsError && !error && alerts.length === 0 ? (
                <div
                  style={{
                    minHeight: 330,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#5f6671",
                    fontSize: 15,
                  }}
                >
                  No alerts triggered
                </div>
              ) : null}

              {!alertsLoading && !alertsError && alerts.length > 0 ? (
                <div style={{ display: "grid", gap: 12 }}>
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      style={{
                        borderRadius: 16,
                        border: "1px solid #3a2020",
                        background: "linear-gradient(180deg, rgba(44,24,24,0.9), rgba(22,17,17,0.95))",
                        padding: "14px 16px",
                        boxShadow: "inset 0 0 0 1px rgba(255,91,91,0.08)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 900,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          {alert.asset_name} Critical
                        </div>
                        <div style={{ color: "#ff5b5b", fontSize: 13, fontWeight: 900 }}>
                          {alert.drop_percentage.toFixed(2)}%
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: 8,
                          color: "#a7adb7",
                          fontSize: 12,
                          lineHeight: 1.45,
                        }}
                      >
                        Price crossed the -2% threshold at {formatCurrency(alert.price_at_drop)}.
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </Panel>
        </div>
      </div>

      {tutorialOpen && spotlight ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(7, 10, 14, 0.72)",
            zIndex: 40,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: spotlight.left - 12,
              top: spotlight.top - 12,
              width: spotlight.width + 24,
              height: spotlight.height + 24,
              borderRadius: 18,
              border: "2px solid #35ff62",
              boxShadow: "0 0 0 9999px rgba(7, 10, 14, 0.72), 0 0 28px rgba(53,255,98,0.28)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: Math.min(window.innerWidth - 310, spotlight.left + spotlight.width + 24),
              top: Math.max(24, spotlight.top + 16),
              width: 280,
              padding: "18px 18px 16px",
              borderRadius: 18,
              border: "1px solid #2a3e31",
              background: "rgba(17,24,20,0.96)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.32)",
              pointerEvents: "auto",
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#7adf8a",
              }}
            >
              Quick Tour
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
              }}
            >
              {tutorialTargets[tutorialStep]?.title}
            </div>
            <p
              style={{
                margin: "10px 0 16px",
                color: "#b4bbc5",
                fontSize: 13,
                lineHeight: 1.55,
              }}
            >
              {tutorialTargets[tutorialStep]?.description}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <button
                type="button"
                onClick={closeTutorial}
                style={{
                  flex: 1,
                  border: "1px solid #2e2e2e",
                  background: "transparent",
                  color: "#d5d9df",
                  borderRadius: 10,
                  padding: "10px 12px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Skip
              </button>
              <button
                type="button"
                onClick={nextTutorialStep}
                style={{
                  flex: 1,
                  border: "1px solid #35ff62",
                  background: "#112713",
                  color: "#35ff62",
                  borderRadius: 10,
                  padding: "10px 12px",
                  cursor: "pointer",
                  fontWeight: 800,
                }}
              >
                {tutorialStep === tutorialTargets.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </TerminalShell>
  );
}

function Panel({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div
      id={id}
      style={{
        position: "relative",
        borderRadius: 22,
        border: "1px solid #262626",
        background: "#171717",
        padding: 20,
        boxShadow: "0 16px 28px rgba(0,0,0,0.24)",
      }}
    >
      {children}
    </div>
  );
}

function PanelTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
        fontSize: 16,
        fontWeight: 900,
        fontStyle: "italic",
        textTransform: "uppercase",
      }}
    >
      {icon}
      <span>{title}</span>
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 14,
          background: "#1d1d1d",
          border: "1px solid #2a2a2a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: 10,
            color: "#6f7681",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
        <div style={{ marginTop: 5, fontSize: 20, fontWeight: 800 }}>{value}</div>
      </div>
    </div>
  );
}

function PriceCard({
  assetId,
  assetName,
  coin,
  pair,
  price,
  sparkline,
  status,
  isDown,
  isStarred,
  isBusy,
  onToggleStar,
}: {
  assetId: string;
  assetName: string;
  coin: string;
  pair: string;
  price: string;
  sparkline: string;
  status: string;
  isDown: boolean;
  isStarred: boolean;
  isBusy: boolean;
  onToggleStar: () => void;
}) {
  return (
    <Panel>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div
          style={{
            fontSize: 11,
            color: "#6f7681",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {coin}
        </div>
        <button
          type="button"
          onClick={onToggleStar}
          disabled={isBusy}
          aria-label={isStarred ? `Remove ${assetName} from watchlist` : `Add ${assetName} to watchlist`}
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            border: `1px solid ${isStarred ? "#35ff62" : "#2c2c2c"}`,
            background: isStarred ? "rgba(53,255,98,0.12)" : "#171717",
            color: isStarred ? "#35ff62" : "#8a919c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 900,
            opacity: isBusy ? 0.7 : 1,
          }}
        >
          {isStarred ? "★" : "☆"}
        </button>
      </div>
      <div
        style={{
          marginTop: 6,
          fontSize: 24,
          fontWeight: 900,
          textTransform: "uppercase",
        }}
      >
        {pair}
      </div>
      <div style={{ marginTop: 20, fontSize: 30, fontWeight: 700, letterSpacing: "-0.04em" }}>
        {price}
      </div>
      <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
        <svg width="180" height="62" viewBox="0 0 220 78" fill="none">
          <polyline
            points={sparkline}
            fill="none"
            stroke="#35ff62"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div
          style={{
            height: 28,
            padding: "0 10px",
            borderRadius: 10,
            border: `1px solid ${isDown ? "#ff5b5b" : "#35ff62"}`,
            color: isDown ? "#ff5b5b" : "#35ff62",
            display: "flex",
            alignItems: "center",
            fontSize: 11,
            fontWeight: 800,
            textTransform: "uppercase",
          }}
        >
          {status}
        </div>
        <div
          style={{
            fontSize: 9,
            color: "#6f7681",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            textAlign: "right",
          }}
        >
          Real-Time Data Feed
        </div>
      </div>
    </Panel>
  );
}

function MetricCard({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div
      style={{
        borderRadius: 18,
        border: "1px solid #2a2a2a",
        background: "#202020",
        padding: "16px 16px 14px",
      }}
    >
      <div
        style={{
          fontSize: 9,
          color: "#6f7681",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div style={{ marginTop: 8, fontSize: 18, fontWeight: 800, color: valueColor ?? "#fff" }}>
        {value}
      </div>
    </div>
  );
}
