"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";
import { TerminalShell } from "@/components/terminal-shell";
import styles from "./profile-live.module.css";
import { useProfile } from "./use-profile";

export default function ProfileLivePage() {
  const { error, loading, profile } = useProfile();

  return (
    <TerminalShell active="profile">
      <div className={styles.profilePage}>
        <div className={styles.header}>
          <div className={styles.titleIcon}>
            <User size={24} color="#35ff62" />
          </div>
          <div>
            <h1 className={styles.title}>AGENT PROFILE</h1>
            <p className={styles.subtitle}>Operator Node Clearance</p>
          </div>
        </div>

        {loading ? (
          <State title="Loading Profile" text="Resolving active operator session." />
        ) : null}

        {!loading && error ? (
          <State title="No Active Session" text={error}>
            <Link href="/login" className={styles.loginLink}>
              Access Terminal
            </Link>
          </State>
        ) : null}

        {!loading && profile ? (
          <div className={styles.grid}>
            <div className={styles.stack}>
              <div className={styles.avatarCard}>
                {profile.image ? (
                  <img
                    className={styles.avatar}
                    src={profile.image}
                    alt=""
                    width={94}
                    height={94}
                  />
                ) : (
                  <div className={styles.avatarFallback}>
                    {profile.name.slice(0, 1).toUpperCase()}
                  </div>
                )}

                <div className={styles.avatarLabel}>Synced Identity</div>
                <div className={styles.name}>{profile.name}</div>
                <div className={styles.role}>Operator Session</div>

                <button
                  className={styles.logout}
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOut size={16} />
                  Terminate Session
                </button>
              </div>

            </div>

            <div className={styles.stack}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>Account Summary</div>
                <div className={styles.rows}>
                  <InfoRow label="Email Identifier" value={profile.email} />
                  <InfoRow
                    label="Auth Provider"
                    value={profile.provider.replace("google-", "google ")}
                    pill="Verified"
                  />
                  <InfoRow
                    label="Watchlist Targets"
                    value={`${profile.watchlistCount} starred assets`}
                    pill="Active"
                  />
                  <InfoRow
                    label="Operator ID"
                    value={profile.id}
                    pill="Bound"
                  />
                  <InfoRow
                    label="Account Created"
                    value={new Date(profile.created_at).toLocaleString()}
                  />
                  <InfoRow
                    label="Last Profile Sync"
                    value={new Date(profile.updated_at).toLocaleString()}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </TerminalShell>
  );
}

function InfoRow({
  label,
  pill,
  value,
}: {
  label: string;
  pill?: string;
  value: string;
}) {
  return (
    <div className={styles.row}>
      <div>
        <div className={styles.rowLabel}>{label}</div>
        <div className={styles.rowValue}>{value}</div>
      </div>
      {pill ? <div className={styles.pill}>{pill}</div> : null}
    </div>
  );
}

function State({
  children,
  text,
  title,
}: {
  children?: React.ReactNode;
  text: string;
  title: string;
}) {
  return (
    <div className={styles.state}>
      <div>
        <div className={styles.stateTitle}>{title}</div>
        <div className={styles.stateText}>{text}</div>
        {children}
      </div>
    </div>
  );
}
