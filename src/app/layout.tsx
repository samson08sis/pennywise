import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ExpenseProvider } from "@/context/ExpenseContext";

export const metadata: Metadata = {
  title: "Pennywise | Expense management, made simple",
  description:
    "A calm, focused workspace for keeping your personal expenses organized.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <ExpenseProvider>{children}</ExpenseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
