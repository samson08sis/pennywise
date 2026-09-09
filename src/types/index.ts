export type Category =
  | "Food"
  | "Travel"
  | "Bills"
  | "Shopping"
  | "Health"
  | "Other";

export type Expense = {
  id: number;
  description: string;
  category: Category;
  date: string;
  amount: number;
  color: string;
};
