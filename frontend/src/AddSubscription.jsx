import Subscriptions from './Subscriptions';
import { X, Upload, ChevronDown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddSubscription = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/subscriptions');
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Background Subscriptions Page */}
      <Subscriptions />
      
      {/* Modal Overlay */}
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-modal" onClick={handleClose} aria-label="Close">
            <X size={20} />
          </button>
          
          <div className="modal-header">
            <h2>Add New Subscription</h2>
            <p>Connect your services to start optimizing.</p>
          </div>

          <div className="progress-section">
            <div className="progress-track">
              <div className="progress-fill"></div>
            </div>
            <span className="step-text">Step 1 of 3: Details</span>
          </div>

          <div className="form-field">
            <label htmlFor="sub-name">Subscription Name</label>
            <input 
              id="sub-name"
              type="text" 
              className="form-input" 
              placeholder="e.g. Netflix, Amazon Prime" 
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <div className="form-select-wrapper">
              <select id="category" className="form-input form-select" defaultValue="">
                <option value="" disabled>Select a category</option>
                <option value="entertainment">Entertainment</option>
                <option value="streaming">Streaming Services</option>
                <option value="software">Software & SaaS</option>
                <option value="infrastructure">Cloud Infrastructure</option>
                <option value="utilities">Utilities</option>
              </select>
              <ChevronDown className="select-icon" size={18} />
            </div>
          </div>

          <div className="form-field">
            <label>Logo Upload</label>
            <div className="upload-area">
              <div style={{ 
                background: '#f1f5f9', 
                padding: '0.75rem', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '0.25rem'
              }}>
                <Upload size={20} color="var(--primary)" strokeWidth={2.5} />
              </div>
              <p>Click to upload or drag logo</p>
              <span>PNG, SVG UP TO 5MB</span>
            </div>
          </div>

          <div className="quick-picks">
            <span className="quick-picks-label">QUICK PICKS</span>
            <div className="quick-picks-grid">
              <div className="quick-pick-item" style={{ background: '#E50914' }} title="Netflix">
                <span style={{ color: 'white', fontWeight: 900, fontSize: '0.9rem' }}>N</span>
              </div>
              <div className="quick-pick-item" style={{ background: '#1DB954' }} title="Spotify">
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'black', display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '10px', height: '1px', background: '#1DB954', borderRadius: '10px', transform: 'rotate(-5deg)' }}></div>
                    <div style={{ width: '8px', height: '1px', background: '#1DB954', borderRadius: '10px', transform: 'rotate(-5deg)' }}></div>
                </div>
              </div>
              <div className="quick-pick-item" style={{ background: '#00A8E1' }} title="Prime Video">
                 <div style={{ width: '12px', height: '12px', border: '2px solid white', borderRadius: '50%', borderBottomColor: 'transparent' }}></div>
              </div>
              <div className="quick-pick-item" style={{ background: '#02241e' }} title="Other">
                 <div style={{ width: '0', height: '0', borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderBottom: '12px solid #00FF9C' }}></div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn-cancel" onClick={handleClose}>Cancel</button>
            <button className="btn-next">
              Next Step
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubscription;
