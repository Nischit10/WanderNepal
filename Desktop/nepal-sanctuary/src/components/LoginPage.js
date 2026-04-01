import React, { useState } from 'react';
import './LoginPage.css';

// LoginPage Component - Main login form for Nepal Sanctuary
const LoginPage = () => {
  // State to store form input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle login button click
  // Currently just logs the values - no actual processing since there's no backend yet
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', {
      email: email,
      password: password
    });
    // TODO: Add actual login API call here when backend is ready
  };

  // Handle Google login button click
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // TODO: Add Google OAuth logic here when backend is ready
  };

  // Handle "Forgot Password" link click
  const handleForgotPassword = () => {
    console.log('Forgot Password clicked');
    // TODO: Add forgot password flow here
  };

  // Handle "Create an account" link click
  const handleCreateAccount = () => {
    console.log('Create account clicked');
    // TODO: Navigate to sign up page when routing is set up
  };

  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      {/* Main login card */}
      <div className="login-card">
        {/* Header section with title */}
        <div className="header">
          <h1 className="main-title">Nepal Sanctuary</h1>
          <p className="main-subtitle">Your journey to the peaks begins here.</p>
        </div>

        {/* Login form section */}
        <form className="login-form" onSubmit={handleLogin}>
          {/* Form title */}
          <h2 className="form-title">Welcome Back</h2>
          <p className="form-subtitle">Please enter your details to access your sanctuary.</p>

          {/* Email input field */}
          <div className="form-group">
            <label htmlFor="email" className="label">EMAIL ADDRESS</label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="namaste@nepalsanctuary.com"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          {/* Password input field */}
          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password" className="label">PASSWORD</label>
              {/* Forgot password link */}
              <button 
                type="button"
                className="forgot-password" 
                onClick={handleForgotPassword}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                Forgot Password?
              </button>
            </div>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={togglePasswordVisibility}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "👁️"}
              </button>
            </div>
          </div>

          {/* Login button */}
          <button type="submit" className="login-button">
            Login to Account →
          </button>
        </form>

        {/* Divider with text */}
        <div className="divider">
          <p className="divider-text">OR CONTINUE WITH</p>
        </div>

        {/* Google login button */}
        <button className="google-button" onClick={handleGoogleLogin}>
          <svg className="google-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>

        {/* Sign up link section */}
        <div className="signup-section">
          <p className="signup-text">
            New to the sanctuary?{' '}
            <button 
              type="button"
              className="signup-link"
              onClick={handleCreateAccount}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>

      {/* Footer section */}
      <footer className="footer">
        <button 
          type="button"
          className="footer-link"
          onClick={() => console.log('Privacy clicked')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}
        >
          PRIVACY
        </button>
        <button 
          type="button"
          className="footer-link"
          onClick={() => console.log('Terms clicked')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}
        >
          TERMS
        </button>
        <button 
          type="button"
          className="footer-link"
          onClick={() => console.log('Contact clicked')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}
        >
          CONTACT
        </button>
        <p className="footer-credit">CRAFTED FOR THE HIMALAYAS</p>
      </footer>
    </div>
  );
};

export default LoginPage;
