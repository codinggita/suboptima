import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import subscriptionService from './services/subscriptionService';
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
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Hash,
  Cloud,
  Code2,
  Users,
  Trash2,
  Loader2,
  AlertTriangle
} from 'lucide-react';

const Subscriptions = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await subscriptionService.getSubscriptions();
      setSubs(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
      setError('Failed to load subscriptions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        await subscriptionService.deleteSubscription(id);
        // Optimistically update UI
        setSubs(subs.filter(sub => sub._id !== id));
      } catch (err) {
        console.error('Error deleting subscription:', err);
        alert('Failed to delete subscription.');
      }
    }
  };

  const getStatusClass = (status) => {
    return status?.toLowerCase() || 'healthy';
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
          <Link to="/dashboard" className="nav-item">
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          <Link to="/subscriptions" className="nav-item active">
            <CreditCard size={16} />
            Subscriptions
          </Link>
          <Link to="/insights" className="nav-item">
            <LineChart size={16} />
            Insights
          </Link>
          <Link to="/settings" className="nav-item">
            <Settings size={16} />
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
              color: '#ef4444',
              padding: '0.75rem 1rem',
              fontSize: '0.9rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Logout
            </div>
          </button>
        </nav>

        <button className="optimize-btn">
          <Zap size={14} fill="white" />
          Optimize Now
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{padding: '1.5rem 2.5rem'}}>
        <header className="dashboard-header" style={{marginBottom: '1.5rem'}}>
          <div className="sub-search-bar">
            <Search size={14} color="#94a3b8" />
            <input type="text" placeholder="Search across all services..." />
          </div>
          
          <div className="header-right">
            <div className="header-icons" style={{gap: '0.75rem'}}>
              <Bell size={16} />
              <HelpCircle size={16} />
              <Settings size={16} />
            </div>
            <div className="user-profile">
              <div className="avatar" style={{width: '34px', height: '34px'}}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rivera" alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        <div className="breadcrumb">
          <Link to="/dashboard" style={{color: 'var(--primary)', textDecoration: 'none'}}>Dashboard</Link>
          <span className="breadcrumb-sep">›</span>
          <span style={{color: 'var(--text-main)'}}>Subscriptions</span>
        </div>

        <div className="page-header">
          <div className="page-title-section">
            <h1 style={{fontSize: '1.6rem'}}>Your Subscriptions</h1>
            <p style={{fontSize: '0.85rem'}}>Manage, monitor and optimize {subs.length} active service licenses.</p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">
              <Download size={14} />
              Export CSV
            </button>
            <Link to="/subscriptions/add" className="btn-primary" style={{textDecoration: 'none'}}>
              <Plus size={14} />
              Add Subscription
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="summary-row" style={{marginBottom: '1.5rem', gap: '1rem'}}>
          <div className="stat-card" style={{padding: '1.25rem', gap: '0.5rem'}}>
            <span className="stat-label" style={{fontSize: '0.7rem'}}>MONTHLY BURN</span>
            <div style={{display: 'flex', alignItems: 'baseline', gap: '0.5rem'}}>
              <span className="stat-value" style={{fontSize: '1.25rem'}}>
                ${subs.reduce((acc, curr) => acc + (curr.cost || 0), 0).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="stat-card" style={{padding: '1.25rem', gap: '0.5rem'}}>
            <span className="stat-label" style={{fontSize: '0.7rem'}}>ACTIVE SERVICES</span>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <span className="stat-value" style={{fontSize: '1.25rem'}}>{subs.length}</span>
              <Users size={14} color="var(--primary)" />
            </div>
          </div>

          <div className="stat-card" style={{padding: '1.25rem', gap: '0.5rem'}}>
            <span className="stat-label" style={{fontSize: '0.7rem'}}>WASTE DETECTED</span>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <span className="stat-value" style={{fontSize: '1.25rem', color: '#ef4444'}}>
                ${subs.filter(s => s.status === 'Waste').reduce((acc, curr) => acc + (curr.cost || 0), 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-container">
          {error && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
              <AlertTriangle size={32} style={{ marginBottom: '1rem' }} />
              <p>{error}</p>
              <button onClick={fetchSubscriptions} style={{ marginTop: '1rem', color: 'var(--primary)', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }}>Try Again</button>
            </div>
          )}

          {loading ? (
            <div style={{ padding: '5rem', textAlign: 'center', color: '#94a3b8' }}>
              <Loader2 size={40} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
              <p>Loading your subscriptions...</p>
            </div>
          ) : subs.length === 0 ? (
            <div style={{ padding: '5rem', textAlign: 'center', color: '#94a3b8' }}>
              <div style={{ marginBottom: '1.5rem', opacity: 0.5 }}>
                <CreditCard size={64} style={{ margin: '0 auto' }} />
              </div>
              <h3>No subscriptions found</h3>
              <p style={{ marginBottom: '2rem' }}>You haven't added any subscriptions yet. Start by adding your first service.</p>
              <Link to="/subscriptions/add" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
                <Plus size={16} />
                Add Your First Subscription
              </Link>
            </div>
          ) : (
            <>
              <div className="table-controls" style={{padding: '1rem 1.5rem'}}>
                <div className="tabs">
                  <button className="tab-btn active">All</button>
                  <button className="tab-btn">Active</button>
                  <button className="tab-btn">Archived</button>
                </div>
                <div className="table-filters">
                  <button className="btn-secondary" style={{padding: '0.35rem 0.75rem', fontSize: '0.8rem'}}>
                    <Filter size={13} />
                    Filters
                  </button>
                  <span className="filter-info">Showing {subs.length} items</span>
                </div>
              </div>

              <table className="sub-table">
                <thead>
                  <tr>
                    <th style={{padding: '0.75rem 1.5rem'}}>SERVICE NAME</th>
                    <th style={{padding: '0.75rem 1.5rem'}}>CATEGORY</th>
                    <th style={{padding: '0.75rem 1.5rem'}}>COST/MONTH</th>
                    <th style={{padding: '0.75rem 1.5rem'}}>RENEWAL DATE</th>
                    <th style={{padding: '0.75rem 1.5rem'}}>STATUS</th>
                    <th style={{padding: '0.75rem 1.5rem'}}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {subs.map((sub) => (
                    <tr key={sub._id}>
                      <td style={{padding: '1rem 1.5rem'}}>
                        <div className="service-cell">
                          <div className="service-icon-bg" style={{background: '#f1f5f9', width: '36px', height: '36px', borderRadius: '8px', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Hash size={14} />
                          </div>
                          <div className="service-info">
                            <h4 style={{fontSize: '0.875rem'}}>{sub.name}</h4>
                            <span style={{fontSize: '0.72rem'}}>{sub.detail}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{padding: '1rem 1.5rem'}}>
                        <span className="category-tag" style={{fontSize: '0.75rem', textTransform: 'capitalize'}}>{sub.category}</span>
                      </td>
                      <td style={{padding: '1rem 1.5rem'}}>
                        <div className="cost-info">
                          <span className="cost-amount" style={{fontSize: '0.875rem'}}>${sub.cost?.toFixed(2)}</span>
                          {sub.costDetail && <span className="cost-type">{sub.costDetail}</span>}
                        </div>
                      </td>
                      <td style={{padding: '1rem 1.5rem'}}>
                        <span style={{fontSize: '0.8rem', fontWeight: 500}}>
                          {new Date(sub.renewalDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td style={{padding: '1rem 1.5rem'}}>
                        <span className={`status-badge ${getStatusClass(sub.status)}`} style={{fontSize: '0.75rem'}}>
                          <div className="status-dot"></div>
                          {sub.status}
                        </span>
                      </td>
                      <td style={{padding: '1rem 1.5rem'}}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => handleDelete(sub._id)} style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer' }} title="Delete">
                            <Trash2 size={16} />
                          </button>
                          <MoreVertical size={15} color="#94a3b8" style={{cursor: 'pointer'}} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        {/* Bottom Banner */}
        <div className="bottom-banner">
          <div className="banner-content">
            <h2 style={{fontSize: '1.4rem'}}>Automate Your Spend Tracking</h2>
            <p style={{fontSize: '0.9rem'}}>Connect your bank account to automatically sync subscriptions and get real-time savings insights.</p>
          </div>
          <button className="link-bank-btn">
            <Landmark size={16} />
            Link Bank Account
          </button>
        </div>

        <footer className="footer-bottom">
          <span className="copyright">© 2024 SubOptima AI. All rights reserved.</span>
          <div className="footer-links" style={{marginTop: 0}}>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Support</a>
          </div>
        </footer>
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

export default Subscriptions;
