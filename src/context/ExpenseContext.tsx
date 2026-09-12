"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useAuth } from "@/context/AuthContext";
import * as expenseService from "@/services/expenseService";
import {
  Expense,
  ExpensePagination,
  ExpenseFilterOptions,
  CreateExpensePayload,
  UpdateExpensePayload,
} from "@/types/expense";

interface ExpenseContextType {
  expenses: Expense[];
  pagination: ExpensePagination | null;
  loading: boolean;
  mutating: boolean;
  error: string | null;
  filters: ExpenseFilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<ExpenseFilterOptions>>;
  refreshExpenses: () => Promise<void>;
  addExpense: (payload: CreateExpensePayload) => Promise<Expense>;
  editExpense: (id: string, payload: UpdateExpensePayload) => Promise<Expense>;
  removeExpense: (id: string) => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [pagination, setPagination] = useState<ExpensePagination | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mutating, setMutating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ExpenseFilterOptions>({
    page: 1,
    limit: 10,
  });

  // Fetch expenses safely with error isolation
  const fetchExpenses = useCallback(async () => {
    if (!user) {
      setExpenses([]);
      setPagination(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await expenseService.fetchExpensesApi(filters);
      setExpenses(data.expenses);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err.message || "Failed to load expenses.");
    } finally {
      setLoading(false);
    }
  }, [user, filters]);

  useEffect(() => {
    expenseService.fetchExpensesApi();
  }, [fetchExpenses]);

  const refreshExpenses = async () => {
    await fetchExpenses();
  };

  const addExpense = async (
    payload: CreateExpensePayload
  ): Promise<Expense> => {
    try {
      setMutating(true);
      setError(null);
      const newExpense = await expenseService.createExpenseApi(payload);

      setExpenses((prev) => [newExpense, ...prev]);
      setPagination((prev) =>
        prev ? { ...prev, total: prev.total + 1 } : null
      );

      return newExpense;
    } catch (err: any) {
      setError(err.message || "Failed to add expense.");
      throw err;
    } finally {
      setMutating(false);
    }
  };

  const editExpense = async (
    id: string,
    payload: UpdateExpensePayload
  ): Promise<Expense> => {
    try {
      setMutating(true);
      setError(null);
      const updatedExpense = await expenseService.updateExpenseApi(id, payload);

      setExpenses((prev) =>
        prev.map((item) => (item._id === id ? updatedExpense : item))
      );

      return updatedExpense;
    } catch (err: any) {
      setError(err.message || "Failed to update expense.");
      throw err;
    } finally {
      setMutating(false);
    }
  };

  const removeExpense = async (id: string): Promise<void> => {
    try {
      setMutating(true);
      setError(null);
      await expenseService.deleteExpenseApi(id);

      setExpenses((prev) => prev.filter((item) => item._id !== id));
      setPagination((prev) =>
        prev ? { ...prev, total: Math.max(0, prev.total - 1) } : null
      );
    } catch (err: any) {
      setError(err.message || "Failed to delete expense.");
      throw err;
    } finally {
      setMutating(false);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        pagination,
        loading,
        mutating,
        error,
        filters,
        setFilters,
        refreshExpenses,
        addExpense,
        editExpense,
        removeExpense,
      }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
}
