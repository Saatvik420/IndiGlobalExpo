import apiClient from '../api/client';

export const contactService = {
  submitInquiry: async (formData) => {
    const response = await apiClient.post('/contact/submit', formData);
    return response.data;
  },

  getAllInquiries: async () => {
    const response = await apiClient.get('/support/queries');
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await apiClient.put(`/support/queries/${id}/read`);
    return response.data;
  },

  deleteInquiry: async (id) => {
    const response = await apiClient.delete(`/support/queries/${id}`);
    return response.data;
  }
};
