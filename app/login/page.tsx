"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, Circle, LockKeyhole, Mail, Shield } from "lucide-react";

const demoEmail = "testop@gmail.com";
const demoPassword = "password123";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(demoEmail);
  const [password, setPassword] = useState(demoPassword);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authError = params.get("authError");

    if (authError === "account_not_found") {
      setError("No account exists for that Google email. Use Google signup first.");
    }

    if (authError === "missing_email") {
      setError("Google did not return an email address.");
    }
  }, []);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email identifier or secure passkey.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="h-screen overflow-hidden bg-[#050606] text-white">
      <div className="grid h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT LOGIN PANEL */}
        <section className="relative flex min-h-0 items-center justify-center px-5 py-6">
          <div className="absolute left-5 top-5 h-2 w-2 rounded-full bg-[#00ff41] shadow-[0_0_20px_#00ff41]" />

          <div className="w-full max-w-[460px]">
            {/* Icon */}
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00ff41]/40 bg-[#00ff41]/10 shadow-[0_0_35px_rgba(0,255,65,0.15)]">
              <Shield className="h-7 w-7 text-[#00ff41]" />
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-black italic tracking-[-0.05em] text-white">
              ACCESS TERMINAL
            </h1>

            <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-gray-500">
              Secure access / CryptoWatch
            </p>

            {/* Form */}
            <form className="mt-8 space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-[0.25em] text-gray-500">
                  Email Identifier
                </label>

                <div className="flex h-14 items-center gap-4 rounded-xl border border-[#00ff41]/70 bg-[#111111] px-5 shadow-[0_0_25px_rgba(0,255,65,0.15)]">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="operator@cryptowatch.com"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-[0.25em] text-gray-500">
                  Secure Passkey
                </label>

                <div className="flex h-14 items-center gap-4 rounded-xl border border-white/10 bg-[#111111] px-5 transition focus-within:border-[#00ff41]/60">
                  <LockKeyhole className="h-5 w-5 text-gray-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="********"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              {error ? (
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-red-400">
                  {error}
                </p>
              ) : null}

              <div className="rounded-xl border border-[#00ff41]/30 bg-[#00ff41]/5 p-3 text-xs text-[#d9ffe2]">
                <p className="font-mono uppercase tracking-[0.2em] text-[#00ff41]">
                  Demo Operator
                </p>
                <p className="mt-2 font-medium">
                  Email: <span className="font-mono text-white">{demoEmail}</span>
                </p>
                <p className="font-medium">
                  Password: <span className="font-mono text-white">{demoPassword}</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#00ff41] font-mono text-sm font-black uppercase tracking-[0.25em] text-black shadow-[0_0_35px_rgba(0,255,65,0.35)] transition hover:scale-[1.01] hover:bg-[#39ff68]"
              >
                {loading ? "Authenticating" : "Sign In"}
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-5">
              <div className="h-px flex-1 bg-white/10" />
              <span className="font-mono text-xs uppercase text-gray-600">Or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google button */}
            <button
              className="flex h-14 w-full items-center justify-center gap-4 rounded-xl border border-white/10 bg-[#111111] font-mono text-sm font-bold uppercase tracking-[0.25em] text-white transition hover:border-[#00ff41]/40 hover:bg-[#151515]"
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <Circle className="h-5 w-5 text-[#00ff41]" />
              Sign in with Google
            </button>

            <p className="mt-7 text-center text-sm text-gray-500">
              New to CryptoWatch?{" "}
              <Link
                href="/signup"
                className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#00ff41] hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>

          <div className="absolute bottom-5 left-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm text-white/80">
            N
          </div>
        </section>

        {/* RIGHT HERO PANEL */}
        <section className="relative hidden overflow-hidden border-l border-white/5 bg-[#090909] lg:block">
          {/* Background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:38px_38px] opacity-40" />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/20 to-[#050606]" />

          {/* Candlestick chart simulation */}
          <div className="absolute left-10 top-0 h-full w-[65%] opacity-45">
            {[
              90, 160, 120, 210, 130, 75, 180, 250, 310, 220, 155, 300, 390,
              260, 190,
            ].map((height, index) => (
              <div
                key={index}
                className="absolute bottom-20 w-5 border border-white/25 bg-white/10"
                style={{
                  height: `${height}px`,
                  left: `${index * 55}px`,
                  transform: `translateY(${
                    index % 3 === 0 ? -90 : index % 2 === 0 ? -30 : 40
                  }px)`,
                }}
              >
                <div className="absolute left-1/2 top-[-70px] h-[70px] w-px -translate-x-1/2 bg-white/20" />
                <div className="absolute bottom-[-70px] left-1/2 h-[70px] w-px -translate-x-1/2 bg-white/20" />
              </div>
            ))}
          </div>

          {/* Floating coins */}
          <div className="absolute right-12 top-16 h-32 w-32 rotate-12 rounded-full border border-white/15 bg-white/5 text-center text-3xl font-black italic text-white/20">
            <span className="flex h-full items-center justify-center">$</span>
          </div>

          <div className="absolute right-40 top-[45%] flex h-36 w-36 -rotate-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-3xl font-black uppercase italic text-white/70 backdrop-blur">
            Buy
          </div>

          <div className="absolute right-72 top-[42%] flex h-28 w-28 rotate-6 items-center justify-center rounded-full border border-white/20 bg-black/40 text-2xl font-black uppercase italic text-white/70 backdrop-blur">
            Hold
          </div>

          <div className="absolute right-16 bottom-32 flex h-28 w-28 rotate-[28deg] items-center justify-center rounded-full border border-white/20 bg-black/40 text-2xl font-black uppercase italic text-white/60 backdrop-blur">
            Sell
          </div>

          <div className="absolute right-[410px] top-[38%] flex h-24 w-24 rotate-[18deg] items-center justify-center rounded-full border border-white/20 bg-black/40 text-xl font-black uppercase italic text-white/60 backdrop-blur">
            Buy
          </div>

          {/* Bottom glass card */}
          <div className="absolute bottom-10 left-12 right-12 rounded-3xl border border-white/10 bg-black/45 p-6 shadow-2xl backdrop-blur-md">
            <p className="font-mono text-xs uppercase tracking-[0.45em] text-[#00ff41]">
              Protocol Active
            </p>

            <h2 className="mt-4 text-3xl font-black italic tracking-[-0.05em] text-white">
              SECURE ASSET MONITORING //
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
              Join the network of thousands of operatives monitoring the global
              liquidity deltas in real-time.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
