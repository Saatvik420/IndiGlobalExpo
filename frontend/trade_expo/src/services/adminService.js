import apiClient from '../api/client';

export const adminService = {
  getAllUsers: async () => {
    const response = await apiClient.get('/admin/users');
    return response.data;
  },

  getAllExhibitors: async () => {
    const response = await apiClient.get('/admin/exhibitors');
    return response.data;
  },

  getAllTickets: async () => {
    const response = await apiClient.get('/admin/tickets');
    return response.data;
  },

  updateExhibitorStatus: async (id, status) => {
    const response = await apiClient.put(`/admin/exhibitors/${id}/status?status=${status}`);
    return response.data;
  }
};
