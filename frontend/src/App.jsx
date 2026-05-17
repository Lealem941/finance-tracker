import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import { AuthProvider } from './context/AuthContext';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { IncomePage } from './pages/IncomePage';
import { ExpensesPage } from './pages/ExpensesPage';
import { Sidebar } from './components/Sidebar';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <div className="app-container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={
                <PrivateRoute>
                  <div className="dashboard-layout">
                    <Sidebar />
                    <div className="main-content">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/income" element={<IncomePage />} />
                        <Route path="/expenses" element={<ExpensesPage />} />
                      </Routes>
                    </div>
                  </div>
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
