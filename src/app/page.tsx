"use client";

import { useState } from "react";
import {
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  Wallet,
  X,
} from "lucide-react";
import Hero from "@/components/Hero";
import { AuthMode } from "@/types/auth";

export default function HomePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  const onAuth = (mode: AuthMode | null) => {
    setAuthMode(mode);
  };

  const onClose = () => setAuthMode(null);

  const onSuccess = () => {
    setAuthMode(null);
    setAuthenticated(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8fa] text-[#18212f]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Brand />
        <div className="hidden items-center gap-8 text-sm text-[#667180] md:flex">
          <a href="#features" className="hover:text-[#2f6fed]">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-[#2f6fed]">
            How it works
          </a>
          <a href="#security" className="hover:text-[#2f6fed]">
            Security
          </a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onAuth("login")}
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-[#667180] hover:bg-white sm:block">
            Log in
          </button>
          <button
            onClick={() => onAuth("signup")}
            className="rounded-lg bg-[#2f6fed] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#245ed1]">
            Create account
          </button>
        </div>
      </nav>
      <Hero onAuth={onAuth} />
      <section id="features" className="border-y border-[#e8ebef] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3 md:py-20">
          <Feature
            icon={LayoutDashboard}
            title="Everything at a glance"
            text="See your spending patterns and monthly progress without digging through spreadsheets."
          />
          <Feature
            icon={CreditCard}
            title="Effortless tracking"
            text="Add an expense in seconds and keep your records accurate as life happens."
          />
          <Feature
            icon={CircleHelp}
            title="Clarity, not complexity"
            text="Simple categories and thoughtful summaries help you feel in control."
          />
        </div>
      </section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-[#89929f] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Brand />
        <span>© 2024 Pennywise. Your money, made clear.</span>
      </footer>
      {authMode && (
        <AuthModal
          mode={authMode}
          onModeChange={onAuth}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      )}
    </main>
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
          light ? "bg-white text-[#2759ba]" : "bg-[#2f6fed] text-white"
        }`}>
        <Wallet size={18} />
      </div>
      <span
        className={`text-[17px] font-semibold tracking-tight ${
          light ? "text-white" : ""
        }`}>
        Pennywise
      </span>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Wallet;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#edf3ff] text-[#2f6fed]">
        <Icon size={19} />
      </div>
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#89929f]">{text}</p>
      </div>
    </div>
  );
}

function AuthModal({
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
