import apiClient from '../api/client';

export const authService = {
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  googleLogin: async (token) => {
    const response = await apiClient.post('/auth/google', { token });
    return response.data;
  },

  registerVisitor: async (userData) => {
    const response = await apiClient.post('/auth/register/visitor', userData);
    return response.data;
  },

  registerExhibitor: async (exhibitorData) => {
    const response = await apiClient.post('/auth/register/exhibitor', exhibitorData);
    return response.data;
  }
};
