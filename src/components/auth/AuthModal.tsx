"use client";

import { useState, useEffect, FormEvent } from "react";
import { X, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Brand from "../Brand";
import { AuthMode } from "@/types/auth";

export default function AuthModal({
  mode,
  onModeChange,
  onClose,
  onForgot,
}: {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onClose: () => void;
  onForgot: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  const handleModeSwitch = (newMode: AuthMode) => {
    setError("");
    setEmail("");
    setPassword("");
    setName("");
    onModeChange(newMode);
  };

  // Close modal on Escape key press & prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (mode === "signup" && !name.trim()) {
      return setError("Please enter your name.");
    }
    if (!email.includes("@")) {
      return setError("Please enter a valid email address.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    try {
      setLoading(true);

      if (mode === "login") {
        await auth.login({ email, password });
      } else {
        await auth.signup({ name, email, password });
      }

      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Authentication failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#18212f]/45 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title">
      <form
        onSubmit={submit}
        className="relative w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl sm:p-9">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-lg p-2 text-[#89929f] transition-colors hover:bg-[#f3f5f7]">
          <X size={18} />
        </button>

        <div className="mb-7">
          <Brand />
          <h2
            id="auth-title"
            className="mt-7 text-2xl font-semibold tracking-tight">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-[#89929f]">
            {mode === "login"
              ? "Log in to continue to your workspace."
              : "Start building a clearer picture of your spending."}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {mode === "signup" && (
            <label className="text-sm font-medium">
              Full name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none transition-all focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10"
                placeholder="Jordan Davis"
                disabled={loading}
              />
            </label>
          )}

          <label className="text-sm font-medium">
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none transition-all focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10"
              placeholder="you@example.com"
              disabled={loading}
            />
          </label>

          <label className="text-sm font-medium">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none transition-all focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10"
              placeholder="••••••••"
              disabled={loading}
            />
          </label>
        </div>

        {mode === "login" && (
          <button
            type="button"
            onClick={onForgot}
            className="mt-3 text-sm font-medium text-[#2f6fed] hover:underline">
            Forgot your password?
          </button>
        )}

        {error && (
          <p className="mt-3 text-sm font-medium text-[#d26f5d]">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-[#2f6fed] text-sm font-medium text-white transition-colors hover:bg-[#245ed1] disabled:opacity-50">
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              Processing...
            </span>
          ) : mode === "login" ? (
            "Log in"
          ) : (
            "Create account"
          )}
        </button>

        <p className="mt-5 text-center text-sm text-[#89929f]">
          {mode === "login" ? "New to Pennywise?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() =>
              handleModeSwitch(mode === "login" ? "signup" : "login")
            }
            className="font-medium text-[#2f6fed] hover:underline">
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
      </form>
    </div>
  );
}
