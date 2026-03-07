import { useState } from "react";
import { db } from "../services/firebaseClient";
import { collection, addDoc } from "firebase/firestore";

export default function ExpenseForm({ addExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FORM SUBMITTED");

    try {
      const docRef = await addDoc(collection(db, "expenses"), {
        title,
        amount: Number(amount),
        createdAt: new Date()
      });

      addExpense({
        id: docRef.id,
        title,
        amount
      });

      setTitle("");
      setAmount("");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg w-96 mt-6"
    >
      <h2 className="text-xl font-bold mb-4">Add Expense</h2>

      <input
        required
        type="text"
        placeholder="Expense name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
      />

      <input
        required
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
      />

      <button
        type="submit"
        className="w-full bg-green-500 p-2 rounded font-semibold cursor-pointer"
      >
        Add Expense
      </button>
    </form>
  );
}