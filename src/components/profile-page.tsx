"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { CheckCircle2, KeyRound, Pencil, ShieldCheck } from "lucide-react";

type ProfileUser = {
  name: string;
  email: string;
};

type ProfileHeaderProps = {
  onEdit: () => void;
};

const defaultUser = { name: "User", email: "" };

export function ProfileHeader({ onEdit }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-[#edf0f3] pb-7 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-sm font-medium text-[#2f6fed]">Account</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-2 text-sm leading-6 text-[#667180]">
          Manage your personal information and account security.
        </p>
      </div>
      {/* <button
        type="button"
        onClick={onEdit}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe5ec] bg-white px-4 text-sm font-medium transition hover:border-[#2f6fed] hover:text-[#2f6fed]">
        <Pencil className="size-4" />
        Edit profile
      </button> */}
    </header>
  );
}

export function ProfileDetails({ user }: { user: ProfileUser }) {
  return (
    <div className="grid gap-5 pt-7 sm:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#89929f]">
          Name
        </p>
        <p className="mt-2 text-sm font-medium">{user.name}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#89929f]">
          Email
        </p>
        <p className="mt-2 text-sm font-medium">{user.email}</p>
      </div>
    </div>
  );
}

export function EditProfileForm({
  user,
  onCancel,
  onSave,
}: {
  user: ProfileUser | null;
  onCancel: () => void;
  onSave: (name: string) => void;
}) {
  const [name, setName] = useState(user?.name);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name?.trim();
    if (trimmedName) onSave(trimmedName);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-7 space-y-5 border-t border-[#edf0f3] pt-7">
      <div>
        <label
          htmlFor="profile-name"
          className="mb-2 block text-sm font-medium">
          Full name
        </label>
        <input
          id="profile-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="h-11 w-full rounded-lg border border-[#dfe5ec] bg-white px-3 text-sm outline-none transition focus:border-[#2f6fed] focus:ring-4 focus:ring-[#2f6fed]/10"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="h-10 rounded-lg bg-[#2f6fed] px-4 text-sm font-medium text-white hover:bg-[#245ed0]">
          Save changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="h-10 rounded-lg border border-[#dfe5ec] px-4 text-sm font-medium hover:bg-[#f7f8fa]">
          Cancel
        </button>
      </div>
    </form>
  );
}

export function ChangePasswordSection({ onChange }: { onChange: () => void }) {
  return (
    <section className="mt-6 rounded-2xl border border-[#e8ebef] bg-white p-7 shadow-sm sm:p-9">
      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#2f6fed]">
          <KeyRound className="size-5" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold">Change password</h2>
          <p className="mt-2 text-sm leading-6 text-[#667180]">
            Keep your account secure with a strong, unique password.
          </p>
          <button
            type="button"
            onClick={onChange}
            className="mt-5 h-10 rounded-lg border border-[#dfe5ec] px-4 text-sm font-medium hover:border-[#2f6fed] hover:text-[#2f6fed]">
            Change password
          </button>
        </div>
      </div>
    </section>
  );
}

export function ChangePasswordForm({ onCancel }: { onCancel: () => void }) {
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const oldPassword = String(form.get("oldPassword") ?? "");
    const newPassword = String(form.get("newPassword") ?? "");
    const confirmation = String(form.get("confirmation") ?? "");
    if (!oldPassword || newPassword.length < 8)
      return setError(
        "Enter your current password and a new password with at least 8 characters."
      );
    if (newPassword !== confirmation)
      return setError("New passwords do not match.");
    setError("");
    setSaved(true);
  }

  if (saved)
    return (
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#ccebdc] bg-[#f0fbf5] p-4 text-sm text-[#17663d]">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
        <div>
          <p className="font-medium">Password updated</p>
          <p className="mt-1">Your password has been changed successfully.</p>
        </div>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 border-t border-[#edf0f3] pt-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <PasswordField
          id="oldPassword"
          label="Current password"
          autoComplete="current-password"
          customStyle="col-span-2"
        />
        <PasswordField
          id="newPassword"
          label="New password"
          autoComplete="new-password"
        />
        <PasswordField
          id="confirmation"
          label="Confirm password"
          autoComplete="new-password"
        />
      </div>
      {error && (
        <p role="alert" className="mt-4 text-sm text-[#b42318]">
          {error}
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          className="h-10 rounded-lg bg-[#2f6fed] px-4 text-sm font-medium text-white hover:bg-[#245ed0]">
          Update password
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="h-10 rounded-lg border border-[#dfe5ec] px-4 text-sm font-medium hover:bg-[#f7f8fa]">
          Cancel
        </button>
      </div>
    </form>
  );
}

function PasswordField({
  id,
  label,
  autoComplete,
  customStyle,
}: {
  id: string;
  label: string;
  autoComplete: string;
  customStyle?: string;
}) {
  return (
    <div className={customStyle}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="password"
        autoComplete={autoComplete}
        required
        className="h-11 w-full rounded-lg border border-[#dfe5ec] bg-white px-3 text-sm outline-none transition focus:border-[#2f6fed] focus:ring-4 focus:ring-[#2f6fed]/10"
      />
    </div>
  );
}

export function ProfilePage({ initialUser }: { initialUser: ProfileUser }) {
  const [user, setUser] = useState(initialUser);
  const [editingProfile, setEditingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f8fa] p-6 text-[#18212f] sm:p-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/dashboard"
          className="text-sm text-[#667180] hover:text-[#2f6fed]">
          ← Back to dashboard
        </Link>
        <section className="mt-6 rounded-2xl border border-[#e8ebef] bg-white p-7 shadow-sm sm:p-9">
          <ProfileHeader
            onEdit={() => {
              setEditingProfile(true);
              setChangingPassword(false);
            }}
          />
          {editingProfile ? (
            <EditProfileForm
              user={user}
              onCancel={() => setEditingProfile(false)}
              onSave={(name) => {
                setUser({ ...user, name });
                setEditingProfile(false);
              }}
            />
          ) : (
            <ProfileDetails user={defaultUser} />
          )}
        </section>
        <ChangePasswordSection
          onChange={() => {
            setChangingPassword(true);
            setEditingProfile(false);
          }}
        />
        {changingPassword && (
          <section className="rounded-2xl border border-[#e8ebef] bg-white p-7 shadow-sm sm:p-9">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-[#2f6fed]" />
              <h2 className="font-semibold">Update your password</h2>
            </div>
            <ChangePasswordForm onCancel={() => setChangingPassword(false)} />
          </section>
        )}
      </div>
    </main>
  );
}
