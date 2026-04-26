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
  TrendingDown,
  AlertCircle,
  Clock,
  Briefcase
} from 'lucide-react';

const Dashboard = () => {
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
              <div className="user-info">
                <span className="name">Alex Morgan</span>
                <span className="role">Pro Member</span>
              </div>
              <div className="avatar">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-actions">
          <div className="welcome-msg">
            <h1>Welcome back, Alex</h1>
            <p>Here is what's happening with your subscriptions today.</p>
          </div>
          <button className="insights-btn">
            <Zap size={16} fill="white" />
            Generate AI Insights
          </button>
        </div>

        {/* Stats Row */}
        <div className="summary-row">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Monthly Spend</span>
              <div className="stat-icon"><CreditCard size={16} /></div>
            </div>
            <div className="stat-value">$1,240</div>
            <div className="stat-trend down">
              <TrendingDown size={14} />
              2.4% from last month
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Active Subscriptions</span>
              <div className="stat-icon"><Clock size={16} /></div>
            </div>
            <div className="stat-value">18</div>
            <div className="stat-trend up">
              + 2 new this week
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Waste Detected</span>
              <div className="stat-icon"><AlertCircle size={16} /></div>
            </div>
            <div className="stat-value">$320</div>
            <div className="stat-trend down" style={{color: '#ef4444'}}>
              High Priority Alert
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
              <span style={{fontSize: '0.7rem', background: '#fee2e2', color: '#ef4444', padding: '2px 8px', borderRadius: '4px'}}>2 ALERTS</span>
            </div>
            
            <div className="alert-item">
              <div className="alt-icon-bg">
                <Clock size={20} />
              </div>
              <div className="alert-content">
                <h4>3 Inactive Subscriptions</h4>
                <p>Slack, Loom, and Framer haven't been used in 30+ days.</p>
                <a href="#" className="alert-action">Manage Now</a>
              </div>
              <div className="alert-meta">
                <span>-$84.00</span>
              </div>
            </div>

            <div className="alert-item">
              <div className="alt-icon-bg blue">
                <Briefcase size={20} />
              </div>
              <div className="alert-content">
                <h4>New Waste Found</h4>
                <p>Duplicate licenses detected for Adobe Creative Cloud.</p>
                <a href="#" className="alert-action">Resolve</a>
              </div>
              <div className="alert-meta">
                <span>-$236.00</span>
              </div>
            </div>

            <div className="quick-actions-section" style={{marginTop: '2rem'}}>
               <p style={{fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '1rem'}}>Quick Actions</p>
               <div className="quick-actions-row">
                 <div className="action-card">
                    <Plus size={24} color="#94a3b8" />
                    <span>Add New</span>
                 </div>
                 <div className="action-card">
                    <Download size={24} color="#94a3b8" />
                    <span>Export CSV</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="section-card">
            <div className="section-title">Spending by Category</div>
            <div className="category-content">
               <div className="chart-square">
                 <div className="chart-inner-text">
                    <div style={{fontSize: '0.9rem', fontWeight: 700}}>$1,240</div>
                 </div>
               </div>
               <div className="legend-list">
                 <div className="legend-item">
                    <div className="legend-label">
                      <div className="dot" style={{background: '#5c4df3'}}></div>
                      SaaS
                    </div>
                    <span style={{fontWeight: 700}}>60%</span>
                 </div>
                 <div className="legend-item">
                    <div className="legend-label">
                      <div className="dot" style={{background: '#3b82f6'}}></div>
                      Infrastructure
                    </div>
                    <span style={{fontWeight: 700}}>25%</span>
                 </div>
                 <div className="legend-item">
                    <div className="legend-label">
                      <div className="dot" style={{background: '#10b981'}}></div>
                      Marketing
                    </div>
                    <span style={{fontWeight: 700}}>15%</span>
                 </div>
               </div>
            </div>
          </div>

          <div className="upgrade-card">
            <h3>Upgrade to Enterprise</h3>
            <p>Unlock advanced multi-team optimization and automated seat management.</p>
            <button className="view-plans-btn">View Plans</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
