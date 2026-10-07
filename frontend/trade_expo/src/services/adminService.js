import apiClient from '../api/client';
import blogService from './blogService';

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
    return blogService.getAllBlogs();
  },

  createBlog: async (blogData) => {
    return blogService.createBlog(blogData);
  },

  updateBlog: async (id, blogData) => {
    return blogService.updateBlog(id, blogData);
  },

  deleteBlog: async (id) => {
    return blogService.deleteBlog(id);
  }
};
