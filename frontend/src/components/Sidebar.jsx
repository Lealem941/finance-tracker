import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, TrendingUp, TrendingDown, LogOut } from 'lucide-react';

export const Sidebar = () => {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Income', path: '/income', icon: <TrendingUp size={20} /> },
    { name: 'Expenses', path: '/expenses', icon: <TrendingDown size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Finance Tracker</h2>
        <p>Welcome, {user?.name?.split(' ')[0]}</p>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <Link key={item.name} to={item.path} className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}>
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
