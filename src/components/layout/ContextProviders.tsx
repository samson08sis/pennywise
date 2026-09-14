import { AuthProvider } from "@/context/AuthContext";
import { ExpenseProvider } from "@/context/ExpenseContext";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function ContextProviders({ children }: Props) {
  return (
    <AuthProvider>
      <ExpenseProvider>{children}</ExpenseProvider>
    </AuthProvider>
  );
}
