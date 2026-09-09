"use client";

import AuthModal from "@/components/auth/AuthModal";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const onClose = () => router.push("/");

  const onSuccess = () => {
    router.replace("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa] p-5 text-[#18212f]">
      <div className="w-full max-w-md rounded-2xl border border-[#e8ebef] bg-white p-7 shadow-sm sm:p-9">
        <AuthModal
          mode="login"
          onClose={onClose}
          onSuccess={onSuccess}
          onModeChange={() => {}}
          onForgot={() => router.push("/forgot-password")}
        />
      </div>
    </main>
  );
}
