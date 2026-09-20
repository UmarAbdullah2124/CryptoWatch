"use client";

import Link from "next/link";
import { Star, Trash2 } from "lucide-react";
import { TerminalShell } from "@/components/terminal-shell";
import {
  formatCompactCurrency,
  formatCurrency,
  formatPercent,
} from "./watchlist-format";
import styles from "./watchlist-live.module.css";
import { useWatchlistAssets } from "./use-watchlist-assets";

export default function WatchlistLivePage() {
  const { assets, error, loading, removeAsset } = useWatchlistAssets();

  return (
    <TerminalShell active="watchlist">
      <div className={styles.watchlistPage}>
        <div className={styles.header}>
          <div className={styles.titleIcon}>
            <Star size={24} color="#35ff62" fill="#35ff62" />
          </div>
          <div>
            <h1 className={styles.title}>MY WATCHLIST</h1>
            <p className={styles.subtitle}>Database backed priority targets</p>
          </div>
        </div>

        {loading ? (
          <State title="Loading Watchlist" text="Reading saved assets from PostgreSQL." />
        ) : null}

        {!loading && error ? (
          <State
            title="Database Offline"
            text={error}
            className={styles.error}
          />
        ) : null}

        {!loading && !error && assets.length === 0 ? (
          <State
            title="No Assets Starred"
            text="Star assets from the market page and they will persist here through Prisma and PostgreSQL."
          >
            <Link href="/market" className={styles.marketLink}>
              Open Market
            </Link>
          </State>
        ) : null}

        {!loading && !error && assets.length > 0 ? (
          <div className={styles.grid}>
            {assets.map((asset) => {
              const delta = asset.price_change_percentage_24h ?? 0;
              const deltaClass = delta >= 0 ? styles.deltaUp : styles.deltaDown;

              return (
                <div key={asset.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.asset}>
                      {asset.image ? (
                        <img
                          className={styles.coinIcon}
                          src={asset.image}
                          alt=""
                          width={40}
                          height={40}
                        />
                      ) : (
                        <div className={styles.fallbackIcon}>
                          {asset.asset_name.slice(0, 1)}
                        </div>
                      )}
                      <div>
                        <div className={styles.coinName}>{asset.asset_name}</div>
                        <div className={styles.coinSymbol}>{asset.symbol}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={styles.removeButton}
                      aria-label={`Remove ${asset.asset_name} from watchlist`}
                      onClick={() => removeAsset(asset.id)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className={styles.price}>
                    {formatCurrency(asset.current_price)}
                  </div>
                  <div className={deltaClass}>
                    {formatPercent(asset.price_change_percentage_24h)}
                  </div>
                  <div className={styles.marketCap}>
                    Market Cap {formatCompactCurrency(asset.market_cap)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </TerminalShell>
  );
}

function State({
  children,
  className = "",
  text,
  title,
}: {
  children?: React.ReactNode;
  className?: string;
  text: string;
  title: string;
}) {
  return (
    <div className={`${styles.state} ${className}`}>
      <div>
        <div className={styles.stateTitle}>{title}</div>
        <div className={styles.stateText}>{text}</div>
        {children}
      </div>
    </div>
  );
}
