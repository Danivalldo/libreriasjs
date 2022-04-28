import { PREFIX } from "./PREFIX";

const defaultExpenses = [
  {
    id: 1,
    subject: "Internet",
    amount: 500,
    date: "2019-01-01",
  },
];

export const appStorage = {
  getExpenses() {
    const expenses = localStorage.getItem(`${PREFIX}_EXPENSES`);
    if (!expenses) {
      this.updateExpenses(defaultExpenses);
      return defaultExpenses;
    }
    return JSON.parse(expenses);
  },
  updateExpenses(newExpenses) {
    localStorage.setItem(`${PREFIX}_EXPENSES`, JSON.stringify(newExpenses));
  },
};
