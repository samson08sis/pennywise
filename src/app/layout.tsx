import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ContextProviders from "@/components/layout/ContextProviders";

export const metadata: Metadata = {
  title: "Pennywise | Expense management, made simple",
  description:
    "A calm, focused workspace for keeping your personal expenses organized.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ContextProviders>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </ContextProviders>
      </body>
    </html>
  );
}
