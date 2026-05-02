import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  LineChart, 
  Settings as SettingsIcon, 
  Search, 
  Bell, 
  HelpCircle,
  Zap,
  User,
  Palette,
  Shield,
  LogOut,
  Mail,
  Briefcase,
  Building,
  CheckCircle,
  MessageSquare,
  Edit2
} from 'lucide-react';

import api from './api';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Profile');
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Product Manager', organization: 'SubOptima Core' });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Preferences
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [autoOptimize, setAutoOptimize] = useState(localStorage.getItem('autoOptimize') === 'true');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(prev => ({ ...prev, name: parsedUser.name || '', email: parsedUser.email || '' }));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      setSaveMessage('');
      const response = await api.put('/auth/profile', { name: formData.name, email: formData.email });
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setSaveMessage('Profile saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setSaveMessage('Failed to save profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleAutoOptimize = () => {
    const newVal = !autoOptimize;
    setAutoOptimize(newVal);
    localStorage.setItem('autoOptimize', newVal);
  };
  return (
    <div className="dashboard-container">
      <Helmet>
        <title>Account Settings | SubOptima</title>
        <meta name="description" content="Manage your SubOptima account preferences, update your profile, configure billing details, and adjust your theme settings." />
      </Helmet>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon-container">
            <Zap size={20} fill="white" color="white" />
          </div>
          <div className="logo-text">
            <h2>SubOptima</h2>
            <p>AI Optimizer</p>
          </div>
        </div>
        
        <nav className="nav-menu">
          <Link to="/dashboard" className="nav-item">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link to="/subscriptions" className="nav-item">
            <CreditCard size={18} />
            Subscriptions
          </Link>
          <Link to="/insights" className="nav-item">
            <LineChart size={18} />
            Insights
          </Link>
          <Link to="/settings" className="nav-item active">
            <SettingsIcon size={18} />
            Settings
          </Link>
          <button 
            className="nav-item" 
            onClick={handleLogout}
            style={{ 
              background: 'none', 
              border: 'none', 
              width: '100%', 
              textAlign: 'left', 
              cursor: 'pointer',
              marginTop: 'auto',
              color: '#ef4444',
              padding: '0.75rem 1rem',
              fontSize: '0.9rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Logout
            </div>
          </button>
        </nav>

        <button className="optimize-btn">
          Optimize Now
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <div className="search-bar">
            <Search size={16} color="#94a3b8" />
            <input type="text" placeholder="Search settings..." />
          </div>
          
          <div className="header-right">
            <div className="header-icons">
              <Link to="/settings" className="header-icon-btn"><Bell size={18} /></Link>
              <Link to="/settings" className="header-icon-btn"><HelpCircle size={18} /></Link>
              <Link to="/settings" className="header-icon-btn"><SettingsIcon size={18} /></Link>
            </div>
            <div className="user-profile">
              <div className="avatar-initial">
                {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>

        <div className="settings-page-content">
          <div className="settings-header">
            <h1>Settings</h1>
            <p>Manage your account preferences, billing, and security settings.</p>
          </div>

          <div className="settings-tabs">
            {['Profile', 'Billing', 'Preferences', 'Security'].map(tab => (
              <button 
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="settings-layout">
            <div className="settings-main-column">
              {activeTab === 'Profile' && (
                <section className="settings-section">
                  <div className="section-title-row">
                    <User size={20} color="#5c4df3" />
                    <h2>Profile Section</h2>
                  </div>
                  
                  <div className="profile-edit-grid">
                    <div className="avatar-edit">
                      <div className="avatar-initial" style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
                        {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    </div>
                    
                    <div className="profile-form">
                      <div className="form-grid">
                        <div className="field-group">
                          <label>Full Name</label>
                          <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your Name" />
                        </div>
                        <div className="field-group">
                          <label>Email Address</label>
                          <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="your@email.com" />
                        </div>
                        <div className="field-group">
                          <label>Role</label>
                          <input type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                        </div>
                        <div className="field-group">
                          <label>Organization</label>
                          <input type="text" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} />
                        </div>
                      </div>
                      <div className="form-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {saveMessage && <span style={{ color: saveMessage.includes('Failed') ? '#ef4444' : '#10b981', fontSize: '0.85rem' }}>{saveMessage}</span>}
                        <button className="save-btn" onClick={handleSaveProfile} disabled={isSaving}>
                          {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {activeTab === 'Preferences' && (
                <section className="settings-section">
                  <div className="section-title-row">
                    <Palette size={20} color="#5c4df3" />
                    <h2>Preference Section</h2>
                  </div>
                  
                  <div className="preferences-list">
                    <div className="preference-item">
                      <div className="pref-info">
                        <h3>Theme Settings</h3>
                        <p>Current theme: {theme === 'light' ? 'Light Mode' : 'Dark Mode'}</p>
                      </div>
                      <div className={`toggle-switch ${theme === 'dark' ? 'active' : ''}`} onClick={toggleTheme}>
                        <div className="toggle-knob"></div>
                      </div>
                    </div>
                    
                    <div className="preference-item">
                      <div className="pref-info">
                        <h3>Auto-Optimization</h3>
                        <p>Allow AI to automatically suggest daily improvements</p>
                      </div>
                      <div className={`toggle-switch ${autoOptimize ? 'active' : ''}`} onClick={toggleAutoOptimize}>
                        <div className="toggle-knob"></div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {(activeTab === 'Billing' || activeTab === 'Security') && (
                <section className="settings-section" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                  <Shield size={48} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
                  <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{activeTab} Settings</h2>
                  <p style={{ color: 'var(--text-muted)' }}>These features are currently in development.</p>
                </section>
              )}
            </div>

            <div className="settings-sidebar-column">
              {/* Account Status */}
              <div className="account-status-card">
                <h3>Account Status</h3>
                <div className="plan-badge">
                  <div className="dot"></div>
                  PRO PLAN ACTIVE
                </div>
                <div className="status-stats">
                  <div className="stat-line">
                    <span>Next Renewal:</span>
                    <strong>Oct 12, 2024</strong>
                  </div>
                  <div className="stat-line">
                    <span>Credits Left:</span>
                    <strong>1,240 / 5,000</strong>
                  </div>
                </div>
                <button className="manage-billing-btn" onClick={() => setActiveTab('Billing')}>Manage Billing Details</button>
              </div>

              {/* Logout Section */}
              <div className="logout-card">
                <h3 className="danger-text">Logout section</h3>
                <p>Are you sure you want to end your current session?</p>
                <button className="logout-btn" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>

              {/* Support Card */}
              <div className="support-card-banner">
                <div className="support-content">
                   <span className="support-label">ENTERPRISE SUPPORT</span>
                   <h4>Need help with setup?</h4>
                   <p>Schedule a 1-on-1 call with our experts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem !important;
        }

        .logo-icon-container {
          width: 40px;
          height: 40px;
          background: #5c4df3;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(92, 77, 243, 0.3);
        }

        .sidebar-logo h2 {
          font-size: 1.1rem !important;
          margin-bottom: 0 !important;
          line-height: 1.2;
          color: #5c4df3 !important;
        }

        .sidebar-logo p {
          font-size: 0.6rem !important;
          margin-bottom: 0 !important;
          opacity: 0.7;
          color: #64748b !important;
        }

        .settings-page-content {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .settings-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }

        .settings-header p {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }

        .settings-tabs {
          display: flex;
          gap: 2rem;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 2rem;
        }

        .tab {
          padding: 0.75rem 0.5rem;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          font-weight: 500;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab.active {
          color: #5c4df3;
          border-bottom-color: #5c4df3;
        }

        .settings-layout {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 2rem;
        }

        .settings-section {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .section-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .section-title-row h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .profile-edit-grid {
          display: flex;
          gap: 2.5rem;
        }

        .avatar-large {
          position: relative;
          width: 100px;
          height: 100px;
        }

        .avatar-large img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 4px solid #f0f4ff;
        }

        .edit-overlay {
          position: absolute;
          bottom: 0;
          right: 0;
          background: #5c4df3;
          border: 2px solid white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .profile-form {
          flex-grow: 1;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .field-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .field-group input {
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--input-bg);
          font-size: 0.9rem;
          color: var(--text-main);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
        }

        .save-btn {
          background: #3b2bc4;
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .preferences-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .preference-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem;
          background: var(--input-bg);
          border-radius: 12px;
          border: 1px solid var(--border);
        }

        .pref-info h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 0.25rem;
        }

        .pref-info p {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .toggle-switch {
          width: 44px;
          height: 24px;
          background: #cbd5e1;
          border-radius: 12px;
          padding: 2px;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
        }

        .toggle-switch.active {
          background: #5c4df3;
        }

        .toggle-knob {
          width: 20px;
          height: 20px;
          background: #ffffff;
          border-radius: 50%;
          transition: transform 0.2s;
        }

        .toggle-switch.active .toggle-knob {
          transform: translateX(20px);
        }

        .account-status-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .account-status-card h3 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .plan-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #10b981;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .plan-badge .dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
        }

        .status-stats {
          margin-bottom: 1.5rem;
        }

        .stat-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
        }

        .stat-line span { color: var(--text-muted); }
        .stat-line strong { color: var(--text-main); }

        .manage-billing-btn {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #5c4df3;
          background: transparent;
          color: #5c4df3;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .logout-card {
          background: var(--input-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .danger-text { color: #dc2626; margin-bottom: 0.5rem; }
        .logout-card p { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; }

        .logout-btn {
          width: 100%;
          padding: 0.75rem;
          background: #bc1c1c;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .support-card-banner {
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80');
          background-size: cover;
          border-radius: 16px;
          padding: 2rem;
          color: white;
          min-height: 180px;
          display: flex;
          align-items: center;
        }

        .support-label {
          font-size: 0.65rem;
          font-weight: 800;
          opacity: 0.8;
          letter-spacing: 0.05em;
        }

        .support-content h4 {
          font-size: 1.1rem;
          margin: 0.5rem 0;
        }

        .support-content p {
          font-size: 0.8rem;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default Settings;
