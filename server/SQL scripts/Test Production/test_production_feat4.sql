SELECT SUM(e.amount), e.type FROM budgetplannerdb.expenses e
WHERE e.budgetId=913 
GROUP BY e.type;


