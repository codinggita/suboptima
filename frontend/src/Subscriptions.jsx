import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
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
  Landmark,
  Hash,
  Users,
  Trash2,
  Loader2,
  AlertTriangle,
  Edit3,
  Check,
  X
} from 'lucide-react';

const Subscriptions = () => {
  const navigate = useNavigate();
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  
  // Advanced Features State
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchSubscriptions();

    // Close menu on click outside
    const handleClickOutside = () => setOpenMenuId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
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

  const handleExportCSV = () => {
    if (filteredSubs.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = ["Service Name", "Category", "Monthly Cost", "Renewal Date", "Status"];
    
    const rows = filteredSubs.map(sub => [
      `"${sub.name.replace(/"/g, '""')}"`,
      `"${sub.category}"`,
      sub.cost,
      new Date(sub.renewalDate).toLocaleDateString(),
      sub.status
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `subscriptions_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering Logic
  const filteredSubs = subs.filter(sub => {
    // Search filter
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sub.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Tab filter
    let matchesTab = true;
    if (activeTab === 'Active') matchesTab = sub.status !== 'Waste';
    if (activeTab === 'Archived') matchesTab = sub.status === 'Waste'; // Using Waste as proxy for Archived for now
    
    // Category filter
    const matchesCategory = selectedCategory === 'All' || sub.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesTab && matchesCategory;
  });

  const categories = ['All', ...new Set(subs.map(s => s.category))];

  return (
    <div className="dashboard-container">
      <Helmet>
        <title>All Subscriptions | SubOptima</title>
        <meta name="description" content="Manage all your software subscriptions in one place. View costs, categories, renewal dates, and status of your active and inactive SaaS tools." />
      </Helmet>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>SubOptima</h2>
          <p>AI Optimizer</p>
        </div>
        
        <nav className="nav-menu">
          <Link to="/dashboard" className="nav-item">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link to="/subscriptions" className="nav-item active">
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
              localStorage.removeItem('user');
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
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
            <input 
              type="text" 
              placeholder="Search across all services..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <X size={14} style={{cursor: 'pointer'}} onClick={() => setSearchTerm('')} />}
          </div>
          
          <div className="header-right">
            <div className="header-icons" style={{gap: '0.75rem'}}>
              <Link to="/settings" className="header-icon-btn"><Bell size={18} /></Link>
              <Link to="/settings" className="header-icon-btn"><HelpCircle size={18} /></Link>
              <Link to="/settings" className="header-icon-btn"><Settings size={18} /></Link>
            </div>
            <div className="user-profile">
              <div className="avatar-initial">
                {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
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
            <p style={{fontSize: '0.85rem'}}>Manage, monitor and optimize {filteredSubs.length} services.</p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary" onClick={handleExportCSV}>
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
                ${filteredSubs.reduce((acc, curr) => acc + (curr.cost || 0), 0).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="stat-card" style={{padding: '1.25rem', gap: '0.5rem'}}>
            <span className="stat-label" style={{fontSize: '0.7rem'}}>FILTERED COUNT</span>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <span className="stat-value" style={{fontSize: '1.25rem'}}>{filteredSubs.length}</span>
              <CreditCard size={14} color="var(--primary)" />
            </div>
          </div>

          <div className="stat-card" style={{padding: '1.25rem', gap: '0.5rem'}}>
            <span className="stat-label" style={{fontSize: '0.7rem'}}>POTENTIAL WASTE</span>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <span className="stat-value" style={{fontSize: '1.25rem', color: '#ef4444'}}>
                ${filteredSubs.filter(s => s.status.toLowerCase() === 'waste').reduce((acc, curr) => acc + (curr.cost || 0), 0).toFixed(2)}
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
            <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Loader2 size={40} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
              <p>Loading your subscriptions...</p>
            </div>
          ) : (
            <>
              <div className="table-controls" style={{padding: '1rem 1.5rem'}}>
                <div className="tabs">
                  {['All', 'Active', 'Archived'].map(tab => (
                    <button 
                      key={tab}
                      className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="table-filters">
                  <div style={{position: 'relative'}}>
                    <button 
                      className={`btn-secondary ${showFilters ? 'active-filter' : ''}`} 
                      style={{padding: '0.35rem 0.75rem', fontSize: '0.8rem'}}
                      onClick={(e) => { e.stopPropagation(); setShowFilters(!showFilters); }}
                    >
                      <Filter size={13} />
                      {selectedCategory !== 'All' ? selectedCategory : 'Filters'}
                    </button>
                    {showFilters && (
                      <div className="filter-dropdown">
                        <div className="filter-title">Category</div>
                        {categories.map(cat => (
                          <div 
                            key={cat} 
                            className={`filter-option ${selectedCategory === cat ? 'selected' : ''}`}
                            onClick={() => { setSelectedCategory(cat); setShowFilters(false); }}
                          >
                            {cat}
                            {selectedCategory === cat && <Check size={12} />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="filter-info">Showing {filteredSubs.length} items</span>
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
                  {filteredSubs.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{padding: '4rem', textAlign: 'center', color: 'var(--text-muted)'}}>
                        <Search size={32} style={{opacity: 0.2, marginBottom: '1rem'}} />
                        <p>No subscriptions found matching your criteria.</p>
                      </td>
                    </tr>
                  ) : filteredSubs.map((sub) => (
                    <tr key={sub._id}>
                      <td style={{padding: '1rem 1.5rem'}}>
                        <div className="service-cell">
                          <div className="service-icon-bg" style={{background: 'var(--input-bg)', width: '36px', height: '36px', borderRadius: '8px', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
                        <div style={{ position: 'relative' }}>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === sub._id ? null : sub._id); }} 
                            style={{ border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}
                          >
                            <MoreVertical size={16} />
                          </button>
                          
                          {openMenuId === sub._id && (
                            <div className="row-menu">
                              <button onClick={() => navigate(`/subscriptions/edit/${sub._id}`)}>
                                <Edit3 size={14} /> Edit
                              </button>
                              <button onClick={() => handleDelete(sub._id)} style={{ color: '#ef4444' }}>
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          )}
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

        .filter-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index: 50;
          min-width: 150px;
          padding: 0.5rem;
        }

        .filter-title {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          padding: 0.5rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .filter-option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          font-size: 0.8rem;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s;
          text-transform: capitalize;
        }

        .filter-option:hover {
          background: var(--input-bg);
        }

        .filter-option.selected {
          color: var(--primary);
          font-weight: 600;
        }

        .row-menu {
          position: absolute;
          right: 0;
          top: 100%;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          z-index: 40;
          width: 120px;
          overflow: hidden;
        }

        .row-menu button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem 1rem;
          border: none;
          background: none;
          font-size: 0.8rem;
          text-align: left;
          cursor: pointer;
          transition: background 0.2s;
        }

        .row-menu button:hover {
          background: var(--input-bg);
        }

        .active-filter {
          background: #eef2ff !important;
          border-color: var(--primary) !important;
          color: var(--primary) !important;
        }
      `}</style>
    </div>
  );
};

export default Subscriptions;
