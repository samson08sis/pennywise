"use client";

import { AuthForm } from "@/components/auth/AuthModal";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const onClose = () => router.push("/");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa] p-5 text-[#18212f]">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18212f]/45 p-4 backdrop-blur-sm">
        <AuthForm mode="login" onClose={onClose} />
      </div>
    </main>
  );
}
