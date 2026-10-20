import apiClient from '../api/client';
import blogService from './blogService';
import { 
  INITIAL_ADMIN_USERS, 
  INITIAL_ADMIN_EXHIBITORS, 
  INITIAL_ADMIN_TICKETS 
} from './adminInitialData';

const CACHE_KEY_USERS = 'indiglobal_admin_users_cache';
const CACHE_KEY_EXHIBITORS = 'indiglobal_admin_exhibitors_cache';
const CACHE_KEY_TICKETS = 'indiglobal_admin_tickets_cache';

const getCache = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
  }
  return fallback;
};

const setCache = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
};

export const adminService = {
  getCachedUsers: () => getCache(CACHE_KEY_USERS, INITIAL_ADMIN_USERS),
  getCachedExhibitors: () => getCache(CACHE_KEY_EXHIBITORS, INITIAL_ADMIN_EXHIBITORS),
  getCachedTickets: () => getCache(CACHE_KEY_TICKETS, INITIAL_ADMIN_TICKETS),

  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/admin/users');
      if (response && Array.isArray(response.data) && response.data.length > 0) {
        setCache(CACHE_KEY_USERS, response.data);
        return response.data;
      }
    } catch (err) {
      console.warn('API /admin/users failed, serving cached/initial users:', err.message);
      const fallback = getCache(CACHE_KEY_USERS, INITIAL_ADMIN_USERS);
      // Attach the error to the returned array so caller can inspect authentication status
      fallback._error = err;
      return fallback;
    }
    return getCache(CACHE_KEY_USERS, INITIAL_ADMIN_USERS);
  },

  getAllExhibitors: async () => {
    try {
      const response = await apiClient.get('/admin/exhibitors');
      if (response && Array.isArray(response.data) && response.data.length > 0) {
        setCache(CACHE_KEY_EXHIBITORS, response.data);
        return response.data;
      }
    } catch (err) {
      console.warn('API /admin/exhibitors failed, serving cached/initial exhibitors:', err.message);
      const fallback = getCache(CACHE_KEY_EXHIBITORS, INITIAL_ADMIN_EXHIBITORS);
      fallback._error = err;
      return fallback;
    }
    return getCache(CACHE_KEY_EXHIBITORS, INITIAL_ADMIN_EXHIBITORS);
  },

  getAllTickets: async () => {
    try {
      const response = await apiClient.get('/admin/tickets');
      if (response && Array.isArray(response.data) && response.data.length > 0) {
        setCache(CACHE_KEY_TICKETS, response.data);
        return response.data;
      }
    } catch (err) {
      console.warn('API /admin/tickets failed, serving cached/initial tickets:', err.message);
      const fallback = getCache(CACHE_KEY_TICKETS, INITIAL_ADMIN_TICKETS);
      fallback._error = err;
      return fallback;
    }
    return getCache(CACHE_KEY_TICKETS, INITIAL_ADMIN_TICKETS);
  },

  updateExhibitorStatus: async (id, status) => {
    try {
      const response = await apiClient.put(`/admin/exhibitors/${id}/status?status=${status}`);
      return response.data;
    } catch (err) {
      console.warn('Update exhibitor status failed:', err.message);
      // Update locally
      const exhibitors = getCache(CACHE_KEY_EXHIBITORS, INITIAL_ADMIN_EXHIBITORS);
      const updated = exhibitors.map(e => e.id === id ? { ...e, status } : e);
      setCache(CACHE_KEY_EXHIBITORS, updated);
      return { id, status };
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(`/admin/users/${id}`);
      return response.data;
    } catch (err) {
      console.warn('Delete user API failed:', err.message);
      const users = getCache(CACHE_KEY_USERS, INITIAL_ADMIN_USERS);
      const updated = users.filter(u => u.id !== id);
      setCache(CACHE_KEY_USERS, updated);
      return true;
    }
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
