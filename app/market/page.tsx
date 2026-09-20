"use client";

import { Bell, Cog, LayoutGrid, Search, Star, User, List } from "lucide-react";

interface MarketAsset {
  id: string;
  name: string;
  symbol: string;
  quote: string;
  delta: number;
  marketCap: string;
  accent: string;
  starred?: boolean;
}

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
  { label: "Watchlist", icon: List, href: "/watchlist" },
  { label: "Alerts", icon: Bell, href: "/alerts" },
  { label: "Market Data", icon: Search, href: "/market", active: true },
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Settings", icon: Cog, href: "/settings" },
];

const MARKET_ASSETS: MarketAsset[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    quote: "$89,278",
    delta: -0.8,
    marketCap: "$1782.25B",
    accent: "#f7931a",
    starred: true,
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    quote: "$2,935.64",
    delta: -1.87,
    marketCap: "$353.91B",
    accent: "#627eea",
    starred: true,
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    quote: "$0.999",
    delta: -0.04,
    marketCap: "$186.68B",
    accent: "#26a17b",
  },
  {
    id: "bnb",
    name: "BNB",
    symbol: "BNB",
    quote: "$886.36",
    delta: -0.61,
    marketCap: "$120.87B",
    accent: "#f3ba2f",
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP",
    quote: "$1.91",
    delta: -1.37,
    marketCap: "$115.92B",
    accent: "#f1f1f1",
  },
  {
    id: "usdc",
    name: "USDC",
    symbol: "USDC",
    quote: "$1",
    delta: -0.01,
    marketCap: "$73.38B",
    accent: "#2775ca",
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    quote: "$127.11",
    delta: -2.21,
    marketCap: "$71.91B",
    accent: "#8b5cf6",
    starred: true,
  },
  {
    id: "trx",
    name: "TRON",
    symbol: "TRX",
    quote: "$0.303",
    delta: 0.95,
    marketCap: "$28.75B",
    accent: "#ef4444",
  },
  {
    id: "steth",
    name: "Lido Staked Ether",
    symbol: "STETH",
    quote: "$2,934.3",
    delta: -1.85,
    marketCap: "$27.44B",
    accent: "#7dd3fc",
  },
  {
    id: "doge",
    name: "Dogecoin",
    symbol: "DOGE",
    quote: "$0.125",
    delta: -0.53,
    marketCap: "$21.03B",
    accent: "#d4af37",
  },
];

function deltaColor(delta: number) {
  return delta > 0 ? "#4dff7a" : "#ff5656";
}

function deltaArrow(delta: number) {
  return delta > 0 ? "~" : "~";
}

export default function MarketPage() {
  return (
    <main
      style={{
        display: "flex",
        height: "100vh",
        background: "#090909",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <aside
        style={{
          width: 248,
          minWidth: 248,
          borderRight: "1px solid #171717",
          background: "#0b0b0b",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "28px 26px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              border: "1px solid #1f5f29",
              background: "#112313",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 0 1px rgba(47,255,93,0.06) inset",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z"
                stroke="#35ff62"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 900 }}>CRYPTOWATCH</div>
            <div
              style={{
                marginTop: 4,
                fontSize: 10,
                letterSpacing: "0.24em",
                color: "#6e747d",
                textTransform: "uppercase",
              }}
            >
              LIVE FEED
            </div>
          </div>
        </div>

        <nav style={{ padding: "18px 14px", display: "grid", gap: 6 }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  height: 48,
                  padding: "0 14px",
                  borderRadius: 16,
                  color: item.active ? "#35ff62" : "#b8bcc5",
                  textDecoration: "none",
                  background: item.active ? "#102912" : "transparent",
                  boxShadow: item.active
                    ? "inset 4px 0 0 #35ff62, 0 0 22px rgba(53,255,98,0.08)"
                    : "none",
                  fontSize: 14,
                  fontWeight: item.active ? 700 : 500,
                }}
              >
                <Icon size={18} />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div style={{ flex: 1 }} />

        <div style={{ padding: 12 }}>
          <div
            style={{
              borderRadius: 18,
              border: "1px solid #222",
              background: "#141414",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "#17311b",
                color: "#35ff62",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 900,
              }}
            >
              Z
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                Zargham
              </div>
              <div
                style={{
                  marginTop: 2,
                  fontSize: 10,
                  color: "#66706a",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                zargham12@gmail...
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
                stroke="#7f8590"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </aside>

      <section
        style={{
          flex: 1,
          padding: "60px 56px 36px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 24,
            marginBottom: 34,
          }}
        >
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 19h16M7 16V8M12 16V5M17 16v-3"
                  stroke="#35ff62"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
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
                MARKET EXPLORER
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
                Asset Index & Liquidity Map
              </p>
            </div>
          </div>

          <div
            style={{
              width: 320,
              height: 46,
              borderRadius: 14,
              border: "1px solid #2a2a2a",
              background: "#171717",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0 16px",
              color: "#6f7681",
              flexShrink: 0,
            }}
          >
            <Search size={18} />
            <span
              style={{
                fontSize: 13,
                color: "#596170",
                letterSpacing: "0.08em",
              }}
            >
              Search Index...
            </span>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            borderRadius: 16,
            border: "1px solid #262626",
            background: "#141414",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.1fr 1fr 1.2fr 92px",
              padding: "18px 26px",
              background: "#1f1f1f",
              color: "#6c7380",
              fontSize: 11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            <span>Asset</span>
            <span>Last Quote</span>
            <span>24H Delta</span>
            <span>Market Cap</span>
            <span style={{ textAlign: "center" }}>Actions</span>
          </div>

          <div style={{ overflowY: "auto", minHeight: 0 }}>
            {MARKET_ASSETS.map((asset, index) => (
              <div
                key={asset.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1.1fr 1fr 1.2fr 92px",
                  alignItems: "center",
                  padding: "16px 26px",
                  borderTop: index === 0 ? "none" : "1px solid #202020",
                  background: asset.id === "usdt" ? "#222222" : "#171717",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: asset.accent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: asset.id === "xrp" ? "#111" : "#fff",
                      fontSize: 14,
                      fontWeight: 900,
                      flexShrink: 0,
                    }}
                  >
                    {asset.symbol[0]}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: asset.id === "usdt" ? 800 : 700,
                        color: asset.id === "usdt" ? "#35ff62" : "#fff",
                      }}
                    >
                      {asset.name}
                    </div>
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 11,
                        letterSpacing: "0.16em",
                        color: "#757d87",
                        textTransform: "uppercase",
                      }}
                    >
                      {asset.symbol}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                  }}
                >
                  {asset.quote}
                </div>

                <div
                  style={{
                    color: deltaColor(asset.delta),
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  {deltaArrow(asset.delta)} {Math.abs(asset.delta).toFixed(2)}%
                </div>

                <div style={{ fontSize: 13, color: "#8a919e" }}>
                  {asset.marketCap}
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    type="button"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 14,
                      border: asset.starred
                        ? "1px solid #35ff62"
                        : "1px solid #2a2a2a",
                      background: asset.starred ? "#152917" : "transparent",
                      color: asset.starred ? "#35ff62" : "#6f7681",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: asset.starred
                        ? "0 0 18px rgba(53,255,98,0.12)"
                        : "none",
                    }}
                  >
                    <Star
                      size={16}
                      fill={asset.starred ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
