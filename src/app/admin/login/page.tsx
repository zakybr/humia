"use client";

import { Suspense, useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("That email or password is not right. Please try again.");
      setLoading(false);
      return;
    }
    // Full navigation so proxy.ts and server components see the fresh session.
    router.replace(redirectTo);
    router.refresh();
  }

  const fieldClass =
    "mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 text-base text-ink outline-none focus:border-blue";

  return (
    <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-8">
      <Image
        src="/humia-logo.png"
        alt="HUMIA logo"
        width={140}
        height={55}
        className="h-11 w-auto"
        style={{ width: "auto", height: "auto" }}
      />
      <h1 className="mt-5 text-2xl">Committee sign in</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-soft">
        Sign in to add or update events on the website.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-7 space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink">
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
          <label htmlFor="password" className="block text-sm font-semibold text-ink">
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
          <p role="alert" className="text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <a href="/" className="mt-6 inline-block text-sm text-soft hover:text-navy">
        Back to the website
      </a>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-sky px-4 py-16">
      <Suspense fallback={<div className="w-full max-w-sm" />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
