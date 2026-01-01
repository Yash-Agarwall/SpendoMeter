import { useState } from "react";
import "./TransactionList.css";

export default function TransactionList({ transactions, onDelete, onEdit }) {
  if (transactions.length === 0) {
    return (
      <p className="no-transactions">
        📊 No transactions yet. Add your first transaction above!
      </p>
    );
  }
  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
}

function TransactionItem({ transaction, onDelete, onEdit }) {
  const [showDetails, setShowDetails] = useState(false);

  const categoryEmojis = {
    food: "🍔",
    transport: "🚗",
    shopping: "🛍️",
    entertainment: "🎬",
    bills: "📄",
    health: "💊",
    salary: "💼",
    investment: "📈",
    other: "📦",
  };

  return (
    <li
      className="transaction-item"
      onClick={() => setShowDetails((prev) => !prev)}
    >
      <div className="transaction-summary">
        <div className="transaction-icon">
          <span className="category-emoji">
            {categoryEmojis[transaction.category] || "📦"}
          </span>
        </div>
        <div className="transaction-main">
          <div className="transaction-info">
            <span className="transaction-name">{transaction.name}</span>
            <span
              className={`transaction-amount ${
                transaction.amount >= 0 ? "positive" : "negative"
              }`}
            >
              {transaction.amount >= 0 ? "+" : ""}₹
              {Math.abs(transaction.amount).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <span className="transaction-date">{transaction.date}</span>
        </div>
        <div className="transaction-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(transaction.id);
            }}
            title="Delete transaction"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(transaction);
            }}
            title="Edit transaction"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="transaction-details">
          <p>
            <b>📅 Date:</b> {transaction.date}
          </p>
          <p>
            <b>💳 Type:</b>
            <span
              className={`transaction-type ${transaction.type.toLowerCase()}`}
            >
              {transaction.type}
            </span>
          </p>
          {transaction.description && (
            <p>
              <b>📝 Description:</b> {transaction.description}
            </p>
          )}
          <p>
            <b>🏷️ Category:</b> {categoryEmojis[transaction.category] || "📦"}{" "}
            {transaction.category?.charAt(0).toUpperCase() +
              transaction.category?.slice(1) || "Other"}
          </p>
        </div>
      )}
    </li>
  );
}
