import React, { useState } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "College Canteen",
      category: "Food",
      amount: 120,
      date: "22 Sep 2026",
    },
    {
      id: 2,
      title: "Bus Pass",
      category: "Transport",
      amount: 500,
      date: "20 Sep 2026",
    },
    {
      id: 3,
      title: "Notebook",
      category: "Education",
      amount: 180,
      date: "18 Sep 2026",
    },
  ]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  const budget = 5000;

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const remaining = budget - totalExpense;

  const addExpense = (e) => {
    e.preventDefault();

    if (!title || !amount) {
      alert("Please enter expense details");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      category,
      amount: Number(amount),
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setExpenses([newExpense, ...expenses]);

    setTitle("");
    setAmount("");
    setCategory("Food");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">₹</div>
          <span>SpendWise</span>
        </div>

        <nav>
          <a className="active">Dashboard</a>
          <a>Add Expense</a>
          <a>Expenses</a>
          <a>Analytics</a>
          <a>Budget</a>
        </nav>

        <div className="profile">
          <div className="profile-img">P</div>
          <div>
            <strong>Student</strong>
            <small>My Account</small>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">

        {/* Header */}
        <header className="header">
          <div>
            <p className="welcome">Welcome back 👋</p>
            <h1>Student Dashboard</h1>
          </div>

          <button className="add-btn" onClick={() => {
            document
              .getElementById("expense-form")
              .scrollIntoView({ behavior: "smooth" });
          }}>
            + Add Expense
          </button>
        </header>

        {/* Summary Cards */}
        <section className="cards">

          <div className="card">
            <div className="card-top">
              <span>Total Expenses</span>
              <div className="card-icon red">₹</div>
            </div>
            <h2>₹{totalExpense.toLocaleString()}</h2>
            <p>This month</p>
          </div>

          <div className="card">
            <div className="card-top">
              <span>Monthly Budget</span>
              <div className="card-icon blue">◉</div>
            </div>
            <h2>₹{budget.toLocaleString()}</h2>
            <p>Your monthly limit</p>
          </div>

          <div className="card">
            <div className="card-top">
              <span>Remaining</span>
              <div className="card-icon green">✓</div>
            </div>
            <h2>₹{remaining.toLocaleString()}</h2>
            <p>Available balance</p>
          </div>

          <div className="card">
            <div className="card-top">
              <span>Transactions</span>
              <div className="card-icon purple">↗</div>
            </div>
            <h2>{expenses.length}</h2>
            <p>This month</p>
          </div>

        </section>

        <div className="content-grid">

          {/* Add Expense */}
          <section className="expense-form" id="expense-form">
            <h2>Add New Expense</h2>
            <p className="section-subtitle">
              Record your daily spending
            </p>

            <form onSubmit={addExpense}>

              <label>Expense Name</label>
              <input
                type="text"
                placeholder="e.g. Lunch, Books..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Food</option>
                <option>Transport</option>
                <option>Education</option>
                <option>Shopping</option>
                <option>Entertainment</option>
                <option>Other</option>
              </select>

              <label>Amount</label>
              <div className="amount-input">
                <span>₹</span>
                <input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <button className="submit-btn" type="submit">
                Add Expense
              </button>

            </form>
          </section>

          {/* Budget */}
          <section className="budget-box">
            <div className="budget-heading">
              <div>
                <h2>Monthly Budget</h2>
                <p>September 2026</p>
              </div>
              <span>₹{budget}</span>
            </div>

            <div className="progress">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(
                    (totalExpense / budget) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>

            <div className="budget-info">
              <span>₹{totalExpense} spent</span>
              <span>₹{Math.max(remaining, 0)} left</span>
            </div>

            <div className="tip">
              <span>💡</span>
              <div>
                <strong>Smart Tip</strong>
                <p>
                  Keep tracking your expenses to stay within your budget.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Recent Expenses */}
        <section className="recent">
          <div className="recent-header">
            <div>
              <h2>Recent Expenses</h2>
              <p>Your latest transactions</p>
            </div>

            <button className="view-btn">
              View All →
            </button>
          </div>

          <div className="expense-list">

            {expenses.map((expense) => (
              <div className="expense-item" key={expense.id}>

                <div className="expense-left">
                  <div
                    className={`expense-icon ${expense.category
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {expense.category === "Food" && "🍔"}
                    {expense.category === "Transport" && "🚌"}
                    {expense.category === "Education" && "📚"}
                    {expense.category === "Shopping" && "🛍️"}
                    {expense.category === "Entertainment" && "🎬"}
                    {expense.category === "Other" && "📌"}
                  </div>

                  <div>
                    <h3>{expense.title}</h3>
                    <p>
                      {expense.category} • {expense.date}
                    </p>
                  </div>
                </div>

                <div className="expense-right">
                  <strong>₹{expense.amount}</strong>

                  <button
                    className="delete-btn"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    ×
                  </button>
                </div>

              </div>
            ))}

          </div>
        </section>

      </main>
    </div>
  );
}

export default App;