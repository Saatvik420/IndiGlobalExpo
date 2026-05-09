import apiClient from '../api/client';

export const contactService = {
  submitInquiry: async (formData) => {
    const response = await apiClient.post('/contact/submit', formData);
    return response.data;
  },

  getAllInquiries: async () => {
    const response = await apiClient.get('/contact/all');
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await apiClient.put(`/contact/read/${id}`);
    return response.data;
  },

  deleteInquiry: async (id) => {
    const response = await apiClient.delete(`/contact/${id}`);
    return response.data;
  }
};
