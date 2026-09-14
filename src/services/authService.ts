import { User } from "@/types/auth";
import api from "./api";
import { extractErrorMessage } from "@/context/AuthContext";

export const requestPasswordReset = async (email: string): Promise<void> => {
  try {
    await api.post("/user/forgot-password", { email });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  try {
    await api.post("/user/reset-password", { token, newPassword });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const updateProfile = async (name: string): Promise<User> => {
  try {
    const { data } = await api.put("/user/profile", { name });
    return data.user;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
