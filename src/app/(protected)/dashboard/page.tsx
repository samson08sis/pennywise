"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CircleHelp,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
  Wallet,
} from "lucide-react";
import { categoryColors } from "@/constants/Colors";
import { dateLabel, getTodayDateString, money } from "@/utils/formatter";
import Brand from "@/components/Brand";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/auth";
import { useExpenses } from "@/context/ExpenseContext";
import { Expense, ExpenseCategory } from "@/types/expense";
import ExpenseModal from "@/components/ExpenseModal";
import { SpendingByCategory } from "@/components/dashboard-page";
import { DeleteConfirmModal } from "@/components/DeleteConfirmationModal";

const navItems = [{ label: "Dashboard", icon: LayoutDashboard }];

type SortOption =
  | "amount-desc"
  | "amount-asc"
  | "updatedAt-desc"
  | "updatedAt-asc"
  | "date-desc"
  | "date-asc";

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0][0].toUpperCase();

  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

function Sidebar({
  user,
  onSignout,
}: {
  user: User | null;
  onSignout: () => void;
}) {
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
            {getInitials(user?.name || "User")}
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name || "User"}</p>
            <p className="text-xs text-[#89929f]">Personal account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Navbar({
  user,
  onSignout,
}: {
  user: User | null;
  onSignout: () => void;
}) {
  return (
    <header className="flex h-19 items-center justify-between border-b border-[#e8ebef] bg-white px-5 sm:px-8">
      <div className="lg:hidden">
        <Brand />
      </div>
      <div className="hidden lg:block">
        <p className="text-sm text-[#89929f]">{today}</p>
        <p className="text-[15px] font-medium">
          Good morning, {user?.name.trim().split(" ")[0]}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onSignout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#667180] hover:bg-[#f5f7fa]">
          <LogOut size={16} />
          <span className="hidden sm:inline">Sign out</span>
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dbe8ff] text-xs font-semibold text-[#2f6fed]">
          {getInitials(user?.name || "User")}
        </div>
      </div>
    </header>
  );
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const {
    expenses,
    pagination,
    summary,
    setFilters,
    refreshExpenses,
    addExpense,
    editExpense,
    removeExpense,
  } = useExpenses();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: getTodayDateString(),
    category: "Food" as ExpenseCategory,
  });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [sortBy, setSortBy] = useState<SortOption>("updatedAt-desc");
  const [deleteTarget, setDeleteTarget] = useState<Expense | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    refreshExpenses();
  }, [refreshExpenses]);

  const filtered = useMemo(() => {
    return expenses
      .filter(
        (e) =>
          (e.description.toLowerCase().includes(query.toLowerCase()) ||
            e.category.toLowerCase().includes(query.toLowerCase())) &&
          (category === "All categories" || e.category === category)
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "updatedAt-desc":
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          case "updatedAt-asc":
            return (
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
            );
          case "date-desc":
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          case "date-asc":
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          case "amount-desc":
            return Number(b.amount) - Number(a.amount);
          case "amount-asc":
            return Number(a.amount) - Number(b.amount);
          default:
            return 0;
        }
      });
  }, [expenses, query, category, sortBy]);

  const openCreate = () => {
    setEditing(null);
    setForm({
      description: "",
      amount: "",
      date: getTodayDateString(),
      category: "Food" as ExpenseCategory,
    });
    setShowForm(true);
  };

  function openEdit(e: Expense) {
    setEditing(e);
    setForm({
      description: e.description,
      amount: String(e.amount),
      date: e.date,
      category: e.category,
    });
    setShowForm(true);
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();

    const amount = Number(form.amount);
    const description = form.description.trim();

    if (!description || !Number.isFinite(amount) || amount <= 0) {
      // setError("Please enter a valid description and a positive amount.");
      return;
    }

    const payload = {
      amount,
      description: description,
      category: form.category,
      date: form.date,
    };

    try {
      if (editing) {
        await editExpense(editing._id, payload);
      } else {
        await addExpense(payload);
      }

      setShowForm(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        // setError(err.message);
      } else {
        // setError("Failed to save expense. Please try again.");
      }
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      await removeExpense(deleteTarget._id);
      setDeleteTarget(null);
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  };

  const onSignout = async () => {
    await logout();
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#18212f]">
      <Sidebar user={user} onSignout={onSignout} />
      <section className="lg:ml-64">
        <Navbar user={user} onSignout={onSignout} />
        <div className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-[#2f6fed]">Overview</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] sm:text-[28px]">
                Your spending at a glance
              </h1>
              <p className="mt-2 text-sm text-[#89929f]">
                Keep track of your money, without the busywork.
              </p>
            </div>
            <button
              onClick={openCreate}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#2f6fed] px-4 py-2.5 text-sm font-medium text-white">
              <Plus size={17} />
              Add expense
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Summary
              label="Total expenses"
              value={money(summary.totalExpenses)}
              detail="All time"
              icon={Wallet}
            />
            <Summary
              label="Monthly expenses"
              value={money(summary.monthlyExpenses)}
              detail="This month"
              icon={BarChart3}
            />
            <Summary
              label="Largest category"
              value={
                summary.categoryBreakdown?.[0]
                  ? money(summary.categoryBreakdown[0].total)
                  : "$0.00"
              }
              detail={
                summary.categoryBreakdown?.[0]?.category
                  ? summary.categoryBreakdown[0].category
                  : "No expenses"
              }
              icon={FileText}
            />
            <Summary
              label="Transactions"
              value={summary.expenseCount.toString()}
              detail="Total logged"
              icon={CreditCard}
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
            <section className="min-w-0 rounded-xl border border-[#e8ebef] bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#edf0f3] px-5 py-5">
                  <div>
                    <h2 className="font-semibold">Recent expenses</h2>
                    <p className="mt-1 text-sm text-[#89929f]">
                      Your latest transactions
                    </p>
                  </div>
                  <button
                    onClick={openCreate}
                    className="flex items-center gap-1.5 text-sm font-medium text-[#2f6fed]">
                    <Plus size={16} />
                    New expense
                  </button>
                </div>

                <div className="flex flex-col gap-3 border-b border-[#edf0f3] p-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a5aeb9]"
                      size={17}
                    />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search expenses"
                      className="h-10 w-full rounded-lg border border-[#e5e9ee] bg-[#fafbfc] pl-9 pr-3 text-sm outline-none focus:border-[#2f6fed]"
                    />
                  </div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-10 rounded-lg border border-[#e5e9ee] bg-[#fafbfc] px-3 text-sm text-[#667180] outline-none sm:w-44">
                    <option>All categories</option>
                    {Object.keys(categoryColors).map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="h-10 rounded-lg border border-[#e5e9ee] bg-[#fafbfc] px-3 text-sm text-[#667180] outline-none sm:w-44">
                    <option value="updatedAt-desc">Last Updated</option>
                    <option value="date-desc">Date: Newest First</option>
                    <option value="date-asc">Date: Oldest First</option>
                    <option value="amount-desc">Amount: High to Low</option>
                    <option value="amount-asc">Amount: Low to High</option>
                  </select>
                </div>

                <div className="divide-y divide-[#edf0f3]">
                  {filtered.map((e) => (
                    <ExpenseRow
                      key={e._id}
                      expense={e}
                      onEdit={openEdit}
                      onDelete={() => setDeleteTarget(e)}
                    />
                  ))}
                  {!filtered.length && (
                    <p className="px-5 py-14 text-center text-sm text-[#89929f]">
                      No expenses found.
                    </p>
                  )}
                </div>
              </div>

              {/* Pagination Footer */}
              {pagination && (
                <div className="flex items-center justify-between border-t border-[#edf0f3] px-5 py-3.5 text-sm text-[#667180]">
                  <div>
                    Showing page{" "}
                    <span className="font-medium text-[#111827]">
                      {pagination.page}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-[#111827]">
                      {pagination.totalPages}
                    </span>{" "}
                    ({pagination.total} total)
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          page: (prev.page ?? 1) - 1,
                        }))
                      }
                      disabled={pagination.page <= 1}
                      className="rounded-lg border border-[#e5e9ee] px-3 py-1.5 text-sm font-medium text-[#344054] transition hover:bg-[#f9fafb] disabled:opacity-50">
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          page: (prev.page ?? 1) + 1,
                        }))
                      }
                      disabled={pagination.page >= pagination.totalPages}
                      className="rounded-lg border border-[#e5e9ee] px-3 py-1.5 text-sm font-medium text-[#344054] transition hover:bg-[#f9fafb] disabled:opacity-50">
                      Next
                    </button>
                  </div>
                </div>
              )}
            </section>
            <SpendingByCategory summary={summary} />
          </div>
        </div>
      </section>

      {showForm && (
        <ExpenseModal
          form={form}
          setForm={setForm}
          editing={editing}
          onClose={() => setShowForm(false)}
          onSave={save}
        />
      )}
      {!!deleteTarget && (
        <DeleteConfirmModal
          item={deleteTarget}
          isLoading={isDeleting}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </main>
  );
}

