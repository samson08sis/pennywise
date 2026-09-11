"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, ArrowLeft } from "lucide-react";
import Brand from "@/components/Brand";
import { validateForgotPassword } from "@/lib/validation";
import { requestPasswordReset } from "@/services/authService";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backToLogin = () => router.replace("/login");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const validationError = validateForgotPassword({ email });
    if (validationError) return setError(validationError);

    try {
      setLoading(true);
      await requestPasswordReset(email);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa] p-5 text-[#18212f]">
      <div className="w-full max-w-md rounded-2xl border border-[#e8ebef] bg-white p-7 shadow-sm sm:p-9">
        <button
          type="button"
          onClick={backToLogin}
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#667180] transition-colors hover:text-[#2f6fed]">
          <ArrowLeft size={16} /> Back to login
        </button>

        <Brand />

        {submitted ? (
          <div className="mt-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f5ef] text-[#329679]">
              <Check size={22} />
            </div>
            <h1 className="mt-5 text-2xl font-semibold">Check your inbox</h1>
            <p className="mt-2 text-sm leading-6 text-[#667180]">
              If an account exists for{" "}
              <span className="font-medium text-[#18212f]">{email}</span>, we
              sent a secure link to reset your password.
            </p>
            <button
              type="button"
              onClick={backToLogin}
              className="mt-7 h-11 w-full rounded-lg bg-[#2f6fed] text-sm font-medium text-white transition-colors hover:bg-[#245ed1]">
              Return to login
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8">
            <h1 className="text-2xl font-semibold">Forgot your password?</h1>
            <p className="mt-2 text-sm leading-6 text-[#89929f]">
              Enter your email and we will send you a secure reset link.
            </p>

            <label className="mt-7 block text-sm font-medium">
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none transition-all focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10 disabled:opacity-60"
                placeholder="you@example.com"
              />
            </label>

            {error && (
              <p className="mt-3 text-sm font-medium text-[#d26f5d]">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-[#2f6fed] text-sm font-medium text-white transition-colors hover:bg-[#245ed1] disabled:opacity-50">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" /> Sending...
                </span>
              ) : (
                "Send reset link"
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
