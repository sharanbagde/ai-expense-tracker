import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function ExpenseChart({ data }) {

  const categoryData = Object.values(
    data.reduce((acc,expense)=>{
      if(!acc[expense.category]){
        acc[expense.category] = {name:expense.category,value:0}
      }
      acc[expense.category].value += Number(expense.amount)
      return acc
    },{})
  )

  return (
    <PieChart width={400} height={400}>
      <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={120}>
        {categoryData.map((entry,index)=>(
          <Cell key={index}/>
        ))}
      </Pie>
      <Tooltip/>
    </PieChart>
  )
}