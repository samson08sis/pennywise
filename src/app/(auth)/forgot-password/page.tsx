"use client";

import Brand from "@/components/Brand";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SecurityPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const backToLogin = () => router.replace("/login");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!email.includes("@")) return setError("Enter a valid email address.");
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
            <h1 className="mt-5 text-2xl font-semibold">Check your inbox</h1>
            <p className="mt-2 text-sm leading-6 text-[#667180]">
              If an account exists for this email, we sent a secure password
              reset link.
            </p>
            <button
              onClick={backToLogin}
              className="mt-7 h-11 w-full rounded-lg bg-[#2f6fed] text-sm font-medium text-white hover:bg-[#245ed1]">
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
                className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none focus:border-[#2f6fed]"
                placeholder="you@example.com"
              />
            </label>
            {error && <p className="mt-3 text-sm text-[#d26f5d]">{error}</p>}
            <button className="mt-6 h-11 w-full rounded-lg bg-[#2f6fed] text-sm font-medium text-white hover:bg-[#245ed1]">
              {"Send reset link"}
            </button>
            <button
              type="button"
              onClick={() => router.replace("/reset-password")}
              className="mt-4 w-full text-sm text-[#89929f] hover:text-[#2f6fed]">
              Use a reset link
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
