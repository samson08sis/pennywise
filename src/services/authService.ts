import api from "./api";
import { extractErrorMessage } from "@/context/AuthContext";

export const resetPassword = async (
  token: string,
  password: string
): Promise<void> => {
  try {
    await api.post("/user/reset-password", { token, password });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
