import api from "@/services/api";
import { extractErrorMessage } from "@/context/AuthContext";
import {
  Expense,
  ExpensePagination,
  ExpenseFilterOptions,
  CreateExpensePayload,
  UpdateExpensePayload,
  ExpenseSummary,
} from "@/types/expense";

export interface GetExpensesResponse {
  expenses: Expense[];
  pagination: ExpensePagination;
  summary: ExpenseSummary;
}

export const fetchExpensesApi = async (
  options: ExpenseFilterOptions = {}
): Promise<GetExpensesResponse> => {
  try {
    const params = new URLSearchParams();
    if (options.category) params.append("category", options.category);
    if (options.page) params.append("page", options.page.toString());
    if (options.limit) params.append("limit", options.limit.toString());

    const { data } = await api.get<GetExpensesResponse>(
      `/expense?${params.toString()}`
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const createExpenseApi = async (
  payload: CreateExpensePayload
): Promise<Expense> => {
  try {
    const { data } = await api.post<{ expense: Expense }>("/expense", payload);
    return data.expense;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const updateExpenseApi = async (
  id: string,
  payload: UpdateExpensePayload
): Promise<Expense> => {
  try {
    const { data } = await api.put<{ expense: Expense }>(
      `/expense/${id}`,
      payload
    );
    return data.expense;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const deleteExpenseApi = async (id: string): Promise<string> => {
  try {
    const { data } = await api.delete<{ id: string }>(`/expense/${id}`);
    return data.id;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
