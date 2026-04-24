import React from 'react';
import { Link } from 'react-router-dom';
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
  MoreVertical,
  Filter,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Hash,
  Cloud,
  Code2,
  Users
} from 'lucide-react';

const Subscriptions = () => {
  const subs = [
    {
      name: 'Slack Enterprise', detail: '24 Licenses', cat: 'Communication',
      cost: '$480.00', costDetail: 'Fixed rate', costBadge: null,
      used: 'Today, 10:45 AM', usedRed: false,
      renewal: 'Oct 12, 2024', status: 'Healthy',
      iconBg: '#4a154b', icon: <Hash size={14} color="white" strokeWidth={2.5} />
    },
    {
      name: 'Figma Professional', detail: '12 Licenses', cat: 'Design',
      cost: '$180.00', costDetail: 'Standard Plan', costBadge: null,
      used: 'Warning: 15d ago', usedRed: true,
      renewal: 'Oct 05, 2024', status: 'Warning',
      iconBg: '#f24e1e', icon: (
        <svg width="14" height="14" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5A9.5 9.5 0 1128.5 19H19v9.5z" fill="#1abcfe"/>
          <path d="M9.5 47.5A9.5 9.5 0 019.5 28.5H19v9.5a9.5 9.5 0 01-9.5 9.5z" fill="#0acf83"/>
          <path d="M9.5 28.5A9.5 9.5 0 019.5 9.5H19V28.5H9.5z" fill="#ff7262"/>
          <path d="M19 9.5H28.5A9.5 9.5 0 0119 19V9.5z" fill="#f24e1e"/>
          <path d="M28.5 28.5A9.5 9.5 0 1119 19h9.5v9.5z" fill="#a259ff"/>
        </svg>
      )
    },
    {
      name: 'AWS Cloud Services', detail: 'Usage-based', cat: 'Infrastructure',
      cost: '$1,240.50', costDetail: null, costBadge: '+15% surge',
      used: 'Continuous', usedRed: false,
      renewal: 'Sep 30, 2024', status: 'Healthy',
      iconBg: '#232f3e', icon: <Cloud size={14} color="#ff9900" strokeWidth={2} />
    },
    {
      name: 'Adobe Creative Cloud', detail: '3 Licenses', cat: 'Design',
      cost: '$158.00', costDetail: 'Team Plan', costBadge: null,
      used: '90d+ inactive', usedRed: true,
      renewal: 'Nov 18, 2024', status: 'Waste',
      iconBg: '#fa0f00', icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM.828 22.624L7.96 5.752l4.122 9.768-3.13 7.104zM21.716 22.624H17.34L13.057 12.6l1.977-4.643 6.682 14.667z"/>
        </svg>
      )
    },
    {
      name: 'GitHub Copilot', detail: '50 Seats', cat: 'Development',
      cost: '$950.00', costDetail: 'Enterprise', costBadge: null,
      used: 'Today, 08:12 AM', usedRed: false,
      renewal: 'Oct 24, 2024', status: 'Healthy',
      iconBg: '#24292f', icon: <Code2 size={14} color="white" strokeWidth={2} />
    },
  ];

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
              <div className="user-info">
                <span className="name">Alex Rivera</span>
                <span className="role">Admin Access</span>
              </div>
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
            <p style={{fontSize: '0.85rem'}}>Manage, monitor and optimize 24 active service licenses.</p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">
              <Download size={14} />
              Export CSV
            </button>
            <button className="btn-primary">
              <Plus size={14} />
              Add Subscription
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="summary-row" style={{marginBottom: '1.5rem', gap: '1rem'}}>
          <div className="stat-card" style={{padding: '1.25rem', gap: '0.5rem'}}>
            <span className="stat-label" style={{fontSize: '0.7rem'}}>MONTHLY BURN</span>
            <div style={{display: 'flex', alignItems: 'baseline', gap: '0.5rem'}}>
              <span className="stat-value" style={{fontSize: '1.25rem'}}>$2,840.00</span>
              <span style={{fontSize: '0.75rem', fontWeight: 700, color: '#ef4444'}}>↑12%</span>
            </div>
          </div>

          <div className="stat-card" style={{padding: '1.25rem', gap: '0.5rem'}}>
            <span className="stat-label" style={{fontSize: '0.7rem'}}>ACTIVE SEATS</span>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <span className="stat-value" style={{fontSize: '1.25rem'}}>142</span>
              <Users size={14} color="var(--primary)" />
            </div>
          </div>

          <div className="stat-card" style={{padding: '1.25rem', gap: '0.5rem'}}>
            <span className="stat-label" style={{fontSize: '0.7rem'}}>POTENTIAL SAVINGS</span>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <span className="stat-value" style={{fontSize: '1.25rem', color: '#5c4df3'}}>$420.50</span>
              <span style={{background: '#e0f2fe', color: '#0284c7', fontSize: '0.6rem', fontWeight: 800, padding: '2px 5px', borderRadius: '3px'}}>OPTIMIZABLE</span>
            </div>
          </div>

          <div className="stat-card" style={{padding: '1.25rem', gap: '0.5rem', borderLeft: '4px solid #3b82f6'}}>
            <span className="stat-label" style={{fontSize: '0.7rem'}}>RENEWAL ALERTS</span>
            <div style={{display: 'flex', alignItems: 'baseline', gap: '0.35rem'}}>
              <span className="stat-value" style={{fontSize: '1.25rem'}}>3</span>
              <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>next 7 days</span>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-container">
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
              <span className="filter-info">Showing 1-10 of 24</span>
            </div>
          </div>

          <table className="sub-table">
            <thead>
              <tr>
                <th style={{padding: '0.75rem 1.5rem'}}>SERVICE NAME</th>
                <th style={{padding: '0.75rem 1.5rem'}}>CATEGORY</th>
                <th style={{padding: '0.75rem 1.5rem'}}>COST/MONTH</th>
                <th style={{padding: '0.75rem 1.5rem'}}>LAST USED</th>
                <th style={{padding: '0.75rem 1.5rem'}}>RENEWAL DATE</th>
                <th style={{padding: '0.75rem 1.5rem'}}>STATUS</th>
                <th style={{padding: '0.75rem 1.5rem'}}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((sub, i) => (
                <tr key={i}>
                  <td style={{padding: '1rem 1.5rem'}}>
                    <div className="service-cell">
                      <div className="service-icon-bg" style={{background: sub.iconBg, width: '36px', height: '36px', borderRadius: '8px'}}>
                        {sub.icon}
                      </div>
                      <div className="service-info">
                        <h4 style={{fontSize: '0.875rem'}}>{sub.name}</h4>
                        <span style={{fontSize: '0.72rem'}}>{sub.detail}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{padding: '1rem 1.5rem'}}>
                    <span className="category-tag" style={{fontSize: '0.75rem'}}>{sub.cat}</span>
                  </td>
                  <td style={{padding: '1rem 1.5rem'}}>
                    <div className="cost-info">
                      <span className="cost-amount" style={{fontSize: '0.875rem'}}>{sub.cost}</span>
                      {sub.costDetail && <span className="cost-type">{sub.costDetail}</span>}
                      {sub.costBadge && <span className="cost-badge">{sub.costBadge}</span>}
                    </div>
                  </td>
                  <td style={{padding: '1rem 1.5rem'}}>
                    <span style={{fontSize: '0.8rem', color: sub.usedRed ? '#ef4444' : 'var(--text-main)', fontWeight: 500}}>
                      {sub.used}
                    </span>
                  </td>
                  <td style={{padding: '1rem 1.5rem'}}>
                    <span style={{fontSize: '0.8rem', fontWeight: 500}}>{sub.renewal}</span>
                  </td>
                  <td style={{padding: '1rem 1.5rem'}}>
                    <span className={`status-badge ${sub.status.toLowerCase()}`} style={{fontSize: '0.75rem'}}>
                      <div className="status-dot"></div>
                      {sub.status}
                    </span>
                  </td>
                  <td style={{padding: '1rem 1.5rem'}}>
                    <MoreVertical size={15} color="#94a3b8" style={{cursor: 'pointer'}} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination" style={{padding: '1rem 1.5rem'}}>
            <a href="#" className="page-link" style={{opacity: 0.4, fontSize: '0.8rem'}}>
              <ChevronLeft size={14} />
              Previous
            </a>
            <div className="page-numbers">
              <span className="page-num active">1</span>
              <span className="page-num">2</span>
              <span className="page-num">3</span>
              <span style={{color: '#94a3b8', display: 'flex', alignItems: 'center', fontSize: '0.85rem'}}>...</span>
              <span className="page-num">12</span>
            </div>
            <a href="#" className="page-link" style={{color: 'var(--text-main)', fontSize: '0.8rem'}}>
              Next
              <ChevronRight size={14} />
            </a>
          </div>
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
    </div>
  );
};

export default Subscriptions;
