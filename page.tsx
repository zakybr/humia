"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Wordmark } from "../../components/Brand";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // Full navigation so proxy.ts + server components see the fresh session.
    router.replace(redirectTo);
    router.refresh();
  }

  const fieldClass =
    "mt-2 w-full border border-line bg-panel-2 px-3.5 py-2.5 text-[15px] text-ink transition-colors focus:border-signal";

  return (
    <div className="w-full max-w-sm">
      <Wordmark />
      <div className="corners mt-8 border border-line bg-panel p-8">
        <div className="flex items-center gap-2.5">
          <span className="status-dot" aria-hidden="true" />
          <span className="eyebrow eyebrow-signal">Console access</span>
        </div>
        <h1 className="mt-4 text-3xl">Sign in</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Manage news and events for the HUMIA website.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="eyebrow block">
              Email
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="password" className="eyebrow block">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClass}
            />
          </div>

          {error ? (
            <p role="alert" className="text-sm text-danger">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-solid w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>

      <a
        href="/"
        className="link-underline mt-8 inline-flex text-sm text-muted hover:text-ink"
      >
        &larr; Back to site
      </a>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-base px-6 py-16">
      <div
        aria-hidden="true"
        className="grid-backdrop pointer-events-none absolute inset-0 opacity-40"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
      />
      <Suspense fallback={<div className="w-full max-w-sm" />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
