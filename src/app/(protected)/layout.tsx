"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, loading, pathname, router]);

  if (loading || !isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa] text-[#667180]">
        <div className="flex items-center gap-3 text-sm" role="status" aria-live="polite">
          <Loader2 className="size-5 animate-spin text-[#2f6fed]" aria-hidden="true" />
          Checking your session...
        </div>
      </main>
    );
  }

  return children;
}
