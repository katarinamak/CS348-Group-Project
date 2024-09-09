-- group by type from budget 123 and sum over the amount for each type
SELECT SUM(e.amount), e.type FROM budgetplannerdb.expenses e
WHERE e.budgetId=123 
GROUP BY e.type;