function ExpenseRow({
  expense,
  onEdit,
  onDelete,
}: {
  expense: Expense;
  onEdit: (e: Expense) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="group flex items-center gap-3 px-5 py-4 hover:bg-[#fbfcfd]">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{
          backgroundColor: `${categoryColors[expense.category]}1a`,
          color: categoryColors[expense.category],
        }}>
        <FileText size={17} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{expense.description}</p>
        <p className="mt-1 text-xs text-[#89929f]">
          {expense.category} · {dateLabel(expense.date)}
        </p>
      </div>
      <span className="text-sm font-semibold">{money(expense.amount)}</span>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100">
        <button
          aria-label={`Edit ${expense.description}`}
          onClick={() => onEdit(expense)}
          className="rounded-md p-1.5 text-[#89929f] hover:bg-[#edf3ff] hover:text-[#2f6fed]">
          <Pencil size={15} />
        </button>
        <button
          aria-label={`Delete ${expense.description}`}
          onClick={() => onDelete(expense._id)}
          className="rounded-md p-1.5 text-[#89929f] hover:bg-[#fff0ed] hover:text-[#d26f5d]">
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

function Summary({
  label,
  value,
  detail,
  icon: Icon,
  trend,
  bad = false,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Wallet;
  trend?: string;
  bad?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#e8ebef] bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#89929f]">{label}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f1f5fb] text-[#6e819e]">
          <Icon size={16} />
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-[23px] font-semibold">{value}</span>
        {trend && (
          <span
            className={`flex items-center text-xs font-medium ${
              bad ? "text-[#d27e69]" : "text-[#329679]"
            }`}>
            {bad ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
            {trend}
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-[#89929f]">{detail}</p>
    </div>
  );
}
