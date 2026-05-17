import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../config';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Minimum 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setApiError('');

    try {
      const res = await fetch(apiUrl('/api/signin/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const raw = await res.text();
      let data = {};
      try {
        if (raw) data = JSON.parse(raw);
      } catch {
        data = {};
      }

      if (!res.ok) {
        const parts = [];
        for (const v of Object.values(data)) {
          if (Array.isArray(v)) parts.push(...v.filter((x) => typeof x === 'string'));
          else if (typeof v === 'string') parts.push(v);
        }
        setApiError(parts.join(' ').trim());
      } else {
        login(data.token, {
          user_id: data.user_id,
          email: data.email,
          full_name: data.full_name,
        });
        navigate('/dashboard');
      }
    } catch {
      setApiError('');
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="header">
        <h1 className="main-title" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>WanderNepal</h1>
        <p className="main-subtitle">Your journey to the peaks begins here.</p>
      </div>

      <div className="login-card">
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="form-title">Welcome Back</h2>
          <p className="form-subtitle">Please enter your details to access your sanctuary.</p>

          {apiError && <div className="alert alert-error">{apiError}</div>}

          <div className="form-group">
            <label className="label">Email Address</label>
            <input
              type="email"
              placeholder="namaste@wandernepal.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input-field ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <div className="password-header">
              <label className="label">Password</label>
            </div>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`input-field ${errors.password ? 'input-error' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password-btn"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login to Account'} →
          </button>
        </form>

        <p className="create-account-text">
          New to WanderNepal?{' '}
          <span className="create-account-link" style={{ cursor: 'pointer' }} onClick={() => navigate('/signup')}>
            Create an account
          </span>
        </p>

        <div className="footer" style={{ marginTop: 32 }}>
          <span className="footer-link" onClick={() => navigate('/')}>HOME</span>
          <span className="footer-link" onClick={() => navigate('/dashboard')}>DESTINATIONS</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
