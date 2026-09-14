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
import {
  LoginCredentials,
  SignupCredentials,
  UpdatePasswordCredentials,
  User,
} from "@/types/auth";
import toast from "react-hot-toast";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updatePassword: (credentials: UpdatePasswordCredentials) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.code === "ERR_NETWORK") {
      return "Unable to connect to server. Retry or contact the developer";
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
      toast.success("Welcome back!");
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
      toast.success("Logged out successfully");
    } catch {
      try {
        await fetch("/api/auth/clear-cookie", { method: "POST" });
      } catch {}
    } finally {
      setUser(null);
      router.replace("/");
    }
  };

  const updatePassword = async (credentials: UpdatePasswordCredentials) => {
    try {
      await api.put("/user/update-password", credentials);
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("Failed to update password");
      throw new Error(extractErrorMessage(error));
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
        updatePassword,
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
