"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Loader2, ArrowLeft, ShieldAlert } from "lucide-react";
import Brand from "@/components/Brand";
import { resetPassword } from "@/services/authService";
import { validateResetPassword } from "@/lib/validation";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const validationError = validateResetPassword({
      token,
      password,
      confirmPassword,
    });
    if (validationError) return setError(validationError);

    try {
      setLoading(true);
      await resetPassword(token!, password);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="mt-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fde8e8] text-[#d26f5d]">
          <ShieldAlert size={22} />
        </div>
        <h1 className="mt-4 text-xl font-semibold">Invalid Reset Link</h1>
        <p className="mt-2 text-sm text-[#667180]">
          This link appears to be invalid or incomplete. Please request a new
          password reset link.
        </p>
        <button
          type="button"
          onClick={() => router.replace("/forgot-password")}
          className="mt-6 h-11 w-full rounded-lg bg-[#2f6fed] text-sm font-medium text-white transition-colors hover:bg-[#245ed1]">
          Request new link
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mt-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f5ef] text-[#329679]">
          <Check size={22} />
        </div>
        <h1 className="mt-5 text-2xl font-semibold">Password updated</h1>
        <p className="mt-2 text-sm leading-6 text-[#667180]">
          Your password has been successfully reset. You can now log in with
          your new credentials.
        </p>
        <button
          type="button"
          onClick={() => router.replace("/login")}
          className="mt-7 h-11 w-full rounded-lg bg-[#2f6fed] text-sm font-medium text-white transition-colors hover:bg-[#245ed1]">
          Log in now
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8">
      <h1 className="text-2xl font-semibold">Set new password</h1>
      <p className="mt-2 text-sm leading-6 text-[#89929f]">
        Please enter a new password for your account.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <label className="text-sm font-medium">
          New password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none transition-all focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10 disabled:opacity-60"
            placeholder="••••••••"
          />
        </label>

        <label className="text-sm font-medium">
          Confirm new password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none transition-all focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10 disabled:opacity-60"
            placeholder="••••••••"
          />
        </label>
      </div>

      {error && (
        <p className="mt-3 text-sm font-medium text-[#d26f5d]">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-[#2f6fed] text-sm font-medium text-white transition-colors hover:bg-[#245ed1] disabled:opacity-50">
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" /> Updating...
          </span>
        ) : (
          "Reset password"
        )}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa] p-5 text-[#18212f]">
      <div className="w-full max-w-md rounded-2xl border border-[#e8ebef] bg-white p-7 shadow-sm sm:p-9">
        <button
          type="button"
          onClick={() => router.replace("/login")}
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#667180] transition-colors hover:text-[#2f6fed]">
          <ArrowLeft size={16} /> Back to login
        </button>

        <Brand />

        <Suspense
          fallback={
            <div className="mt-8 text-center text-sm text-[#89929f]">
              Loading form...
            </div>
          }>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
