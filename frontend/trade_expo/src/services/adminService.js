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
  },

  deleteUser: async (id) => {
    const response = await apiClient.delete(`/admin/users/${id}`);
    return response.data;
  },

  getAllBlogs: async () => {
    const response = await apiClient.get('/admin/blogs').catch(() => apiClient.get('/blogs'));
    return response.data;
  },

  createBlog: async (blogData) => {
    const response = await apiClient.post('/admin/blogs', blogData).catch(() => apiClient.post('/blogs', blogData));
    return response.data;
  },

  updateBlog: async (id, blogData) => {
    const response = await apiClient.put(`/admin/blogs/${id}`, blogData).catch(() => apiClient.put(`/blogs/${id}`, blogData));
    return response.data;
  },

  deleteBlog: async (id) => {
    const response = await apiClient.delete(`/admin/blogs/${id}`).catch(() => apiClient.delete(`/blogs/${id}`));
    return response.data;
  }
};
