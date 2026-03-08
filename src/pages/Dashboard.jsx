import ExpenseForm from "../components/ExpenseForm";
import { useState, useEffect } from "react";
import { db } from "../services/firebaseClient";
import { exportExpenses } from "../utils/exportCSV";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  // Load expenses from Firebase
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "expenses"));

      const expensesData = querySnapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data()
      }));

      setExpenses(expensesData);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  
  // Add expense to UI
  const addExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));

      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  return (
    <div className="flex flex-col items-center p-10">

      <h1 className="text-3xl font-bold">Expense Tracker</h1>

      {/* Form */}
      <ExpenseForm addExpense={addExpense} />

      {/* Expense Analytics Chart */}
      <ExpenseChart data={expenses} />

      {/* Expense List */}
      <div className="mt-6 w-96">
      {/*Export Button*/}
      <button
               onClick={() => exportExpenses(expenses)}
               className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Export CSV
            </button>

        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex justify-between items-center bg-gray-700 p-3 rounded mb-2"
          >
            <div>
              <p className="font-semibold">{expense.title}</p>
              <p>₹{expense.amount}</p>
            </div>

            <button
              onClick={() => deleteExpense(expense.id)}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Delete
            </button>
            
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 text-xl font-semibold">
        Total Spent: ₹{total}
      </div>

    </div>
  );
}