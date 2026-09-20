"use client";

import { AlertTriangle, Bell, Clock3 } from "lucide-react";
import { TerminalShell } from "@/components/terminal-shell";

interface CryptoAlert {
  id: string;
  asset_id: string;
  asset_name: string;
  price_at_drop: number;
  drop_percentage: number;
  detected_at: string;
}

const MOCK_ALERTS: CryptoAlert[] = [
  { id: "1", asset_id: "solana", asset_name: "SOL", price_at_drop: 142.15, drop_percentage: -3.1, detected_at: "2026-01-23T15:46:42Z" },
  { id: "2", asset_id: "ethereum", asset_name: "ETH", price_at_drop: 2340.2, drop_percentage: -2.8, detected_at: "2026-01-22T21:16:19Z" },
  { id: "3", asset_id: "bitcoin", asset_name: "BTC", price_at_drop: 62450.5, drop_percentage: -2.45, detected_at: "2026-01-22T20:48:43Z" },
];

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

function alertMessage(alert: CryptoAlert): string {
  if (alert.asset_id === "bitcoin") {
    return `Flash crash detected! Bitcoin dropped ${Math.abs(alert.drop_percentage).toFixed(2)}% in 30 seconds.`;
  }

  if (alert.asset_id === "ethereum") {
    return "High volatility alert! ETH liquidity fluctuation detected.";
  }

  return `Sudden price drop of ${Math.abs(alert.drop_percentage).toFixed(1)}% triggered emergency protocols.`;
}

export default function AlertsPage() {
  return (
    <TerminalShell active="alerts">
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              border: "1px solid #275f30",
              background: "#112513",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 28px rgba(53,255,98,0.08)",
            }}
          >
            <Bell size={24} color="#35ff62" />
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 34,
                fontWeight: 900,
                fontStyle: "italic",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
              }}
            >
              ALERT LOG
            </h1>
            <p
              style={{
                margin: "10px 0 0",
                fontSize: 11,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#6f7681",
              }}
            >
              System Protocol Violations
            </p>
          </div>
        </div>

        <div style={{ marginTop: 38, display: "grid", gap: 14 }}>
          {MOCK_ALERTS.map((alert) => (
            <div
              key={alert.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                borderRadius: 20,
                border: "1px solid #262626",
                background: "#171717",
                padding: "20px 22px",
                boxShadow: "0 16px 28px rgba(0,0,0,0.24)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  border: "1px solid #4a1a1a",
                  background: "#2a0a0a",
                  color: "#ff5959",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <AlertTriangle size={18} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {alert.asset_name} Critical
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#7d8590",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    @{formatPrice(alert.price_at_drop)} USD
                  </span>
                </div>
                <div style={{ fontSize: 14, color: "#a7adb7", lineHeight: 1.55 }}>
                  {alertMessage(alert)}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  color: "#727984",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                  paddingTop: 4,
                }}
              >
                <Clock3 size={13} />
                {formatTimestamp(alert.detected_at)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </TerminalShell>
  );
}
