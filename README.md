# CS 348 Project

## Create/Load Sample Database

To create and load the sample database create a localhost server in MySQL and create a schema called `budgetplannerdb`.
Under this schema run the scripts in server/SQL scripts/Tables in the order `users -> budgets -> expenses -> incomes`.
Then run the import scripts in server/SQL scripts/Imports replacing the path string with the absolute path of the files in server/SQL scripts/Datasets.

## Running the Project

Before running the project in both the server and client directories run `npm install`.
If this works and nothing goes wrong (something usually does and its machine specific) in the server and client directories run `npm start`.
This should run the frontend and backend and should open a web page with the app (that hopefully works).

## Current Features

Currently supported features are

- Feature 1

  - Display all budgets associated with the user

- Feature 2

  - Insert new budgets into the budgets table and update the display

- Feature 3

  - Delete budgets from the budgets table and update the display

- Feature 4

  - Display expenses for a budget and group them by their type

- Feature 5

  - Calculate the current balance of a budget from its expenses/incomes

- Feature 6

  - Edit and update the values of a budget

- Fancy Feature 1

  - Make feature 4 display as a pie chart on the UI

- Fancy Feature 2

  - Protect against SQL injection attacks through query parameterization

- Fancy Feature 3

  - Update all tables on UI to be properly formatted tables

- Fancy Feature 4

  - Functionality for dowloading a list of budgets as a CSV file

- Fancy Feature 5

  - Log in as specific users

- Fancy Feature 6 (BONUS)

  - Added pagination and sorting to the tables

- Abtin, Angel, Kaya, Neysa
