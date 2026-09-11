export type ForgotPasswordFields = {
  email: string;
};

export type ResetPasswordFields = {
  token: string | null;
  password: string;
  confirmPassword: string;
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
  password,
  confirmPassword,
}: ResetPasswordFields): string | null {
  if (!token) return "Invalid or missing password reset token.";
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return null;
}
