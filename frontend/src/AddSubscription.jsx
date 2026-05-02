import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Subscriptions from './Subscriptions';
import { X, Upload, ChevronDown, ArrowRight, Loader2, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import subscriptionService from './services/subscriptionService';

const AddSubscription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    detail: '',
    cost: '',
    renewalDate: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      fetchSubscriptionDetails();
    }
  }, [id]);

  const fetchSubscriptionDetails = async () => {
    try {
      setFetching(true);
      const response = await subscriptionService.getSubscriptionById(id);
      const sub = response.data;
      
      // Format date for input type="date" (YYYY-MM-DD)
      const date = new Date(sub.renewalDate);
      const formattedDate = date.toISOString().split('T')[0];

      setFormData({
        name: sub.name,
        category: sub.category,
        detail: sub.detail,
        cost: sub.cost.toString(),
        renewalDate: formattedDate
      });
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError('Failed to load subscription details.');
    } finally {
      setFetching(false);
    }
  };

  const { name, category, detail, cost, renewalDate } = formData;

  const handleClose = () => {
    navigate('/subscriptions');
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const numericCost = parseFloat(cost);
      if (isNaN(numericCost)) {
        throw new Error('Cost must be a valid number');
      }

      const dataToSubmit = {
        name,
        category,
        detail,
        cost: numericCost,
        renewalDate: new Date(renewalDate)
      };

      if (isEditMode) {
        await subscriptionService.updateSubscription(id, dataToSubmit);
      } else {
        await subscriptionService.createSubscription(dataToSubmit);
      }
      navigate('/subscriptions');
    } catch (err) {
      console.error('Error saving subscription:', err);
      setError(err.response?.data?.message || err.message || 'Failed to save subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Background Subscriptions Page */}
      <div style={{ filter: 'blur(2px)', opacity: 0.6, pointerEvents: 'none' }}>
        <Subscriptions />
      </div>
      
      {/* Modal Overlay */}
      <div className="modal-overlay">
        <Helmet>
          <title>{id ? 'Edit Subscription' : 'Add Subscription'} | SubOptima</title>
          <meta name="description" content={id ? 'Update the details of your active software subscription.' : 'Add a new software subscription to your SubOptima tracking dashboard.'} />
        </Helmet>
        <div className="modal-content">
          <button className="close-modal" onClick={handleClose} aria-label="Close">
            <X size={18} />
          </button>
          
          <div className="modal-header">
            <h2>{isEditMode ? 'Edit Subscription' : 'Add New Subscription'}</h2>
            <p>{isEditMode ? 'Update your service details to keep your records accurate.' : 'Connect your services to start optimizing your bills.'}</p>
          </div>

          {fetching ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
              <p>Fetching details...</p>
            </div>
          ) : (
            <>
              {error && (
                <div style={{ 
                  background: '#fee2e2', 
                  color: '#dc2626', 
                  padding: '0.75rem', 
                  borderRadius: '8px', 
                  marginBottom: '1.5rem',
                  fontSize: '0.85rem',
                  border: '1px solid #fecaca'
                }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Subscription Name</label>
                    <input 
                      id="name"
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Netflix" 
                      value={name}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="category">Category</label>
                    <div className="form-select-wrapper">
                      <select 
                        id="category" 
                        className="form-input form-select" 
                        value={category}
                        onChange={onChange}
                        required
                      >
                        <option value="" disabled>Select category</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="streaming">Streaming</option>
                        <option value="software">Software & SaaS</option>
                        <option value="infrastructure">Cloud</option>
                        <option value="utilities">Utilities</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown className="select-icon" size={16} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="cost">Monthly Cost ($)</label>
                    <input 
                      id="cost"
                      type="number" 
                      step="0.01"
                      className="form-input" 
                      placeholder="0.00" 
                      value={cost}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="renewalDate">Renewal Date</label>
                    <input 
                      id="renewalDate"
                      type="date" 
                      className="form-input" 
                      value={renewalDate}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="detail">Plan / Licenses Details</label>
                  <input 
                    id="detail"
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Premium Plan, 5 Licenses" 
                    value={detail}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn-cancel" onClick={handleClose}>Back to List</button>
                  <button type="submit" className="btn-next" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        {isEditMode ? 'Update Changes' : 'Add Subscription'}
                        {isEditMode ? <Save size={18} /> : <ArrowRight size={18} />}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

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

export default AddSubscription;
