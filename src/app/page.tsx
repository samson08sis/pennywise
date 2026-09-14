"use client";

import { CircleHelp, CreditCard, LayoutDashboard, Wallet } from "lucide-react";
import Hero from "@/components/Hero";
import Brand from "@/components/Brand";
import { useModal } from "@/hooks/useModal";
import { AuthModal } from "@/components/auth/AuthModal";
import { AuthModalProps } from "@/types/auth";
export default function HomePage() {
  const { activeModal, params, openModal, closeModal } = useModal();

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8fa] text-[#18212f]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Brand />
        <div className="hidden items-center gap-8 text-sm text-[#667180] md:flex">
          <a href="#how-it-works" className="hover:text-[#2f6fed]">
            How it works
          </a>
          <a href="#features" className="hover:text-[#2f6fed]">
            Features
          </a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal("auth", { mode: "login" })}
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-[#667180] hover:bg-white sm:block">
            Log in
          </button>
          <button
            onClick={() => openModal("auth", { mode: "signup" })}
            className="rounded-lg bg-[#2f6fed] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#245ed1]">
            Create account
          </button>
        </div>
      </nav>
      <Hero openAuth={(mode) => openModal("auth", mode)} />
      <section id="features" className="border-y border-[#e8ebef] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3 md:py-20">
          <Feature
            icon={LayoutDashboard}
            title="Everything at a glance"
            text="See your spending patterns and monthly progress without digging through spreadsheets."
          />
          <Feature
            icon={CreditCard}
            title="Effortless tracking"
            text="Add an expense in seconds and keep your records accurate as life happens."
          />
          <Feature
            icon={CircleHelp}
            title="Clarity, not complexity"
            text="Simple categories and thoughtful summaries help you feel in control."
          />
        </div>
      </section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-[#89929f] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Brand />
        <span>{`© ${new Date().getFullYear()} Pennywise. Your money, made clear.`}</span>
      </footer>
      {activeModal === "auth" && (
        <AuthModal
          mode={(params as AuthModalProps)?.mode}
          onClose={closeModal}
        />
      )}
    </main>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Wallet;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#edf3ff] text-[#2f6fed]">
        <Icon size={19} />
      </div>
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#89929f]">{text}</p>
      </div>
    </div>
  );
}
