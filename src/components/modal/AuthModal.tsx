"use client";

import { useEffect } from "react";
import { AuthMode } from "@/types/auth";
import { AuthForm } from "../auth/AuthForm";
export function AuthModal({
  mode,
  onClose,
}: {
  mode: AuthMode;
  onClose: () => void;
}) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#18212f]/45 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title">
      <AuthForm mode={mode} onClose={onClose} />
    </div>
  );
}
