"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import api from "@/services/api";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? null;

  const [status, setStatus] = useState<"ready" | "invalid" | "success">(
    token ? "ready" : "invalid"
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (newPassword.length < 8) return setError("Use at least 8 characters.");
    if (newPassword !== confirmation)
      return setError("Passwords do not match.");
    if (!token) {
      setStatus("invalid");
      return setError("This reset link is missing a valid token.");
    }

    setIsSubmitting(true);

    try {
      await api.post("/user/reset-password", { token, newPassword });
      setStatus("success");
    } catch (err: any) {
      const serverMessage =
        err.response?.data?.message || err.response?.data?.error;

      if (err.response?.status === 400 || err.response?.status === 404) {
        setStatus("invalid");
      } else {
        setError(serverMessage || "We could not update your password.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-10 text-[#18212f]">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col justify-center">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to Pennywise
        </Link>

        <section className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
          <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {status === "invalid" ? (
              <ShieldAlert className="size-6 text-destructive" />
            ) : status === "success" ? (
              <CheckCircle2 className="size-6 text-primary" />
            ) : (
              <KeyRound className="size-6" />
            )}
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Account security
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            {status === "success"
              ? "Password updated"
              : status === "invalid"
              ? "Reset link unavailable"
              : "Reset your password"}
          </h1>

          <p className="mt-3 leading-6 text-muted-foreground">
            {status === "success"
              ? "Your password has been changed. You can now sign in with your new credentials."
              : status === "invalid"
              ? "This password reset link is invalid, missing, or expired."
              : "Enter your new password below."}
          </p>

          {status === "ready" && (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium">
                  New password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmation"
                  className="mb-2 block text-sm font-medium">
                  Confirm new password
                </label>
                <input
                  id="confirmation"
                  type="password"
                  autoComplete="new-password"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  className="h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="text-sm font-medium text-destructive">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-5 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" /> Updating…
                  </span>
                ) : (
                  "Set new password"
                )}
              </button>
            </form>
          )}

          {status === "success" && (
            <Link
              href="/login"
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-5 font-medium text-primary-foreground">
              Return to sign in
            </Link>
          )}

          {status === "invalid" && (
            <Link
              href="/"
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-xl border border-border px-5 font-medium hover:bg-muted">
              Request a new link
            </Link>
          )}
        </section>
      </div>
    </main>
  );
}
