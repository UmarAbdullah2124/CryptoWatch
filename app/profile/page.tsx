"use client";

import {
  Bell,
  Camera,
  Cog,
  LayoutGrid,
  List,
  LogOut,
  Search,
  Shield,
  User,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
  { label: "Watchlist", icon: List, href: "/watchlist" },
  { label: "Alerts", icon: Bell, href: "/alerts" },
  { label: "Market Data", icon: Search, href: "/market" },
  { label: "Profile", icon: User, href: "/profile", active: true },
  { label: "Settings", icon: Cog, href: "/settings" },
];

export default function ProfilePage() {
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
              <User size={24} color="#35ff62" />
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
                AGENT PROFILE
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
                Operator Node Clearance
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "236px 1fr",
              gap: 32,
              alignItems: "start",
            }}
          >
            <div style={{ display: "grid", gap: 24 }}>
              <div
                style={{
                  borderRadius: 24,
                  border: "1px solid #2b2b2b",
                  background:
                    "linear-gradient(180deg, rgba(28,28,28,1) 0%, rgba(24,24,24,1) 100%)",
                  padding: "32px 28px",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.02) inset, 0 16px 28px rgba(0,0,0,0.35)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 14,
                    right: 14,
                    top: 0,
                    height: 4,
                    borderRadius: "999px",
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(53,255,98,0.9) 50%, transparent 100%)",
                  }}
                />

                <div
                  style={{
                    width: 94,
                    height: 94,
                    margin: "0 auto",
                    borderRadius: 16,
                    border: "1px solid #275f30",
                    background: "#101910",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 34px rgba(53,255,98,0.12)",
                    position: "relative",
                  }}
                >
                  <Camera size={28} color="#35ff62" />
                  <div
                    style={{
                      position: "absolute",
                      right: -2,
                      bottom: -2,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#35ff62",
                    }}
                  />
                </div>

                <div
                  style={{
                    marginTop: 24,
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Update Data
                </div>

                <div
                  style={{
                    marginTop: 26,
                    textAlign: "center",
                    fontSize: 19,
                    fontWeight: 900,
                    fontStyle: "italic",
                    textTransform: "uppercase",
                  }}
                >
                  Zargham
                </div>
                <div
                  style={{
                    marginTop: 8,
                    textAlign: "center",
                    color: "#6f7681",
                    fontSize: 11,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                  }}
                >
                  Level 4 Operative
                </div>

                <button
                  type="button"
                  style={{
                    marginTop: 28,
                    width: "100%",
                    height: 60,
                    borderRadius: 18,
                    border: "1px solid #5c2626",
                    background: "#341919",
                    color: "#ff4e4e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                  }}
                >
                  <LogOut size={16} />
                  Terminate Session
                </button>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid #2b2b2b",
                  background: "#171717",
                  padding: "22px 26px",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.22)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 12,
                    color: "#a4abb5",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  <Zap size={16} color="#35ff62" />
                  <span>Status: Operational</span>
                </div>
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 12,
                    color: "#a4abb5",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  <Shield size={16} color="#35ff62" />
                  <span>Clearance: High</span>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gap: 32 }}>
              <div
                style={{
                  borderRadius: 24,
                  border: "1px solid #2b2b2b",
                  background: "#171717",
                  padding: "28px 32px 32px",
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
                  <Cog size={18} color="#35ff62" />
                  <span>System Preferences</span>
                </div>

                <div
                  style={{
                    marginTop: 28,
                    display: "grid",
                    gap: 24,
                  }}
                >
                  <div
                    style={{
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
                        Volatility Sensitivity
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
                        Protocol Delta &gt; -2.0%
                      </div>
                    </div>
                    <div
                      style={{
                        minWidth: 68,
                        height: 26,
                        borderRadius: 10,
                        background: "#244327",
                        color: "#35ff62",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "0 14px",
                      }}
                    >
                      Active
                    </div>
                  </div>

                  <div
                    style={{
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
                        Email Intelligence
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
                        Daily Summary Reports
                      </div>
                    </div>
                    <div
                      style={{
                        width: 42,
                        height: 24,
                        borderRadius: 999,
                        background: "#35ff62",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 3,
                          right: 3,
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "#111",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderRadius: 24,
                  border: "1px solid #2b2b2b",
                  background: "#171717",
                  padding: "28px 32px 32px",
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
                  <Shield size={18} color="#35ff62" />
                  <span>Security Link</span>
                </div>

                <div style={{ marginTop: 30, display: "grid", gap: 22 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 20,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: "#b4bac4",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      Two-Factor ID
                    </div>
                    <div
                      style={{
                        minWidth: 94,
                        height: 26,
                        borderRadius: 10,
                        background: "#243f25",
                        color: "#35ff62",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        padding: "0 14px",
                      }}
                    >
                      Verified
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 20,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: "#b4bac4",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      Last Uplink
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#79818c",
                        letterSpacing: "0.08em",
                      }}
                    >
                      2026-01-23 16:17 UTC
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
