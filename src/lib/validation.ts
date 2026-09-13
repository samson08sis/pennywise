export type ForgotPasswordFields = {
  email: string;
};

export type ResetPasswordFields = {
  token: string | null;
  newPassword: string;
  confirmPassword: string;
};

export type LoginFields = {
  email?: string;
  password?: string;
};

export type SignupFields = {
  name?: string;
  email?: string;
  password?: string;
};

export type UpdateProfileFields = {
  name: string;
};

export function validateForgotPassword({
  email,
}: ForgotPasswordFields): string | null {
  if (!email.trim()) return "Email address is required.";
  if (!email.includes("@")) return "Please enter a valid email address.";
  return null;
}

export function validateResetPassword({
  token,
  newPassword,
  confirmPassword,
}: ResetPasswordFields): string | null {
  if (!token) return "Invalid or missing password reset token.";
  if (!newPassword) return "Password is required.";
  if (newPassword.length < 6) return "Password must be at least 6 characters.";
  if (newPassword !== confirmPassword) return "Passwords do not match.";
  return null;
}

export function validateUpdateProfile({
  name,
}: UpdateProfileFields): string | null {
  if (!name.trim()) return "Name cannot be empty.";
  if (name.trim().length < 2) return "Name must be at least 2 characters long.";
  return null;
}

export function validateLogin({ email, password }: LoginFields): string | null {
  if (!email || !email.trim()) return "Please enter your email address.";
  if (!email.includes("@")) return "Please enter a valid email address.";
  if (!password) return "Please enter your password.";
  return null;
}

export function validateSignup({
  name,
  email,
  password,
}: SignupFields): string | null {
  if (!name || !name.trim()) return "Please enter your full name.";
  if (!email || !email.trim() || !email.includes("@"))
    return "Please enter a valid email address.";
  if (!password || password.length < 6)
    return "Password must be at least 6 characters.";
  return null;
}
