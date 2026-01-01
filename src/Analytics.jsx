import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Analytics.css";

export default function Analytics({ transactions }) {
  const COLORS = {
    food: "#FF6B6B",
    transport: "#4ECDC4",
    shopping: "#45B7D1",
    entertainment: "#FFA07A",
    bills: "#98D8C8",
    health: "#F7DC6F",
    salary: "#52B788",
    investment: "#9B59B6",
    other: "#95A5A6",
  };

  const getCategoryData = () => {
    const categoryMap = {};

    transactions.forEach((tx) => {
      const category = tx.category || "other";
      const amount = Math.abs(tx.amount);

      if (!categoryMap[category]) {
        categoryMap[category] = { name: category, value: 0 };
      }
      categoryMap[category].value += amount;
    });

    return Object.values(categoryMap).sort((a, b) => b.value - a.value);
  };

  const getExpenseData = () => {
    const expenseCategories = {};

    transactions
      .filter((tx) => tx.amount < 0)
      .forEach((tx) => {
        const category = tx.category || "other";
        const amount = Math.abs(tx.amount);

        if (!expenseCategories[category]) {
          expenseCategories[category] = { name: category, value: 0 };
        }
        expenseCategories[category].value += amount;
      });

    return Object.values(expenseCategories).sort((a, b) => b.value - a.value);
  };

  const getIncomeData = () => {
    const incomeCategories = {};

    transactions
      .filter((tx) => tx.amount > 0)
      .forEach((tx) => {
        const category = tx.category || "other";
        const amount = tx.amount;

        if (!incomeCategories[category]) {
          incomeCategories[category] = { name: category, value: 0 };
        }
        incomeCategories[category].value += amount;
      });

    return Object.values(incomeCategories).sort((a, b) => b.value - a.value);
  };

  const expenseData = getExpenseData();
  const incomeData = getIncomeData();
  const totalExpense = expenseData.reduce((sum, item) => sum + item.value, 0);
  const totalIncome = incomeData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = (
        (data.value / (totalExpense || totalIncome)) *
        100
      ).toFixed(1);
      return (
        <div className="custom-tooltip">
          <p className="label">{data.name}</p>
          <p className="value">
            ₹{data.value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </p>
          <p className="percentage">{percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">📊 Financial Analytics</h2>

      <div className="charts-grid">
        {expenseData.length > 0 && (
          <div className="chart-card">
            <h3>Expense Distribution</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.name] || "#95A5A6"}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-summary">
              <p className="total">
                Total Expenses:{" "}
                <span>₹{totalExpense.toLocaleString("en-IN")}</span>
              </p>
              <div className="category-breakdown">
                {expenseData.map((item, idx) => (
                  <div key={idx} className="category-item">
                    <span
                      className="category-color"
                      style={{
                        backgroundColor: COLORS[item.name] || "#95A5A6",
                      }}
                    ></span>
                    <span className="category-name">{item.name}</span>
                    <span className="category-value">
                      ₹
                      {item.value.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {incomeData.length > 0 && (
          <div className="chart-card">
            <h3>Income Distribution</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={incomeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#82ca9d"
                    dataKey="value"
                  >
                    {incomeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.name] || "#95A5A6"}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-summary">
              <p className="total">
                Total Income:{" "}
                <span>₹{totalIncome.toLocaleString("en-IN")}</span>
              </p>
              <div className="category-breakdown">
                {incomeData.map((item, idx) => (
                  <div key={idx} className="category-item">
                    <span
                      className="category-color"
                      style={{
                        backgroundColor: COLORS[item.name] || "#95A5A6",
                      }}
                    ></span>
                    <span className="category-name">{item.name}</span>
                    <span className="category-value">
                      ₹
                      {item.value.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {expenseData.length === 0 && incomeData.length === 0 && (
        <div className="no-data">
          <p>📈 No transaction data to analyze yet</p>
        </div>
      )}
    </div>
  );
}
