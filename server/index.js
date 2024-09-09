const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "budgetplannerdb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//#region Budgets

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM budgets ORDER BY date;";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    return res.status(200).send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const budgetName = req.body.budgetName;
  const budgetBalance = req.body.budgetBalance;
  const budgetLimit = req.body.budgetLimit;
  const budgetDate = req.body.budgetDate;
  const budgetNote = req.body.budgetNote;

  const sqlInsert =
    "INSERT INTO budgets (name, balance, budgetLimit, date, note) VALUES (?, ?, ?, ?, ?);";

  db.query(
    sqlInsert,
    [budgetName, budgetBalance, budgetLimit, budgetDate, budgetNote],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      return res.sendStatus(200);
    }
  );
});

app.put("/api/put/:budgetId", (req, res) => {
  const budgetId = req.params.budgetId;
  const budgetName = req.body.budgetName;
  const budgetBalance = req.body.budgetBalance;
  const budgetLimit = req.body.budgetLimit;
  const budgetDate = req.body.budgetDate;
  const budgetNote = req.body.budgetNote;

  const sqlUpdate =
    "UPDATE budgetplannerdb.budgets " +
    "SET name = ?, balance = ?, budgetLimit = ?, date = ?, note = ? " +
    "WHERE budgetId = ?";

  db.query(
    sqlUpdate,
    [budgetName, budgetBalance, budgetLimit, budgetDate, budgetNote, budgetId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      return res.sendStatus(200);
    }
  );
});

app.get("/api/request/:budgetId", (req, res) => {
  const budgetId = req.params.budgetId;
  const sqlSelect =
    "SELECT SUM(e.amount), e.type FROM budgetplannerdb.expenses e WHERE e.budgetId=? GROUP BY e.type;";

  db.query(sqlSelect, [budgetId], (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(400).send();
    }
    res.send(result);
    return res.status(200).json({ message: "overview of expenses" });
  });
});

app.delete("/api/delete/:budgetId", (req, res) => {
  const budgetId = req.params.budgetId;
  const sqlDelete = "DELETE FROM budgets b WHERE b.budgetId=?;";

  db.query(sqlDelete, [budgetId], (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  });
});

app.get("/api/getBudgetBalances", (req, res) => {
  const sqlSelect =
    "SELECT budgetId, name, balance + IFNULL(currentBalance, 0) AS budgetBalance, budgetLimit, date, note FROM " +
    "(SELECT t1.budgetId AS cBudgetId, totalIncome - IFNULL(totalExpense, 0) AS currentBalance FROM " +
    "((SELECT budgetId, SUM(amount) AS totalIncome " +
    "FROM budgetplannerdb.incomes AS i " +
    "GROUP BY budgetId) t1 " +
    "LEFT JOIN " +
    "(SELECT budgetId, SUM(amount) AS totalExpense " +
    "FROM budgetplannerdb.expenses AS e " +
    "GROUP BY budgetId) t2 " +
    "ON t1.budgetId = t2.budgetId) " +
    "UNION " +
    "SELECT t2.budgetId AS cBudgetId, IFNULL(totalIncome, 0) - totalExpense AS currentBalance FROM " +
    "((SELECT budgetId, SUM(amount) AS totalIncome " +
    "FROM budgetplannerdb.incomes AS i " +
    "GROUP BY budgetId) t1 " +
    "RIGHT JOIN " +
    "(SELECT budgetId, SUM(amount) AS totalExpense " +
    "FROM budgetplannerdb.expenses AS e " +
    "GROUP BY budgetId) t2 " +
    "ON t1.budgetId = t2.budgetId)) AS t3 " +
    "RIGHT JOIN budgetplannerdb.budgets AS b " +
    "ON b.budgetId = t3.cBudgetId " +
    "ORDER BY date DESC;";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    return res.status(200).send(result);
  });
});

//#endregion

//#region Expenses

app.get("/api/get/expenses/:budgetId", (req, res) => {
  const budgetId = req.params.budgetId;
  const sqlSelect =
    "SELECT * FROM budgetplannerdb.expenses e WHERE e.budgetId = ? ORDER BY date DESC;";

  db.query(sqlSelect, [budgetId], (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    return res.status(200).send(result);
  });
});

//#endregion

//#region Incomes

app.get("/api/get/incomes/:budgetId", (req, res) => {
  const budgetId = req.params.budgetId;
  const sqlSelect =
    "SELECT * FROM budgetplannerdb.incomes i WHERE i.budgetId = ? ORDER BY date DESC;";

  db.query(sqlSelect, [budgetId], (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    return res.status(200).send(result);
  });
});

//#endregion

app.listen(3001, () => {
  console.log("Running on port 3001");
});
