import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BudgetList from "budgets/BudgetList";
import BudgetForm from "budgets/BudgetForm";
import EditBudget from "budgets/EditBudget";
import ExpenseList from "Expenses/ExpenseList";
import IncomeList from "Incomes/IncomeList";
import "Shared/style.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Budget Planner</h1>
        <Router>
          <Routes>
            <Route path="/" element={[<BudgetForm />, <BudgetList />]} exact />
            <Route path="editBudget" element={<EditBudget />} exact />
            <Route path="expenses" element={<ExpenseList />} exact />
            <Route path="incomes" element={<IncomeList />} exact />
          </Routes>
        </Router>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
