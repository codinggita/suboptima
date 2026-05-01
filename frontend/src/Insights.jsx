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
  Zap,
  RefreshCw,
  Target,
  CheckCircle2,
  Cpu,
  Plus,
  Video,
  LayoutGrid,
  Activity
} from 'lucide-react';

const Insights = () => {
  const recommendations = [
    {
      id: 1,
      app: 'Figma (Design Team)',
      plan: 'Enterprise Workspace',
      savings: '-$45.00',
      reason: '"3 seats haven\'t logged in for 30 days. Action: Downgrade or Remove Seats"',
      icon: <div className="app-icon figma-bg"><LayoutGrid size={18} color="white" /></div>
    },
    {
      id: 2,
      app: 'Slack (Marketing)',
      plan: 'Business+ Plan',
      savings: '-$120.00',
      reason: '"Redundant channel archiving suggested. 12 external guests are no longer active in shared channels."',
      icon: <div className="app-icon slack-bg"><Activity size={18} color="white" /></div>
    },
    {
      id: 3,
      app: 'Zoom Video',
      plan: 'Pro Plan',
      savings: '-$250.00',
      reason: '"Duplicate billing detected. Individual pro licenses cost 15% more than the newly available Team Tier."',
      icon: <div className="app-icon zoom-bg"><Video size={18} color="white" /></div>
    }
  ];

  return (
    <div className="dashboard-container">
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
          <Link to="/insights" className="nav-item active">
            <LineChart size={18} />
            Insights
          </Link>
          <Link to="/settings" className="nav-item">
            <Settings size={18} />
            Settings
          </Link>
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
            <input type="text" placeholder="Search insights..." />
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

        <div className="insights-content">
          <div className="insights-header-row">
            <div className="title-section">
              <h1>AI Optimization Insights</h1>
              <p>Based on usage patterns from the last 30 days</p>
            </div>
            <button className="regenerate-btn">
              <RefreshCw size={16} />
              Regenerate Analysis
            </button>
          </div>

          <div className="insights-summary-grid">
            <div className="efficiency-card">
              <div className="card-badge">
                <Target size={12} />
                ESTIMATED EFFICIENCY
              </div>
              <div className="savings-main">
                <p>Potential Monthly Savings</p>
                <div className="amount">
                  <span className="currency">$</span>
                  <span className="value">415</span>
                  <span className="decimals">.00</span>
                </div>
              </div>
              <p className="card-footer-text">
                We identified 7 redundant licenses and 2 under-utilized enterprise tiers across your tech stack.
              </p>
            </div>

            <div className="status-card">
              <div className="status-header">
                <div className="status-icon-bg">
                  <Cpu size={24} color="#5c4df3" />
                </div>
                <div className="status-info">
                  <div className="status-label-row">
                    <h3>Analysis Status</h3>
                    <span className="live-badge">LIVE OPTIMIZATION</span>
                  </div>
                  <p>Our AI agent has successfully scanned 14 connected SaaS platforms. Efficiency score improved by <span className="highlight">12%</span> today.</p>
                </div>
              </div>
              <div className="progress-section">
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{width: '84%'}}></div>
                </div>
                <div className="progress-meta">
                  <span>SYSTEM SCAN: 84% COMPLETE</span>
                  <span>14/14 APPS CONNECTED</span>
                </div>
              </div>
            </div>
          </div>

          <div className="recommendations-section">
            <div className="section-header">
              <CheckCircle2 size={20} color="#5c4df3" />
              <h2>Actionable Recommendations</h2>
            </div>

            <div className="recommendations-grid">
              {recommendations.map((rec) => (
                <div key={rec.id} className="recommendation-card">
                  <div className="card-top">
                    <div className="app-info">
                      {rec.icon}
                      <div>
                        <h4>{rec.app}</h4>
                        <span>{rec.plan}</span>
                      </div>
                    </div>
                    <div className="savings-tag">
                      <span className="amount-val">{rec.savings}</span>
                      <span className="label">EST. SAVINGS</span>
                    </div>
                  </div>
                  <div className="reason-box">
                    <p>{rec.reason}</p>
                  </div>
                  <div className="card-actions">
                    <button className="btn-secondary">Review Details</button>
                    <button className="btn-outline">Cancel Subscription</button>
                  </div>
                </div>
              ))}

              <div className="scan-more-card">
                <div className="scan-icon-plus">
                  <Plus size={24} />
                </div>
                <h3>Scan More Apps</h3>
                <p>Connect your HRIS or ERP to uncover deeper license overlaps.</p>
                <button className="add-integration-btn">Add Integration</button>
                <div className="ai-monitor-badge">
                   <div className="pulse-dot"></div>
                   <span>AI is monitoring active sessions...</span>
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

        .insights-content {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .insights-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .title-section h1 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .title-section p {
          color: #64748b;
          font-size: 0.9rem;
        }

        .regenerate-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          color: #5c4df3;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .insights-summary-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .efficiency-card {
          background: linear-gradient(135deg, #5c4df3 0%, #3b2bc4 100%);
          border-radius: 16px;
          padding: 2rem;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 10px 25px -5px rgba(92, 77, 243, 0.3);
        }

        .card-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 700;
          width: fit-content;
          margin-bottom: 1.5rem;
        }

        .savings-main p {
          font-size: 0.95rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }

        .amount {
          display: flex;
          align-items: baseline;
        }

        .currency {
          font-size: 2rem;
          font-weight: 600;
        }

        .value {
          font-size: 4rem;
          font-weight: 700;
          line-height: 1;
        }

        .decimals {
          font-size: 1.5rem;
          opacity: 0.7;
        }

        .card-footer-text {
          margin-top: 2rem;
          font-size: 0.85rem;
          line-height: 1.5;
          opacity: 0.9;
        }

        .status-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .status-header {
          display: flex;
          gap: 1.5rem;
        }

        .status-icon-bg {
          width: 56px;
          height: 56px;
          background: #f0efff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .status-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          width: 100%;
        }

        .live-badge {
          font-size: 0.65rem;
          font-weight: 800;
          color: #10b981;
          background: #ecfdf5;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
        }

        .status-info {
          flex-grow: 1;
        }

        .status-info p {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.6;
        }

        .highlight {
          color: #10b981;
          font-weight: 700;
        }

        .progress-section {
          margin-top: 2rem;
        }

        .progress-bar-container {
          height: 8px;
          background: #f1f5f9;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }

        .progress-bar-fill {
          height: 100%;
          background: #5c4df3;
          border-radius: 4px;
        }

        .progress-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          font-weight: 700;
          color: #94a3b8;
        }

        .recommendations-section {
          margin-top: 3rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .section-header h2 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1e293b;
        }

        .recommendations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.5rem;
        }

        .recommendation-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .app-info {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .app-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .figma-bg { background: #1e1e1e; }
        .slack-bg { background: #4a154b; }
        .zoom-bg { background: #2d8cff; }

        .app-info h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .app-info span {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        .savings-tag {
          text-align: right;
        }

        .amount-val {
          display: block;
          color: #5c4df3;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .savings-tag .label {
          font-size: 0.6rem;
          font-weight: 700;
          color: #94a3b8;
        }

        .reason-box {
          background: #f8fafc;
          border-left: 3px solid #5c4df3;
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .reason-box p {
          font-size: 0.85rem;
          color: #475569;
          font-style: italic;
          line-height: 1.5;
          margin: 0;
        }

        .card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .btn-secondary {
          background: #eff6ff;
          color: #3b82f6;
          border: none;
          padding: 0.6rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-outline {
          background: transparent;
          color: #94a3b8;
          border: 1px solid #e2e8f0;
          padding: 0.6rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }

        .scan-more-card {
          background: white;
          border: 1px dashed #cbd5e1;
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: center;
          position: relative;
          min-height: 250px;
        }

        .scan-icon-plus {
          width: 48px;
          height: 48px;
          background: #f8fafc;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          margin-bottom: 1rem;
        }

        .scan-more-card h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .scan-more-card p {
          font-size: 0.85rem;
          color: #94a3b8;
          margin-bottom: 1.5rem;
        }

        .add-integration-btn {
          color: #5c4df3;
          background: transparent;
          border: none;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .ai-monitor-badge {
          position: absolute;
          bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border: 1px solid #f1f5f9;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          background: #5c4df3;
          border-radius: 50%;
        }

        .ai-monitor-badge span {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default Insights;
