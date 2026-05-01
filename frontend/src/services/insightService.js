import api from '../api';

const insightService = {
  getInsights: async () => {
    const response = await api.get('/insights');
    return response.data;
  }
};

export default insightService;
