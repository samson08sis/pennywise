export type AuthMode = "login" | "signup";

export type User = {
  id: string;
  email: string;
  name: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupCredentials = {
  email: string;
  name: string;
  password: string;
};

export type UpdatePasswordCredentials = {
  currentPassword: string;
  newPassword: string;
};

export type AuthResponse = { success: boolean; error?: string };
