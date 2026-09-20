"use client";

import { BarChart3, Star } from "lucide-react";
import { TerminalShell } from "@/components/terminal-shell";
import {
  formatCompactCurrency,
  formatCurrency,
  formatPercent,
} from "./market-format";
import styles from "./market-live.module.css";
import { useMarketPrices } from "./use-market-prices";
import { useWatchlistStars } from "./use-watchlist-stars";

export default function MarketLivePage() {
  const { data, error, loading } = useMarketPrices();
  const { busyAssetId, entryByAssetId, toggleStar } = useWatchlistStars();
  const coins = data?.coins ?? [];

  return (
    <TerminalShell active="market">
      <div className={styles.marketPage}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <div className={styles.titleIcon}>
              <BarChart3 size={24} color="#35ff62" />
            </div>
            <div>
              <h1 className={styles.title}>MARKET EXPLORER</h1>
              <p className={styles.subtitle}>Top 100 Assets / CoinGecko Cache</p>
            </div>
          </div>

          <div className={styles.meta}>
            <div className={styles.metaLabel}>Shared Cache Updated</div>
            <div className={styles.metaValue}>
              {data?.cachedAt
                ? new Date(data.cachedAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "Syncing..."}
            </div>
          </div>
        </div>

        <div className={styles.tableShell}>
          <div className={styles.tableHeader}>
            <span>Rank</span>
            <span>Asset</span>
            <span>Last Quote</span>
            <span>24H Delta</span>
            <span>Market Cap</span>
            <span>Actions</span>
          </div>

          <div className={styles.tableBody}>
            {loading ? (
              <div className={styles.state}>Loading market data</div>
            ) : null}

            {!loading && error ? (
              <div className={`${styles.state} ${styles.error}`}>{error}</div>
            ) : null}

            {!loading && !error
              ? coins.map((coin, index) => {
                  const delta = coin.price_change_percentage_24h ?? 0;
                  const deltaClass = delta >= 0 ? styles.deltaUp : styles.deltaDown;
                  const isStarred = entryByAssetId.has(coin.id);

                  return (
                    <div className={styles.coinRow} key={coin.id}>
                      <div className={styles.rank}>
                        #{coin.market_cap_rank ?? index + 1}
                      </div>

                      <div className={styles.asset}>
                        <img
                          className={styles.coinIcon}
                          src={coin.image}
                          alt=""
                          width={34}
                          height={34}
                        />
                        <div>
                          <div className={styles.coinName}>{coin.name}</div>
                          <div className={styles.coinSymbol}>{coin.symbol}</div>
                        </div>
                      </div>

                      <div className={styles.number}>
                        {formatCurrency(coin.current_price)}
                      </div>

                      <div className={deltaClass}>
                        {formatPercent(coin.price_change_percentage_24h)}
                      </div>

                      <div className={styles.muted}>
                        {formatCompactCurrency(coin.market_cap)}
                      </div>

                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={`${styles.starButton} ${
                            isStarred ? styles.starButtonActive : ""
                          }`}
                          disabled={busyAssetId === coin.id}
                          aria-label={
                            isStarred
                              ? `Remove ${coin.name} from watchlist`
                              : `Add ${coin.name} to watchlist`
                          }
                          onClick={() => toggleStar({ id: coin.id, name: coin.name })}
                        >
                          <Star
                            size={16}
                            fill={isStarred ? "currentColor" : "none"}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </TerminalShell>
  );
}
