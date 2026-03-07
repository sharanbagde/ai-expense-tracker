export default function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div className="mt-6 w-96">
      <h2 className="text-xl font-bold mb-3">Expenses</h2>

      {expenses.length === 0 ? (
        <p className="text-gray-400">No expenses added</p>
      ) : (
        <ul className="space-y-2">
          {expenses.map((expense, index) => (
            <li
              key={index}
              className="bg-gray-800 p-3 rounded flex justify-between items-center"
            >
              <span>{expense.title} - ₹{expense.amount}</span>

              <button
                onClick={() => deleteExpense(index)}
                className="bg-red-500 px-2 py-1 rounded text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}