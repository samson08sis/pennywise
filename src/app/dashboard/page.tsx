"use client";

import { CircleHelp, LayoutDashboard, LogOut, Settings } from "lucide-react";
import Brand from "@/components/Brand";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const navItems = [{ label: "Dashboard", icon: LayoutDashboard }];

function Sidebar({ onSignout }: { onSignout: () => void }) {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-[#e8ebef] bg-white px-5 py-7 lg:flex">
      <Brand />
      <p className="mt-12 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9ba4b0]">
        Workspace
      </p>
      <nav className="mt-3 flex flex-col gap-1">
        {navItems.map(({ label, icon: Icon }, i) => (
          <button
            key={label}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${
              i === 0
                ? "bg-[#edf3ff] font-medium text-[#2f6fed]"
                : "text-[#667180] hover:bg-[#f5f7fa]"
            }`}>
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-1 border-t border-[#edf0f3] pt-5">
        <Link
          href={"/profile"}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#667180]">
          <Settings size={18} />
          Profile & Security
        </Link>
        <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#667180]">
          <CircleHelp size={18} />
          Help center
        </button>
        <button
          onClick={onSignout}
          className="mt-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#d26f5d] hover:bg-[#fff0ed]">
          <LogOut size={18} />
          Sign out
        </button>
        <div className="mt-3 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dbe8ff] text-sm font-semibold text-[#2f6fed]">
            JD
          </div>
          <div>
            <p className="text-sm font-medium">Jordan Davis</p>
            <p className="text-xs text-[#89929f]">Personal account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Navbar({ onSignout }: { onSignout: () => void }) {
  return (
    <header className="flex h-19 items-center justify-between border-b border-[#e8ebef] bg-white px-5 sm:px-8">
      <div className="lg:hidden">
        <Brand />
      </div>
      <div className="hidden lg:block">
        <p className="text-sm text-[#89929f]">Tuesday, June 18, 2024</p>
        <p className="text-[15px] font-medium">Good morning, Jordan</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onSignout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#667180] hover:bg-[#f5f7fa]">
          <LogOut size={16} />
          <span className="hidden sm:inline">Sign out</span>
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dbe8ff] text-xs font-semibold text-[#2f6fed]">
          JD
        </div>
      </div>
    </header>
  );
}

export default function Dashboard() {
  const { logout } = useAuth();

  const onSignout = async () => {
    await logout();
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#18212f]">
      <Sidebar onSignout={onSignout} />
      <section className="lg:ml-64">
        <Navbar onSignout={onSignout} />
      </section>
    </main>
  );
}
