import api from '../api';

const subscriptionService = {
  getSubscriptions: async () => {
    const response = await api.get('/subscriptions');
    return response.data;
  },

  createSubscription: async (data) => {
    const response = await api.post('/subscriptions', data);
    return response.data;
  },

  updateSubscription: async (id, data) => {
    const response = await api.put(`/subscriptions/${id}`, data);
    return response.data;
  },

  deleteSubscription: async (id) => {
    const response = await api.delete(`/subscriptions/${id}`);
    return response.data;
  }
};

export default subscriptionService;
