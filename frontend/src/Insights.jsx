import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import insightService from './services/insightService';
import aiService from './services/aiService';
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
  LayoutGrid,
  Loader2,
  AlertTriangle,
  Info,
  Sparkles
} from 'lucide-react';

const Insights = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // AI Insights State
  const [aiInsights, setAiInsights] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    await fetchInsights();
    // We don't auto-fetch AI here anymore to save quota
    setLoading(false);
  };

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const response = await insightService.getInsights();
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching insights:', err);
      setError('Failed to load insights. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAIInsights = async () => {
    try {
      setAiLoading(true);
      setAiError(null);
      const text = await aiService.getAIInsights();
      setAiInsights(text);
    } catch (err) {
      console.error('Error fetching AI insights:', err);
      setAiError('AI recommendations are currently unavailable.');
    } finally {
      setAiLoading(false);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'waste': return { color: '#ef4444', bg: '#fee2e2', border: '#fecaca', label: 'WASTE DETECTED' };
      case 'warning': return { color: '#f59e0b', bg: '#fef3c7', border: '#fde68a', label: 'RENEWAL SOON' };
      default: return { color: '#10b981', bg: '#ecfdf5', border: '#d1fae5', label: 'HEALTHY' };
    }
  };

  const calculateTotalSavings = () => {
    if (!data) return 0;
    return data.subscriptions
      .filter(s => s.status === 'waste')
      .reduce((acc, curr) => acc + (curr.cost || 0), 0);
  };

  return (
    <div className="dashboard-container">
      <Helmet>
        <title>AI Insights & Savings | SubOptima</title>
        <meta name="description" content="Get actionable AI insights on your SaaS spending. SubOptima's engine identifies waste, highlights optimization opportunities, and suggests alternative software." />
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
          <Link to="/insights" className="nav-item active">
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
              padding: '0.75rem 1rem'
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
            <input type="text" placeholder="Search insights..." />
          </div>
          
          <div className="header-right">
            <div className="header-icons">
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

        <div className="insights-content">
          <div className="insights-header-row">
            <div className="title-section">
              <h1>AI Optimization Insights</h1>
              <p>Automated analysis of your SaaS spending and usage</p>
            </div>
            <button className="regenerate-btn" onClick={fetchAllData} disabled={loading || aiLoading}>
              {(loading || aiLoading) ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              Regenerate Analysis
            </button>
          </div>

          {(error || aiError) && (
            <div style={{ padding: '1rem', background: '#fee2e2', color: '#dc2626', borderRadius: '12px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={18} />
              {error || aiError}
            </div>
          )}

          {loading && !data ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>
              <Loader2 size={48} className="animate-spin" color="#5c4df3" style={{ margin: '0 auto 1.5rem' }} />
              <h3>Analyzing your stack...</h3>
              <p style={{ color: 'var(--text-muted)' }}>Our AI agent is scanning for waste and renewal alerts.</p>
            </div>
          ) : !data || data.subscriptions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--white)', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--input-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--text-muted)' }}>
                <LayoutGrid size={40} />
              </div>
              <h3>No data to analyze</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Add some subscriptions to see AI-powered optimization insights.</p>
              <Link to="/subscriptions/add" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', padding: '0.75rem 1.5rem', borderRadius: '12px', background: '#5c4df3', color: 'white', fontWeight: 600 }}>
                <Plus size={18} style={{ marginRight: '0.5rem' }} />
                Connect Your First App
              </Link>
            </div>
          ) : (
            <>
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
                      <span className="value">{calculateTotalSavings()}</span>
                      <span className="decimals">.00</span>
                    </div>
                  </div>
                  <p className="card-footer-text">
                    We identified {data.summary.totalWasteCount} critical waste zones and {data.summary.totalWarningCount} upcoming renewals that need attention.
                  </p>
                </div>

                <div className="status-card">
                  <div className="status-header">
                    <div className="status-icon-bg">
                      <Cpu size={24} color="#5c4df3" />
                    </div>
                    <div className="status-info">
                      <div className="status-label-row">
                        <h3>Stack Summary</h3>
                        <span className="live-badge">HEALTH CHECK</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ef4444' }}>{data.summary.totalWasteCount}</div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>WASTE</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f59e0b' }}>{data.summary.totalWarningCount}</div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>WARNINGS</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981' }}>{data.summary.totalHealthyCount}</div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>HEALTHY</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="progress-section">
                    <div className="progress-bar-container">
                      <div className="progress-bar-fill" style={{width: `${(data.summary.totalHealthyCount / data.subscriptions.length) * 100}%`}}></div>
                    </div>
                    <div className="progress-meta">
                      <span>STACK HEALTH: {Math.round((data.summary.totalHealthyCount / data.subscriptions.length) * 100)}%</span>
                      <span>{data.subscriptions.length} APPS ANALYZED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Smart Recommendations Section */}
              <div className="ai-insights-section" style={{ marginBottom: '2.5rem' }}>
                <div className="section-header" style={{ marginBottom: '1rem' }}>
                  <Sparkles size={20} color="#5c4df3" />
                  <h2>Smart Recommendations</h2>
                  <span className="ai-badge">AI POWERED</span>
                </div>
                
                <div className="ai-card" style={{ 
                  background: 'var(--white)', 
                  border: '1px solid var(--border)', 
                  borderRadius: '16px', 
                  padding: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div className="ai-card-glow"></div>
                  {aiLoading ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 1rem', color: '#5c4df3' }} />
                      <p>Consulting Gemini AI for advanced optimizations...</p>
                    </div>
                  ) : aiInsights ? (
                    <div className="ai-text-content">
                      {aiInsights.split('\n').map((line, i) => (
                        <p key={i} style={{ 
                          fontSize: '0.95rem', 
                          color: '#475569', 
                          lineHeight: '1.6', 
                          marginBottom: '0.75rem',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem'
                        }}>
                          {line.trim().startsWith('-') || line.trim().startsWith('*') ? (
                            <span style={{ color: '#5c4df3', fontWeight: 900 }}>•</span>
                          ) : null}
                          {line.replace(/^[-*]\s*/, '')}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                      <div style={{ width: '48px', height: '48px', background: '#f0efff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#5c4df3' }}>
                        <Sparkles size={24} />
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Unlock AI-Powered Savings</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                        Our Gemini AI can scan your entire subscription stack to find hidden overlaps, redundant services, and better pricing plans.
                      </p>
                      <button 
                        onClick={fetchAIInsights} 
                        className="btn-primary" 
                        style={{ 
                          background: '#5c4df3', 
                          border: 'none', 
                          padding: '0.75rem 1.5rem', 
                          borderRadius: '12px', 
                          color: 'white', 
                          fontWeight: 600, 
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          boxShadow: '0 4px 12px rgba(92, 77, 243, 0.2)'
                        }}
                      >
                        <Sparkles size={16} />
                        Generate Smart Recommendations
                      </button>
                    </div>
                  )}
                  {aiError && !aiLoading && (
                    <div style={{ marginTop: '1rem', color: '#ef4444', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                      <AlertTriangle size={14} />
                      {aiError}
                    </div>
                  )}
                </div>
              </div>

              <div className="recommendations-section">
                <div className="section-header">
                  <CheckCircle2 size={20} color="#5c4df3" />
                  <h2>Actionable Recommendations</h2>
                </div>

                <div className="recommendations-grid">
                  {data.subscriptions.filter(s => s.status !== 'healthy').length > 0 ? (
                    data.subscriptions.filter(s => s.status !== 'healthy').map((sub) => {
                      const styles = getStatusStyles(sub.status);
                      return (
                        <div key={sub._id} className="recommendation-card" style={{ borderTop: `4px solid ${styles.color}` }}>
                          <div className="card-top">
                            <div className="app-info">
                              <div className="app-icon" style={{ background: 'var(--input-bg)', color: 'var(--primary)' }}>
                                <LayoutGrid size={18} />
                              </div>
                              <div>
                                <h4>{sub.name}</h4>
                                <span style={{ textTransform: 'capitalize' }}>{sub.category}</span>
                              </div>
                            </div>
                            <div className="savings-tag">
                              <span className="amount-val" style={{ color: styles.color }}>
                                {sub.status === 'waste' ? `-$${sub.cost}` : 'Alert'}
                              </span>
                              <span className="label" style={{ background: styles.bg, color: styles.color, padding: '2px 6px', borderRadius: '4px', fontSize: '0.55rem', marginLeft: 'auto', display: 'block', width: 'fit-content', marginTop: '4px' }}>
                                {styles.label}
                              </span>
                            </div>
                          </div>
                          <div className="reason-box" style={{ borderLeftColor: styles.color, background: styles.bg }}>
                            <p>
                              {sub.status === 'waste' 
                                ? (() => {
                                    const daysInactive = Math.floor((new Date() - new Date(sub.lastUsedDate)) / (1000 * 60 * 60 * 24));
                                    return `This service hasn't been used in ${daysInactive > 0 ? daysInactive : 'several'} days and is costing $${sub.cost}/mo. We recommend cancelling immediately.`;
                                  })()
                                : (() => {
                                    const daysUntil = Math.ceil((new Date(sub.renewalDate) - new Date()) / (1000 * 60 * 60 * 24));
                                    return `Upcoming renewal in ${daysUntil > 0 ? daysUntil : 0} days (on ${new Date(sub.renewalDate).toLocaleDateString()}). Review usage before the billing cycle restarts.`;
                                  })()
                              }
                            </p>
                          </div>
                          <div className="card-actions">
                            <Link to="/subscriptions" className="btn-secondary" style={{ textAlign: 'center', textDecoration: 'none' }}>Review List</Link>
                            <button className="btn-outline" style={{ color: sub.status === 'waste' ? '#ef4444' : '#64748b' }}>
                              {sub.status === 'waste' ? 'Cancel Service' : 'Manage Renewal'}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'var(--input-bg)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                      <Info size={32} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
                      <p style={{ color: 'var(--text-muted)' }}>No critical actions required at this time. All services are healthy!</p>
                    </div>
                  )}

                  <div className="scan-more-card">
                    <div className="scan-icon-plus">
                      <Plus size={24} />
                    </div>
                    <h3>Connect More Apps</h3>
                    <p>The more apps you connect, the better our AI can find overlaps.</p>
                    <Link to="/subscriptions/add" className="add-integration-btn" style={{ textDecoration: 'none' }}>Add Integration</Link>
                    <div className="ai-monitor-badge">
                       <div className="pulse-dot"></div>
                       <span>AI is monitoring active sessions...</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
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

        .ai-badge {
          font-size: 0.65rem;
          font-weight: 800;
          color: white;
          background: linear-gradient(135deg, #5c4df3 0%, #3b2bc4 100%);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          margin-left: 0.5rem;
          letter-spacing: 0.5px;
        }

        .ai-card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(92, 77, 243, 0.03) 0%, transparent 50%);
          pointer-events: none;
        }

        .insights-content { padding: 2rem; max-width: 1200px; margin: 0 auto; }
        .insights-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .title-section h1 { font-size: 1.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem; }
        .title-section p { color: var(--text-muted); font-size: 0.9rem; }
        .regenerate-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1rem; border: 1px solid var(--border); border-radius: 8px; background: var(--white); color: #5c4df3; font-weight: 600; font-size: 0.85rem; cursor: pointer; }
        .insights-summary-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 1.5rem; margin-bottom: 2.5rem; }
        .efficiency-card { background: linear-gradient(135deg, #5c4df3 0%, #3b2bc4 100%); border-radius: 16px; padding: 2rem; color: white; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 25px -5px rgba(92, 77, 243, 0.3); }
        .card-badge { display: flex; align-items: center; gap: 0.4rem; background: rgba(255, 255, 255, 0.2); padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.7rem; font-weight: 700; width: fit-content; margin-bottom: 1.5rem; }
        .savings-main p { font-size: 0.95rem; opacity: 0.9; margin-bottom: 0.5rem; }
        .amount { display: flex; align-items: baseline; }
        .currency { font-size: 2rem; font-weight: 600; }
        .value { font-size: 4rem; font-weight: 700; line-height: 1; }
        .decimals { font-size: 1.5rem; opacity: 0.7; }
        .card-footer-text { margin-top: 2rem; font-size: 0.85rem; line-height: 1.5; opacity: 0.9; }
        .status-card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; }
        .status-header { display: flex; gap: 1.5rem; }
        .status-icon-bg { width: 56px; height: 56px; background: #f0efff; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .status-label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; width: 100%; }
        .live-badge { font-size: 0.65rem; font-weight: 800; color: #10b981; background: #ecfdf5; padding: 0.25rem 0.6rem; border-radius: 4px; }
        .status-info { flex-grow: 1; }
        .progress-section { margin-top: 2rem; }
        .progress-bar-container { height: 8px; background: var(--input-bg); border-radius: 4px; overflow: hidden; margin-bottom: 0.75rem; }
        .progress-bar-fill { height: 100%; background: #5c4df3; border-radius: 4px; transition: width 0.5s ease; }
        .progress-meta { display: flex; justify-content: space-between; font-size: 0.65rem; font-weight: 700; color: var(--text-muted); }
        .recommendations-section { margin-top: 3rem; }
        .section-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
        .section-header h2 { font-size: 1.4rem; font-weight: 700; color: var(--text-main); }
        .recommendations-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem; }
        .recommendation-card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; }
        .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .app-info { display: flex; gap: 0.75rem; align-items: center; }
        .app-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .app-info h4 { font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin: 0; }
        .app-info span { font-size: 0.8rem; color: var(--text-muted); }
        .savings-tag { text-align: right; }
        .amount-val { display: block; font-weight: 700; font-size: 1.1rem; }
        .savings-tag .label { font-size: 0.6rem; font-weight: 700; }
        .reason-box { border-left: 3px solid #5c4df3; padding: 1rem; border-radius: 4px; margin-bottom: 1.5rem; flex-grow: 1; }
        .reason-box p { font-size: 0.85rem; color: #475569; font-style: italic; line-height: 1.5; margin: 0; }
        .card-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .btn-secondary { background: #eff6ff; color: #3b82f6; border: none; padding: 0.6rem; border-radius: 8px; font-size: 0.8rem; font-weight: 600; cursor: pointer; }
        .btn-outline { background: transparent; color: var(--text-muted); border: 1px solid var(--border); padding: 0.6rem; border-radius: 8px; font-size: 0.8rem; font-weight: 600; cursor: pointer; }
        .scan-more-card { background: var(--white); border: 1px dashed #cbd5e1; border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; align-items: center; text-align: center; justify-content: center; position: relative; min-height: 250px; }
        .scan-icon-plus { width: 48px; height: 48px; background: var(--input-bg); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-muted); margin-bottom: 1rem; }
        .scan-more-card h3 { font-size: 1rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem; }
        .scan-more-card p { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; }
        .add-integration-btn { color: #5c4df3; background: transparent; border: none; font-weight: 700; font-size: 0.85rem; cursor: pointer; }
        .ai-monitor-badge { position: absolute; bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; background: var(--white); padding: 0.4rem 1rem; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; }
        .pulse-dot { width: 6px; height: 6px; background: #5c4df3; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(92, 77, 243, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(92, 77, 243, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(92, 77, 243, 0); } }
      `}</style>
    </div>
  );
};

export default Insights;
