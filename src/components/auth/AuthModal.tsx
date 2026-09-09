import { AuthMode } from "@/types/auth";
import { useState } from "react";
import Brand from "../Brand";
import { X } from "lucide-react";

export default function AuthModal({
  mode,
  onModeChange,
  onClose,
  onSuccess,
}: {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (mode === "signup" && !name.trim())
      return setError("Please enter your name.");
    if (!email.includes("@")) return setError("Enter a valid email address.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    onSuccess();
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
          className="absolute right-4 top-4 rounded-lg p-2 text-[#89929f] hover:bg-[#f3f5f7]">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10"
                placeholder="Jordan Davis"
              />
            </label>
          )}
          <label className="text-sm font-medium">
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10"
              placeholder="you@example.com"
            />
          </label>
          <label className="text-sm font-medium">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10"
              placeholder="••••••••"
            />
          </label>
        </div>
        {error && <p className="mt-3 text-sm text-[#d26f5d]">{error}</p>}
        <button className="mt-6 h-11 w-full rounded-lg bg-[#2f6fed] text-sm font-medium text-white hover:bg-[#245ed1]">
          {mode === "login" ? "Log in" : "Create account"}
        </button>
        <p className="mt-5 text-center text-sm text-[#89929f]">
          {mode === "login" ? "New to Pennywise?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setError("");
              onModeChange(mode === "login" ? "signup" : "login");
            }}
            className="font-medium text-[#2f6fed] hover:underline">
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
      </form>
    </div>
  );
}
