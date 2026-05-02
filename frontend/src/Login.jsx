import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import api from './api';
import { 
  Mail, 
  Lock, 
  Eye, 
  ArrowRight, 
  TrendingDown, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import './index.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Helmet>
        <title>Login | SubOptima</title>
        <meta name="description" content="Sign in to your SubOptima account to manage your SaaS stack, optimize software spend, and automate your subscriptions." />
      </Helmet>
      {/* Left Panel */}
      <section className="left-panel">
        <div className="left-content">
          <div className="logo">SubOptima</div>
          <h1 className="headline">
            Optimize your SaaS spend with AI
          </h1>
          <p className="subheadline">
            Gain full visibility into your organization's software landscape. 
            Reduce waste, automate renewals, and scale with confidence.
          </p>

          <div className="savings-card">
            <div className="card-header">
              <div className="icon-bg">
                <TrendingDown size={24} color="white" />
              </div>
              <div className="card-text">
                <span className="card-label">AVERAGE SAVINGS</span>
                <span className="card-value">24.8% annually</span>
              </div>
            </div>
            <div className="progress-container">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Panel */}
      <section className="right-panel">
        <div className="login-form-container">
          <div className="welcome-section">
            <h2 className="welcome-title">Welcome back</h2>
            <p className="welcome-subtitle">Enter your credentials to access your dashboard</p>
          </div>

          {error && (
            <div className="error-banner" style={{
              background: '#fee2e2',
              color: '#dc2626',
              padding: '0.75rem',
              borderRadius: '0.75rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              border: '1px solid #fecaca'
            }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="social-buttons">
            <button className="social-btn" type="button">
              <img 
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" 
                alt="Google" 
                style={{ width: '18px', height: '18px' }}
              />
              Google
            </button>
            <button className="social-btn" type="button">
              <ShieldCheck size={16} />
              SSO
            </button>
          </div>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label htmlFor="email">Work Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={16} />
                <input 
                  type="email" 
                  id="email" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              <div className="input-wrapper">
                <Lock className="input-icon" size={16} />
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <Eye className="eye-icon" size={16} />
              </div>
            </div>

            <label className="remember-me">
              <input type="checkbox" />
              Remember me for 30 days
            </label>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in to Dashboard'} <ArrowRight size={16} />
            </button>
          </form>

          <p className="signup-text">
            Don't have an account? <Link to="/register" className="signup-link">Start 14-day free trial</Link>
          </p>

          <footer className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Support</a>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default Login;
