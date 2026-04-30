import apiClient from '../api/client';

export const exhibitorService = {
  apply: async (exhibitorData) => {
    const response = await apiClient.post('/exhibitors/apply', exhibitorData);
    return response.data;
  },

  getMyApplication: async () => {
    try {
      const response = await apiClient.get('/exhibitors/my-application');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  }
};
