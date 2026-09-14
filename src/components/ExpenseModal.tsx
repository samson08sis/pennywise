import { categoryColors } from "@/constants/Colors";
import { Expense, ExpenseCategory } from "@/types/expense";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function ExpenseModal({
  form,
  setForm,
  editing,
  onClose,
  onSave,
}: {
  form: {
    description: string;
    amount: string;
    date: string;
    category: ExpenseCategory;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      description: string;
      amount: string;
      date: string;
      category: ExpenseCategory;
    }>
  >;
  editing: Expense | null;
  onClose: () => void;
  onSave: (event: React.FormEvent) => void;
}) {
  useEffect(() => {
    if (!editing && !form.date) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      setForm((prev) => ({ ...prev, date: formattedDate }));
    }
  }, [editing, form.date, setForm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#172235]/30 p-0 sm:items-center sm:p-4">
      <form
        onSubmit={onSave}
        className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {editing ? "Edit expense" : "Add expense"}
            </h2>
            <p className="mt-1 text-sm text-[#89929f]">
              Keep your spending records up to date.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-[#89929f]">
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <label className="text-sm font-medium">
            Description
            <input
              required
              value={form.description}
              onChange={(e) =>
                setForm((c) => ({ ...c, description: e.target.value }))
              }
              placeholder="e.g. Coffee with Alex"
              className="mt-2 h-10 w-full rounded-lg border border-[#e5e9ee] px-3 text-sm outline-none focus:border-[#2f6fed]"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Amount
              <input
                required
                min="0.01"
                step="0.01"
                type="number"
                value={form.amount}
                onChange={(e) =>
                  setForm((c) => ({ ...c, amount: e.target.value }))
                }
                placeholder="0.00"
                className="mt-2 h-10 w-full rounded-lg border border-[#e5e9ee] px-3 text-sm outline-none focus:border-[#2f6fed]"
              />
            </label>
            <label className="text-sm font-medium">
              Date
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((c) => ({ ...c, date: e.target.value }))
                }
                className="mt-2 h-10 w-full rounded-lg border border-[#e5e9ee] px-3 text-sm outline-none focus:border-[#2f6fed]"
              />
            </label>
          </div>
          <label className="text-sm font-medium">
            Category
            <select
              value={form.category}
              onChange={(e) =>
                setForm((c) => ({
                  ...c,
                  category: e.target.value as ExpenseCategory,
                }))
              }
              className="mt-2 h-10 w-full rounded-lg border border-[#e5e9ee] bg-white px-3 text-sm outline-none focus:border-[#2f6fed]">
              {Object.keys(categoryColors).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-[#e5e9ee] py-2.5 text-sm font-medium text-[#667180]">
            Cancel
          </button>
          <button className="flex-1 rounded-lg bg-[#2f6fed] py-2.5 text-sm font-medium text-white">
            {editing ? "Save changes" : "Add expense"}
          </button>
        </div>
      </form>
    </div>
  );
}
