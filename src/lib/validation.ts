export type ForgotPasswordFields = {
  email: string;
};

export type ResetPasswordFields = {
  token: string | null;
  newPassword: string;
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
  newPassword,
  confirmPassword,
}: ResetPasswordFields): string | null {
  if (!token) return "Invalid or missing password reset token.";
  if (!newPassword) return "Password is required.";
  if (newPassword.length < 6) return "Password must be at least 6 characters.";
  if (newPassword !== confirmPassword) return "Passwords do not match.";
  return null;
}
