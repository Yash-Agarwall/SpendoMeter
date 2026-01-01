import TransactionPage from "./TransactionPage";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">💰 Expense Tracker</h1>
        <p className="app-subtitle">Manage your finances with ease</p>
      </header>
      <TransactionPage />
    </div>
  );
}

export default App;
