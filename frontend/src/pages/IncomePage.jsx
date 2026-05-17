import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Transaction } from '../components/Transaction';

export const IncomePage = () => {
  const { transactions, getTransactions, addTransaction } = useContext(GlobalContext);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Salary');

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const incomeTransactions = transactions.filter(t => t.amount > 0);

  const onSubmit = e => {
    e.preventDefault();
    if (!text || !amount) return;

    addTransaction({
      text,
      amount: +Math.abs(amount),
      type: 'income',
      category
    });
    setText('');
    setAmount('');
  }

  return (
    <div className="page-container">
      <h1 className="page-title text-income">Income Management</h1>
      
      <div className="content-grid">
        <div className="card form-card">
          <h3>Add New Income</h3>
          <form onSubmit={onSubmit}>
            <div className="form-control">
              <label>Source</label>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. Salary, Freelance..." required />
            </div>
            <div className="form-control">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="custom-select">
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Investments">Investments</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-control">
              <label>Amount (Birr)</label>
              <input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" required />
            </div>
            <button className="btn btn-income">Add Income</button>
          </form>
        </div>

        <div className="card list-card">
          <h3>Recent Income</h3>
          <ul className="list">
            {incomeTransactions.length > 0 ? incomeTransactions.map(transaction => (
              <Transaction key={transaction._id} transaction={transaction} />
            )) : <p className="no-data">No income records yet.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};
