"use client";

import Brand from "@/components/Brand";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  const [name, setName] = useState("Jordan Davis");
  const [email, setEmail] = useState("jordan@example.com");
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  function save(event: React.FormEvent) {
    event.preventDefault();
    if (next && next.length < 6)
      return setMessage("New password must be at least 6 characters.");
    setMessage("Profile changes saved successfully.");
  }

  const onSignOut = () => {
    setAuthenticated(false);
    router.replace("/");
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa] p-5 text-[#18212f] sm:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <Brand />
          <button
            onClick={onSignOut}
            className="text-sm font-medium text-[#d26f5d]">
            Sign out
          </button>
        </div>
        <button
          onClick={router.back}
          className="mt-10 text-sm text-[#667180] hover:text-[#2f6fed]">
          ← Back to dashboard
        </button>
        <div className="mt-6 rounded-2xl border border-[#e8ebef] bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="mt-2 text-sm text-[#89929f]">
            Manage your account details.
          </p>
          <form onSubmit={save} className="mt-8 flex flex-col gap-5">
            <label className="text-sm font-medium">
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none focus:border-[#2f6fed]"
              />
            </label>
            <label className="text-sm font-medium">
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none focus:border-[#2f6fed]"
              />
            </label>
            {message && <p className="text-sm text-[#329679]">{message}</p>}
            <button className="h-11 w-full rounded-lg bg-[#2f6fed] text-sm font-medium text-white hover:bg-[#245ed1] sm:w-fit sm:px-6">
              Save changes
            </button>
          </form>
        </div>
        {/* /////////////// */}
        <div className="mt-6 rounded-2xl border border-[#e8ebef] bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-semibold">Security</h1>
          <p className="mt-2 text-sm text-[#89929f]">Update your password.</p>
          <form onSubmit={save} className="mt-8 flex flex-col gap-5">
            <div className="border-t border-[#edf0f3] pt-6">
              <h2 className="font-semibold">Change password</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  Current password
                  <input
                    type="password"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none focus:border-[#2f6fed]"
                  />
                </label>
                <br />
                <label className="text-sm font-medium">
                  New password
                  <input
                    type="password"
                    value={next}
                    onChange={(e) => setNext(e.target.value)}
                    className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none focus:border-[#2f6fed]"
                  />
                </label>
                <label className="text-sm font-medium">
                  Confirm password
                  <input
                    type="password"
                    value={current}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="mt-2 h-11 w-full rounded-lg border border-[#e5e9ee] px-3 outline-none focus:border-[#2f6fed]"
                  />
                </label>
              </div>
            </div>
            {message && <p className="text-sm text-[#329679]">{message}</p>}
            <button className="h-11 w-full rounded-lg bg-[#2f6fed] text-sm font-medium text-white hover:bg-[#245ed1] sm:w-fit sm:px-6">
              Confirm change
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
