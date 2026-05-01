import api from '../api';

const aiService = {
  getAIInsights: async () => {
    const response = await api.get('/ai-insights');
    return response.data.aiInsights;
  }
};

export default aiService;
