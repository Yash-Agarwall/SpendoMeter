import { useEffect, useState } from "react";
import "./TransactionForm.css";

export default function TransactionForm({ initialValues, onSubmit }) {
  let [formData, setformData] = useState(initialValues);

  useEffect(() => {
    setformData(initialValues);
  }, [initialValues]);

  let handleChange = (event) => {
    let { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    if (
      formData.name === "" ||
      formData.amount === "" ||
      isNaN(formData.amount)
    ) {
      return;
    }

    let signedAmount =
      formData.type === "expense"
        ? -Math.abs(Number(formData.amount))
        : Math.abs(Number(formData.amount));
    onSubmit({
      ...formData,
      amount: signedAmount,
      id: formData.id || Date.now(),
      date: formData.date || new Date().toLocaleDateString(),
    });

    // Reset form if not editing
    if (!formData.id) {
      setformData({
        name: "",
        description: "",
        amount: "",
        type: "expense",
        id: "",
        date: "",
        category: "other",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Transaction Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Grocery Shopping"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount *</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="type">Type *</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            value={formData.type}
          >
            <option value="expense">💸 Expense</option>
            <option value="income">💰 Income</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            value={formData.category || "other"}
          >
            <option value="food">🍔 Food & Dining</option>
            <option value="transport">🚗 Transportation</option>
            <option value="shopping">🛍️ Shopping</option>
            <option value="entertainment">🎬 Entertainment</option>
            <option value="bills">📄 Bills & Utilities</option>
            <option value="health">💊 Healthcare</option>
            <option value="salary">💼 Salary</option>
            <option value="investment">📈 Investment</option>
            <option value="other">📦 Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="desc">Description</label>
        <input
          type="text"
          id="desc"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add details about this transaction..."
        />
      </div>

      <button type="submit">
        {formData.id ? "✓ Update Transaction" : "+ Add Transaction"}
      </button>
    </form>
  );
}
