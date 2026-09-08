import { AuthMode } from "@/types/auth";
import { FileText } from "lucide-react";
import { initialExpenses } from "../../public/data/records";
import { dateLabel, money } from "@/utils/formatter";

export default function Hero({ onAuth }: { onAuth: (mode: AuthMode) => void }) {
  return (
    <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dbe8ff] bg-white px-3 py-1.5 text-xs font-medium text-[#2f6fed]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#65b9a5]" />A calmer way
          to manage money
        </div>
        <h1 className="max-w-xl text-5xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-6xl lg:text-[70px]">
          Know where your money <span className="text-[#2f6fed]">goes.</span>
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-[#667180]">
          Pennywise makes it easy to track everyday spending, stay on top of
          your budget, and make better decisions with less effort.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => onAuth("signup")}
            className="rounded-lg bg-[#2f6fed] px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#245ed1]">
            Start for free <span className="ml-2">→</span>
          </button>
          <button
            onClick={() => onAuth("login")}
            className="rounded-lg border border-[#dfe5ec] bg-white px-5 py-3 text-sm font-medium text-[#344154] hover:border-[#2f6fed]">
            I already have an account
          </button>
        </div>
        <div className="mt-8 flex items-center gap-3 text-xs text-[#89929f]">
          <div className="flex -space-x-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#f7f8fa] bg-[#dbe8ff] text-[10px] font-semibold text-[#2f6fed]">
              AM
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#f7f8fa] bg-[#f5dcca] text-[10px] font-semibold text-[#9c6545]">
              JL
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#f7f8fa] bg-[#d9efe8] text-[10px] font-semibold text-[#3d806d]">
              RK
            </span>
          </div>
          <span>Join thousands spending with intention</span>
        </div>
      </div>

      {/* Card */}
      <div className="relative">
        <div className="absolute -inset-8 rounded-full bg-[#eaf1ff] blur-3xl" />
        <div className="relative rounded-2xl border border-[#e1e7ef] bg-white p-4 shadow-[0_24px_70px_-25px_rgba(47,111,237,0.32)] sm:p-6">
          <div className="flex items-center justify-between border-b border-[#edf0f3] pb-5">
            <div>
              <p className="text-xs text-[#89929f]">Tuesday, June 18, 2024</p>
              <p className="mt-1 font-medium">Good morning, Samson</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dbe8ff] text-xs font-semibold text-[#2f6fed]">
              SS
            </div>
          </div>
          <div className="grid gap-3 py-5 sm:grid-cols-2">
            <div className="rounded-xl bg-[#f7f9fc] p-4">
              <p className="text-xs text-[#89929f]">Total spent</p>
              <p className="mt-2 text-2xl font-semibold">$2,249.85</p>
              <p className="mt-1 text-xs text-[#d27e69]">↓ 12.8% this month</p>
            </div>
            <div className="rounded-xl bg-[#f7f9fc] p-4">
              <p className="text-xs text-[#89929f]">Monthly budget</p>
              <p className="mt-2 text-2xl font-semibold">$4,500.00</p>
              <p className="mt-1 text-xs text-[#329679]">$1,850 remaining</p>
            </div>
          </div>
          <div className="flex items-center justify-between pb-3">
            <p className="text-sm font-semibold">Recent expenses</p>
            <span className="text-xs font-medium text-[#2f6fed]">View all</span>
          </div>
          {initialExpenses.slice(0, 3).map((expense) => (
            <div
              key={expense.id}
              className="flex items-center gap-3 border-t border-[#edf0f3] py-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: `${expense.color}1a`,
                  color: expense.color,
                }}>
                <FileText size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">
                  {expense.description}
                </p>
                <p className="mt-0.5 text-[11px] text-[#89929f]">
                  {expense.category} · {dateLabel(expense.date)}
                </p>
              </div>
              <p className="text-xs font-semibold">{money(expense.amount)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
