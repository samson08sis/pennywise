export enum ExpenseCategory {
  FOOD = "Food",
  TRAVEL = "Travel",
  BILLS = "Bills",
  SHOPPING = "Shopping",
  ENTERTAINMENT = "Entertainment",
  HEALTH = "Health",
  OTHER = "Other",
}

export interface Expense {
  _id: string;
  user: string;
  amount: number;
  date: string;
  description: string;
  category: ExpenseCategory;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryBreakdown {
  category: string;
  total: number;
}

export interface ExpenseSummary {
  totalExpenses: number;
  monthlyExpenses: number;
  expenseCount: number;
  categoryBreakdown: CategoryBreakdown[];
}

export interface ExpensePagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ExpenseFilterOptions {
  category?: string;
  page?: number;
  limit?: number;
}

export interface CreateExpensePayload {
  amount: number;
  description: string;
  category: ExpenseCategory;
  date?: string;
}

export type UpdateExpensePayload = CreateExpensePayload;
