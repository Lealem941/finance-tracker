import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Transaction } from '../components/Transaction';

export const ExpensesPage = () => {
  const { transactions, getTransactions, addTransaction } = useContext(GlobalContext);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expenseTransactions = transactions.filter(t => t.amount < 0);

  const onSubmit = e => {
    e.preventDefault();
    if (!text || !amount) return;

    addTransaction({
      text,
      amount: -Math.abs(amount), // ensure negative
      type: 'expense',
      category
    });
    setText('');
    setAmount('');
  }

  return (
    <div className="page-container">
      <h1 className="page-title text-expense">Expense Management</h1>
      
      <div className="content-grid">
        <div className="card form-card">
          <h3>Add New Expense</h3>
          <form onSubmit={onSubmit}>
            <div className="form-control">
              <label>Description</label>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. Groceries, Rent..." required />
            </div>
            <div className="form-control">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="custom-select">
                <option value="Food">Food & Dining</option>
                <option value="Rent">Rent & Utilities</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-control">
              <label>Amount (Birr)</label>
              <input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" required />
            </div>
            <button className="btn btn-expense">Add Expense</button>
          </form>
        </div>

        <div className="card list-card">
          <h3>Recent Expenses</h3>
          <ul className="list">
            {expenseTransactions.length > 0 ? expenseTransactions.map(transaction => (
              <Transaction key={transaction._id} transaction={transaction} />
            )) : <p className="no-data">No expense records yet.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};
