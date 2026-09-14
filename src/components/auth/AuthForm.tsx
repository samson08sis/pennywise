import { useAuth } from "@/context/AuthContext";
import { validateLogin, validateSignup } from "@/lib/validation";
import { AuthMode } from "@/types/auth";
import { Eye, EyeOff, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Brand from "../Brand";

export function AuthForm({
  mode,
  onClose,
}: {
  mode: AuthMode;
  onClose: () => void;
}) {
  const router = useRouter();
  const auth = useAuth();

  const [authMode, setAuthMode] = useState<AuthMode>(mode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleModeSwitch = (mode: AuthMode) => {
    setError("");
    setEmail("");
    setPassword("");
    setName("");
    setShowPassword(false);

    setAuthMode(mode);
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const validationError =
      authMode === "login"
        ? validateLogin({ email, password })
        : validateSignup({ name, email, password });

    if (validationError) {
      return setError(validationError);
    }

    try {
      setLoading(true);
      const destination =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("from") || "/dashboard"
          : "/dashboard";

      if (authMode === "login") {
        await auth.login({ email, password }, destination);
      } else {
        await auth.signup({ name, email, password }, destination);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleForgot = () => {
    router.push("/forgot-password");
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
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
          {authMode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="mt-2 text-sm text-[#89929f]">
          {authMode === "login"
            ? "Log in to continue to your workspace."
            : "Start building a clearer picture of your spending."}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {authMode === "signup" && (
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
          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-lg border border-[#e5e9ee] pl-3 pr-10 outline-none transition-all focus:border-[#2f6fed] focus:ring-2 focus:ring-[#2f6fed]/10"
              placeholder="••••••••"
              disabled={loading}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89929f] transition-colors hover:text-[#2f6fed]">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>
      </div>

      {authMode === "login" && (
        <button
          type="button"
          onClick={handleForgot}
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
        ) : authMode === "login" ? (
          "Log in"
        ) : (
          "Create account"
        )}
      </button>

      <p className="mt-5 text-center text-sm text-[#89929f]">
        {authMode === "login"
          ? "New to Pennywise?"
          : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() =>
            handleModeSwitch(authMode === "login" ? "signup" : "login")
          }
          className="font-medium text-[#2f6fed] hover:underline">
          {authMode === "login" ? "Create an account" : "Log in"}
        </button>
      </p>
    </form>
  );
}
