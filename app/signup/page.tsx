"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, BadgeCheck, LockKeyhole, Mail, Shield, User } from "lucide-react";
import styles from "./signup.module.css";

const CANDLES = [
  { left: "1%", bottom: "48%", height: "96px", width: "34px" },
  { left: "7%", bottom: "33%", height: "178px", width: "38px" },
  { left: "13%", bottom: "38%", height: "206px", width: "47px" },
  { left: "22%", bottom: "35%", height: "118px", width: "35px" },
  { left: "29%", bottom: "31%", height: "86px", width: "33px" },
  { left: "36%", bottom: "34%", height: "132px", width: "43px" },
  { left: "44%", bottom: "42%", height: "174px", width: "40px" },
  { left: "52%", bottom: "51%", height: "210px", width: "37px" },
  { left: "60%", bottom: "58%", height: "154px", width: "33px" },
  { left: "67%", bottom: "61%", height: "112px", width: "32px" },
  { left: "74%", bottom: "67%", height: "149px", width: "41px" },
  { left: "83%", bottom: "78%", height: "195px", width: "35px" },
];

const COINS = [
  { label: "BUY", size: "132px", left: "46%", top: "48%", rotate: "15deg" },
  { label: "HOLD", size: "142px", left: "43%", top: "62%", rotate: "7deg" },
  { label: "BUY", size: "150px", left: "56%", top: "63%", rotate: "-12deg", large: true },
  { label: "SELL", size: "122px", left: "65%", top: "79%", rotate: "28deg" },
  { label: "HOLD", size: "110px", left: "77%", top: "64%", rotate: "68deg" },
  { label: "₿", size: "184px", left: "87%", top: "39%", rotate: "32deg" },
  { label: "◈", size: "132px", left: "77%", top: "33%", rotate: "-20deg" },
  { label: "₮", size: "142px", left: "78%", top: "3%", rotate: "20deg" },
  { label: "◆", size: "122px", left: "68%", top: "0%", rotate: "-18deg" },
];

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to create account");
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Account created, but automatic login failed.");
      }

      router.push("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <section className={styles.formPanel}>
          <div className={styles.formWrap}>
            <div className={styles.mark}>
              <Shield size={34} strokeWidth={2.3} />
            </div>

            <h1 className={styles.title}>Create Account</h1>
            <p className={styles.subtitle}>Join the CryptoWatch network</p>

            <form className={styles.form} onSubmit={handleSignup}>
              <label className={styles.field}>
                <span className={styles.label}>Agent Name</span>
                <span className={styles.inputBox}>
                  <User size={19} />
                  <input
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Operative Name"
                    autoComplete="name"
                    required
                  />
                </span>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Email Identifier</span>
                <span className={styles.inputBox}>
                  <Mail size={19} />
                  <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="agent@cryptowatch.io"
                    autoComplete="email"
                    required
                  />
                </span>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Secure Passkey</span>
                <span className={styles.inputBox}>
                  <LockKeyhole size={19} />
                  <input
                    className={styles.input}
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="********"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                </span>
              </label>

              {error ? <p className={styles.errorText}>{error}</p> : null}

              <button className={styles.submit} type="submit" disabled={loading}>
                {loading ? "Creating account" : "Create account"}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className={styles.divider}>Or</div>

            <button
              className={styles.google}
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <BadgeCheck size={20} color="#00ff41" />
              Sign Up With Google
            </button>

            <p className={styles.loginPrompt}>
              Already have access?
              <Link className={styles.loginLink} href="/login">
                Sign in
              </Link>
            </p>
          </div>

          <div className={styles.cornerBadge}>N</div>
        </section>

        <section className={styles.visualPanel} aria-hidden="true">
          <div className={styles.gridDots} />
          <div className={styles.chart}>
            {CANDLES.map((candle, index) => (
              <div
                className={styles.candle}
                key={index}
                style={{
                  "--bottom": candle.bottom,
                  "--height": candle.height,
                  "--left": candle.left,
                  "--width": candle.width,
                } as React.CSSProperties}
              />
            ))}
          </div>

          {COINS.map((coin) => (
            <div
              className={`${styles.coin} ${coin.large ? styles.coinLarge : ""}`}
              key={`${coin.label}-${coin.left}-${coin.top}`}
              style={{
                "--rotate": coin.rotate,
                "--size": coin.size,
                left: coin.left,
                top: coin.top,
              } as React.CSSProperties}
            >
              {coin.label}
            </div>
          ))}

          <div className={styles.heroCard}>
            <div className={styles.heroEyebrow}>Market Intelligence</div>
            <div className={styles.heroTitle}>Build your watchlist //</div>
            <p className={styles.heroCopy}>
              Track the market in real time and stay ahead of every major move.
            </p>
          </div>

          <div className={styles.darkVeil} />
          <div className={styles.bottomSwitch}>A/C</div>
        </section>
      </div>
    </main>
  );
}
