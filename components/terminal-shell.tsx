"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useSession } from "next-auth/react";
import {
  Bell,
  Cog,
  LayoutGrid,
  List,
  Search,
  Shield,
  User,
} from "lucide-react";

type NavKey =
  | "dashboard"
  | "watchlist"
  | "alerts"
  | "market"
  | "profile"
  | "settings";

interface TerminalShellProps {
  active: NavKey;
  children: ReactNode;
  scrollable?: boolean;
}

const NAV_ITEMS = [
  { key: "dashboard" as const, label: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
  { key: "watchlist" as const, label: "Watchlist", icon: List, href: "/watchlist" },
  { key: "alerts" as const, label: "Alerts", icon: Bell, href: "/alerts" },
  { key: "market" as const, label: "Market Data", icon: Search, href: "/market" },
  { key: "profile" as const, label: "Profile", icon: User, href: "/profile" },
  { key: "settings" as const, label: "Settings", icon: Cog, href: "/settings" },
];

export function TerminalShell({
  active,
  children,
  scrollable = true,
}: TerminalShellProps) {
  const { data: session } = useSession();

  const userName =
    session?.user?.name ||
    session?.user?.email?.split("@")[0]?.replace(/[._-]+/g, " ") ||
    "Operative";
  const userEmail = session?.user?.email || "operator@cryptowatch.io";
  const userInitial = (userName || "O").trim().charAt(0).toUpperCase();
  const userImage = session?.user?.image;

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
            <Shield size={20} color="#35ff62" />
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
            const isActive = item.key === active;

            return (
              <Link
                key={item.key}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  height: 48,
                  padding: "0 14px",
                  borderRadius: 16,
                  color: isActive ? "#35ff62" : "#b8bcc5",
                  textDecoration: "none",
                  background: isActive ? "#102912" : "transparent",
                  boxShadow: isActive
                    ? "inset 4px 0 0 #35ff62, 0 0 22px rgba(53,255,98,0.08)"
                    : "none",
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                <Icon size={18} />
                {item.label}
              </Link>
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
            {userImage ? (
              <img
                src={userImage}
                alt="User avatar"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  objectFit: "cover",
                  border: "1px solid #2a2a2a",
                }}
              />
            ) : (
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
                {userInitial}
              </div>
            )}
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                {userName}
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
                {userEmail.length > 22 ? `${userEmail.slice(0, 22)}...` : userEmail}
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
          overflowY: scrollable ? "auto" : "hidden",
          padding: "56px 40px 40px",
        }}
      >
        {children}
      </section>
    </main>
  );
}
