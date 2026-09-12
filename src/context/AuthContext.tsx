"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import api from "@/services/api";
import { LoginCredentials, SignupCredentials, User } from "@/types/auth";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.code === "ERR_NETWORK") {
      return "Unable to connect to server. Is the backend running?";
    }

    const serverMessage = error.response?.data?.message;
    if (typeof serverMessage === "string") {
      return serverMessage;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await api.get("/user/me");
        setUser(res.data.user);
      } catch {
        try {
          await api.post("/auth/refresh");
          const res = await api.get("/user/me");
          setUser(res.data.user);
        } catch {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const res = await api.post("/auth/login", credentials);
      setUser(res.data.user);
      router.push("/dashboard");
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<void> => {
    try {
      await api.post("/auth/signup", credentials);
      await login(credentials);
    } catch (error) {
      throw new Error(extractErrorMessage(error));
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch {
      try {
        await fetch("/api/auth/clear-cookie", { method: "POST" });
      } catch {}
    } finally {
      setUser(null);
      router.replace("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
