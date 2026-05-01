import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dashboardService from './services/dashboardService';
import { 
  LayoutDashboard, 
  CreditCard, 
  LineChart, 
  Settings, 
  Search, 
  Bell, 
  HelpCircle, 
  Plus, 
  Download,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Clock,
  Briefcase,
  Loader2
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSubscriptions: 0,
    totalMonthlySpend: 0,
    potentialWaste: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getDashboardData();
      setStats(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>SubOptima</h2>
          <p>AI Optimizer</p>
        </div>
        
        <nav className="nav-menu">
          <Link to="/dashboard" className="nav-item active">
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
          <Link to="/settings" className="nav-item">
            <Settings size={18} />
            Settings
          </Link>
          <button 
            className="nav-item" 
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              width: '100%', 
              textAlign: 'left', 
              cursor: 'pointer',
              marginTop: 'auto',
              color: '#ef4444'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Logout
            </div>
          </button>
        </nav>

        <button className="optimize-btn">
          <Zap size={16} fill="white" />
          Optimize Now
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <div className="search-bar">
            <Search size={16} color="#94a3b8" />
            <input type="text" placeholder="Search subscriptions..." />
          </div>
          
          <div className="header-right">
            <div className="header-icons">
              <Bell size={18} />
              <HelpCircle size={18} />
              <Settings size={18} />
            </div>
            <div className="user-profile">
              <div className="avatar">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-actions">
          <div className="welcome-msg">
            <h1>Analytics Overview</h1>
            <p>Real-time insights into your organization's SaaS health.</p>
          </div>
          <button className="insights-btn" onClick={fetchDashboardData}>
            <Zap size={16} fill="white" />
            Refresh Stats
          </button>
        </div>

        {error && (
          <div style={{ margin: '0 2rem 1.5rem', padding: '1rem', background: '#fee2e2', color: '#dc2626', borderRadius: '0.75rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        {/* Stats Row */}
        <div className="summary-row">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Monthly Spend</span>
              <div className="stat-icon"><CreditCard size={16} /></div>
            </div>
            {loading ? <Loader2 className="animate-spin" size={20} color="#94a3b8" /> : (
              <div className="stat-value">${stats.totalMonthlySpend.toLocaleString()}</div>
            )}
            <div className="stat-trend down">
              <TrendingDown size={14} />
              Calculated monthly burn
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Active Subscriptions</span>
              <div className="stat-icon"><Clock size={16} /></div>
            </div>
            {loading ? <Loader2 className="animate-spin" size={20} color="#94a3b8" /> : (
              <div className="stat-value">{stats.totalSubscriptions}</div>
            )}
            <div className="stat-trend up">
              Tracking all services
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Waste Detected</span>
              <div className="stat-icon"><AlertCircle size={16} /></div>
            </div>
            {loading ? <Loader2 className="animate-spin" size={20} color="#94a3b8" /> : (
              <div className="stat-value">${stats.potentialWaste.toLocaleString()}</div>
            )}
            <div className="stat-trend down" style={{color: stats.potentialWaste > 0 ? '#ef4444' : '#10b981'}}>
              {stats.potentialWaste > 0 ? 'Action Required' : 'Optimal Efficiency'}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Optimization Score</span>
              <div className="stat-icon"><TrendingUp size={16} /></div>
            </div>
            <div className="stat-value">84%</div>
            <div className="progress-container" style={{height: '8px', background: '#e2e8f0'}}>
              <div className="progress-bar" style={{width: '84%', background: '#10b981'}}></div>
            </div>
          </div>
        </div>

        {/* Charts & Actions Grid */}
        <div className="content-grid">
          <div className="section-card">
            <div className="section-title">
              Spending Trend (Last 6 Months)
              <div style={{display: 'flex', gap: '1rem', fontSize: '0.8rem'}}>
                <span style={{fontWeight: 700}}>Month</span>
                <span style={{color: '#94a3b8'}}>Quarter</span>
              </div>
            </div>
            <div style={{height: '300px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 1rem'}}>
               {/* Mock Chart Bars */}
               {[40, 60, 45, 80, 55, 70].map((h, i) => (
                 <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
                    <div style={{width: '40px', height: `${h * 2}px`, background: i === 3 ? '#5c4df3' : '#eef2ff', borderRadius: '8px 8px 0 0'}}></div>
                    <span style={{fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600}}>
                      {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'][i]}
                    </span>
                 </div>
               ))}
            </div>
          </div>

          <div className="section-card">
            <div className="section-title">
              Action Required
              <span style={{fontSize: '0.7rem', background: '#fee2e2', color: '#ef4444', padding: '2px 8px', borderRadius: '4px'}}>ALERTS</span>
            </div>
            
            {stats.potentialWaste > 0 ? (
              <div className="alert-item">
                <div className="alt-icon-bg">
                  <AlertCircle size={20} />
                </div>
                <div className="alert-content">
                  <h4>Underutilized Services</h4>
                  <p>We've detected services that haven't been used in 14+ days.</p>
                  <Link to="/subscriptions" className="alert-action">Review & Cancel</Link>
                </div>
                <div className="alert-meta">
                  <span style={{ color: '#ef4444' }}>-${stats.potentialWaste}</span>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                <TrendingUp size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>Great job! No waste detected in your current stack.</p>
              </div>
            )}

            <div className="quick-actions-section" style={{marginTop: '2rem'}}>
               <p style={{fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '1rem'}}>Quick Actions</p>
               <div className="quick-actions-row">
                 <Link to="/subscriptions/add" className="action-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Plus size={24} color="#94a3b8" />
                    <span>Add New</span>
                 </Link>
                 <div className="action-card">
                    <Download size={24} color="#94a3b8" />
                    <span>Export CSV</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
