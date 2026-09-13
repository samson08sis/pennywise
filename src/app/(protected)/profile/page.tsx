"use client";

import {
  ChangePasswordForm,
  ChangePasswordSection,
  EditProfileForm,
  ProfileDetails,
  ProfileHeader,
} from "@/components/profile-page";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [editingProfile, setEditingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const handleSubmit = async (name: string) => {
    await updateProfile(name);
    setEditingProfile(false);
  };

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
              onSave={handleSubmit}
            />
          ) : (
            <ProfileDetails user={user!} />
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
