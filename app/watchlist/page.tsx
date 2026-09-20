"use client";

import { Star, Trash2 } from "lucide-react";
import { TerminalShell } from "@/components/terminal-shell";

interface WatchlistAsset {
  id: string;
  asset_name: string;
  symbol: string;
  price: number;
  change_24h: number;
  iconColor: string;
}

const MOCK_ASSETS: WatchlistAsset[] = [
  { id: "1", asset_name: "Bitcoin", symbol: "BTC", price: 89278, change_24h: -0.8, iconColor: "#f7931a" },
  { id: "2", asset_name: "Ethereum", symbol: "ETH", price: 2935.64, change_24h: -1.87, iconColor: "#627eea" },
  { id: "3", asset_name: "Solana", symbol: "SOL", price: 127.11, change_24h: -2.21, iconColor: "#9945ff" },
  { id: "4", asset_name: "Cardano", symbol: "ADA", price: 0.36, change_24h: -1.0, iconColor: "#3773d1" },
  { id: "5", asset_name: "Polkadot", symbol: "DOT", price: 1.94, change_24h: -0.36, iconColor: "#e6007a" },
];

function formatPrice(price: number): string {
  if (price >= 1000) {
    return `$${price.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }

  return `$${price.toFixed(2)}`;
}

export default function WatchlistPage() {
  return (
    <TerminalShell active="watchlist">
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
            <Star size={24} color="#35ff62" fill="#35ff62" />
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
              MY WATCHLIST
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
              Priority Operational Targets
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: 38,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 18,
          }}
        >
          {MOCK_ASSETS.map((asset) => (
            <div
              key={asset.id}
              style={{
                borderRadius: 22,
                border: "1px solid #262626",
                background: "#171717",
                padding: "22px 22px 20px",
                boxShadow: "0 16px 28px rgba(0,0,0,0.24)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: asset.iconColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 900,
                    }}
                  >
                    {asset.symbol[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{asset.asset_name}</div>
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 11,
                        color: "#727984",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                      }}
                    >
                      {asset.symbol}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 12,
                    border: "1px solid #2a2a2a",
                    background: "transparent",
                    color: "#626975",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div
                style={{
                  marginTop: 28,
                  fontSize: 38,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {formatPrice(asset.price)}
              </div>
              <div
                style={{
                  marginTop: 8,
                  color: "#ff5b5b",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                {asset.change_24h.toFixed(2)}%
              </div>

              <button
                type="button"
                style={{
                  marginTop: 24,
                  width: "100%",
                  height: 44,
                  borderRadius: 14,
                  border: "1px solid #252525",
                  background: "#0f0f0f",
                  color: "#7b838d",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Full Analysis
              </button>
            </div>
          ))}
        </div>
      </div>
    </TerminalShell>
  );
}
