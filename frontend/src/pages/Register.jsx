import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const { register, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
    } catch (err) {
      setErrorMsg(Array.isArray(err) ? err[0] : err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" required />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
        </div>
        <button className="btn">Register</button>
      </form>
      <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};
