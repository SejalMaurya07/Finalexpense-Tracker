import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#f97316", "#e11d48"];

function CategoryPieChart({ transactions }) {
  const data = transactions.reduce((acc, t) => {
    const item = acc.find((a) => a.name === t.category);
    item ? (item.value += t.amount) : acc.push({ name: t.category, value: t.amount });
    return acc;
  }, []);

  return (
    <div className="mt-10 mx-auto flex justify-center">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default CategoryPieChart;
