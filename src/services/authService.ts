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
