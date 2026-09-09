"use client";

import Brand from "@/components/Brand";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SecurityPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const backToLogin = () => router.replace("/login");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setSubmitted(true);
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa] p-5 text-[#18212f]">
      <div className="w-full max-w-md rounded-2xl border border-[#e8ebef] bg-white p-7 shadow-sm sm:p-9">
        <button
          onClick={backToLogin}
          className="mb-8 flex items-center gap-2 text-sm text-[#667180] hover:text-[#2f6fed]">
          ← Back to login
        </button>
        <Brand />
        {submitted ? (
          <div className="mt-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f5ef] text-[#329679]">
              <Check size={22} />
            </div>
            <h1 className="mt-5 text-2xl font-semibold">Password updated</h1>
            <p className="mt-2 text-sm leading-6 text-[#667180]">
              Your new password is ready. You can now sign in securely.
            </p>
            <button
              onClick={backToLogin}
              className="mt-7 h-11 w-full rounded-lg bg-[#2f6fed] text-sm font-medium text-white hover:bg-[#245ed1]">
              Return to login
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8">
            <h1 className="text-2xl font-semibold">Reset your password</h1>
            <p className="mt-2 text-sm leading-6 text-[#89929f]">
              Choose a new password for your Pennywise account.
            </p>
            <div className="mt-7 flex flex-col gap-4">
              <label className="text-sm font-medium">
                New password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none focus:border-[#2f6fed]"
                />
              </label>
              <label className="text-sm font-medium">
                Confirm password
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none focus:border-[#2f6fed]"
                />
              </label>
            </div>
            {error && <p className="mt-3 text-sm text-[#d26f5d]">{error}</p>}
            <button className="mt-6 h-11 w-full rounded-lg bg-[#2f6fed] text-sm font-medium text-white hover:bg-[#245ed1]">
              Update password
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
