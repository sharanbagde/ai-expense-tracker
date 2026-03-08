import Papa from "papaparse";

export const exportExpenses = (expenses) => {
  const csv = Papa.unparse(expenses);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "expenses.csv";
  link.click();
};