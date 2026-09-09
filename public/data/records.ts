import { categoryColors } from "@/constants/Colors";
import { Expense } from "@/types";

export const initialExpenses: Expense[] = [
  {
    id: 1,
    description: "Whole Foods Market",
    category: "Food",
    date: "2024-06-16",
    amount: 84.26,
    color: categoryColors.Food,
  },
  {
    id: 2,
    description: "Monthly rent",
    category: "Bills",
    date: "2024-06-15",
    amount: 1850,
    color: categoryColors.Bills,
  },
  {
    id: 3,
    description: "Uber ride to airport",
    category: "Travel",
    date: "2024-06-13",
    amount: 42.8,
    color: categoryColors.Travel,
  },
  {
    id: 4,
    description: "New running shoes",
    category: "Shopping",
    date: "2024-06-11",
    amount: 129.99,
    color: categoryColors.Shopping,
  },
  {
    id: 5,
    description: "Electricity bill",
    category: "Bills",
    date: "2024-06-09",
    amount: 74.3,
    color: categoryColors.Bills,
  },
  {
    id: 6,
    description: "Dinner with friends",
    category: "Food",
    date: "2024-06-07",
    amount: 68.5,
    color: categoryColors.Food,
  },
];
