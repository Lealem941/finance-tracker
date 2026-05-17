import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Balance } from '../components/Balance';
import { IncomeExpenses } from '../components/IncomeExpenses';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export const Dashboard = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prepare data for Expense Categories Pie Chart
  const expenses = transactions.filter(t => t.amount < 0);
  const categoryTotals = expenses.reduce((acc, t) => {
    const cat = t.category || 'Other';
    acc[cat] = (acc[cat] || 0) + Math.abs(t.amount);
    return acc;
  }, {});
  
  const pieData = Object.keys(categoryTotals).map(key => ({
    name: key, value: categoryTotals[key]
  }));
  const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef'];

  // Prepare data for Income vs Expense Bar Chart
  const incomeTotal = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const expenseTotal = expenses.reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const barData = [
    { name: 'Income', amount: incomeTotal, fill: '#10b981' },
    { name: 'Expense', amount: expenseTotal, fill: '#ef4444' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Dashboard Overview</h1>
      <div className="dashboard-cards">
        <div className="card balance-card">
          <Balance />
        </div>
        <div className="card inc-exp-card">
          <IncomeExpenses />
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Income vs Expenses</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px'}} />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Expense by Category</h3>
          <div className="chart-wrapper">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px'}} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="no-data">No expenses to display.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
