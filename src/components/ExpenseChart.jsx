import { PieChart, Pie, Cell, Tooltip } from "recharts";
const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042", "#FF4560"];

export default function ExpenseChart({ data = [] }) {

  if (data.length === 0) {
    return (
      <div className="mt-6 text-gray-500">
        No expense data to display
      </div>
    );
  }

  const categoryData = Object.values(
    data.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = {
          name: expense.category,
          value: 0
        };
      }

      acc[expense.category].value += Number(expense.amount);
      return acc;

    }, {})
  );

  return (
    <div className="mt-6 flex justify-center">
      <PieChart width={400} height={400}>
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
        >
          {categoryData.map((entry, index) => (
            <Cell key={index}
            fill={COLORS[index % COLORS.length]}
             />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}