SELECT b.budgetId, b.userId, b.name, b.balance, b.budgetLimit, b.date, b.note, case when (b.budgetLimit + i.isum - e.esum) is not null then cast(b.budgetLimit + i.isum - e.esum as decimal(18,2)) 
				  when (b.budgetLimit - e.esum) is not null then cast(b.budgetLimit - e.esum as decimal(18,2))
                  when (b.budgetLimit + i.isum) is not null then cast(b.budgetLimit + i.isum as decimal(18,2))
                  else cast(b.budgetLimit as decimal(18,2)) end as budgetBalance
FROM (SELECT b.budgetId, b.userId, b.name, b.balance, b.budgetLimit, b.date, b.note FROM budgetplannerdb.budgets b) b
LEFT JOIN
(SELECT e.budgetId, SUM(e.amount) AS esum FROM budgetplannerdb.expenses e GROUP BY e.budgetId) e
ON b.budgetId = e.budgetId
LEFT JOIN (SELECT i.budgetId, SUM(i.amount) AS isum FROM budgetplannerdb.incomes i GROUP BY i.budgetId) i
  ON b.budgetId = i.budgetId;