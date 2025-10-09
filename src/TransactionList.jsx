import { useState } from "react";
import "./TransactionList.css";

export default function TransactionList({ transactions, onDelete, onEdit }) {
  if (transactions.length === 0) {
    return <p className="no-transactions">No Transactions yet</p>;
  }
  return (
    <div className="transaction-list">
      <h3>Transactions</h3>
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

  return (
    <li
      className="transaction-item"
      onClick={() => setShowDetails((prev) => !prev)}
    >
      <div className="transaction-summary">
        <div className="transaction-main">
          <span className="transaction-name">
            {transaction.name} — <span>{transaction.category}</span>
          </span>
          <span className="transaction-amount">₹{transaction.amount}</span>
        </div>
        <div className="transaction-actions">
          <button
            // className="icon-btn delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(transaction.id);
            }}
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
          <button
            // className="icon-btn edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(transaction);
            }}
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="transaction-details">
          <p>
            <b>Date:</b> {transaction.date}
          </p>
          <p>
            <b>Type: </b>
            <span
              className={`transaction-type ${transaction.type.toLowerCase()}`}
            >
              {transaction.type}
            </span>
          </p>
          <p>
            <b>Description:</b> {transaction.description}
          </p>
          <p>
            <b>Category:</b> {transaction.category}
          </p>
        </div>
      )}
    </li>
  );
}
