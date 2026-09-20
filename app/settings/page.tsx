"use client";

import {
  Bell,
  Cog,
  Eye,
  LayoutGrid,
  List,
  Search,
  Shield,
  Smartphone,
  User,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
  { label: "Watchlist", icon: List, href: "/watchlist" },
  { label: "Alerts", icon: Bell, href: "/alerts" },
  { label: "Market Data", icon: Search, href: "/market" },
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Settings", icon: Cog, href: "/settings", active: true },
];

export default function SettingsPage() {
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
          display: "flex",
          justifyContent: "center",
          overflowY: "auto",
          padding: "56px 40px 40px",
        }}
      >
        <div style={{ width: 766 }}>
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
              <Cog size={24} color="#35ff62" />
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
                SYSTEM SETTINGS
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
                Global Protocol Configurations
              </p>
            </div>
          </div>

          <div style={{ marginTop: 46, display: "grid", gap: 32 }}>
            <div
              style={{
                borderRadius: 24,
                border: "1px solid #2b2b2b",
                background: "#171717",
                padding: "32px 32px 30px",
                boxShadow: "0 16px 28px rgba(0,0,0,0.28)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 16,
                  fontWeight: 900,
                  fontStyle: "italic",
                  textTransform: "uppercase",
                }}
              >
                <Bell size={18} color="#35ff62" />
                <span>Threshold Monitoring</span>
              </div>

              <div
                style={{
                  marginTop: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Critical Sensitivity
                </div>
                <div
                  style={{
                    color: "#35ff62",
                    fontSize: 18,
                    fontWeight: 900,
                    letterSpacing: "0.02em",
                  }}
                >
                  -2.0%
                </div>
              </div>

              <div
                style={{
                  marginTop: 28,
                  height: 6,
                  borderRadius: 999,
                  background: "#2b2b2b",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "15%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#19ff42",
                    boxShadow: "0 0 16px rgba(25,255,66,0.45)",
                  }}
                />
              </div>

              <p
                style={{
                  margin: "16px 0 0",
                  fontSize: 13,
                  color: "#7b838d",
                  fontStyle: "italic",
                  letterSpacing: "0.04em",
                }}
              >
                Trigger emergency protocols when price drop exceeds this
                threshold within a 30s cycle.
              </p>

              <div
                style={{
                  marginTop: 34,
                  borderRadius: 18,
                  border: "1px solid #292929",
                  background: "#222222",
                  padding: "16px 16px 16px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 18,
                }}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>
                    Aggressive Polling
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 11,
                      color: "#707782",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    Increase Frequency To 10S Intervals
                  </div>
                </div>
                <div
                  style={{
                    width: 48,
                    height: 26,
                    borderRadius: 999,
                    background: "#3a3f49",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 4,
                      left: 4,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "#7d8693",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                borderRadius: 24,
                border: "1px solid #2b2b2b",
                background: "#171717",
                padding: "32px 32px 30px",
                boxShadow: "0 16px 28px rgba(0,0,0,0.28)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 16,
                  fontWeight: 900,
                  fontStyle: "italic",
                  textTransform: "uppercase",
                }}
              >
                <Eye size={18} color="#35ff62" />
                <span>Interface Adaptation</span>
              </div>

              <div
                style={{
                  marginTop: 30,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 18,
                }}
              >
                <div
                  style={{
                    borderRadius: 18,
                    border: "1px solid #2a6c34",
                    background: "#143119",
                    padding: "20px 22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: 78,
                    boxShadow: "0 0 18px rgba(53,255,98,0.08) inset",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "#1d5d28",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Smartphone size={18} color="#35ff62" />
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        textTransform: "uppercase",
                      }}
                    >
                      Compact UI
                    </div>
                  </div>
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      border: "4px solid #19ff42",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div
                  style={{
                    borderRadius: 18,
                    border: "1px solid #242424",
                    background: "#1b1b1b",
                    padding: "20px 22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: 78,
                    opacity: 0.55,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "#242424",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Eye size={18} color="#7d8693" />
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        textTransform: "uppercase",
                      }}
                    >
                      Expanded View
                    </div>
                  </div>
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      border: "1px solid #3a3f49",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: 8,
              }}
            >
              <button
                type="button"
                style={{
                  height: 52,
                  minWidth: 288,
                  borderRadius: 18,
                  border: "none",
                  background: "#12ff39",
                  color: "#041706",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  boxShadow: "0 0 30px rgba(18,255,57,0.30)",
                }}
              >
                <Shield size={16} />
                Commit Changes
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
