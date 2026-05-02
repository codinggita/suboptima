import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import api from './api';
import { 
  User,
  Mail, 
  Lock, 
  ArrowRight, 
  TrendingDown, 
  ShieldCheck,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import './index.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password
      });

      console.log('Registration Success:', response.data);

      if (response.data && response.data.token) {
        // Automatically log the user in
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      } else {
        // Fallback: redirect to login if no token returned
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Helmet>
        <title>Create an Account | SubOptima</title>
        <meta name="description" content="Join SubOptima today. Sign up to get AI-powered insights into your organization's SaaS stack, track software spending, and stop paying for unused subscriptions." />
      </Helmet>
      {/* Left Panel */}
      <section className="left-panel">
        <div className="left-content">
          <div className="logo">SubOptima</div>
          <h1 className="headline">
            Start your optimization journey
          </h1>
          <p className="subheadline">
            Join 500+ companies saving an average of 25% on their SaaS stack. 
            Set up your account in less than 2 minutes.
          </p>

          <div className="savings-card">
            <div className="card-header">
              <div className="icon-bg">
                <CheckCircle2 size={24} color="white" />
              </div>
              <div className="card-text">
                <span className="card-label">TRUSTED BY</span>
                <span className="card-value">Enterprise Teams</span>
              </div>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Panel */}
      <section className="right-panel">
        <div className="login-form-container">
          <div className="welcome-section">
            <h2 className="welcome-title">Create your account</h2>
            <p className="welcome-subtitle">Get started with SubOptima today</p>
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

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={16} />
                <input 
                  type="text" 
                  id="name" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={onChange}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Work Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={16} />
                <input 
                  type="email" 
                  id="email" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={onChange}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={16} />
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Create a password"
                  value={password}
                  onChange={onChange}
                  minLength={6}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={16} />
                <input 
                  type="password" 
                  id="confirmPassword" 
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={onChange}
                  required 
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'} <ArrowRight size={16} />
            </button>
          </form>

          <p className="signup-text">
            Already have an account? <Link to="/" className="signup-link">Sign in instead</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;
