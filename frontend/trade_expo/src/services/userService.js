import apiClient from '../api/client';

export const userService = {
  updateProfile: async (profileData) => {
    const response = await apiClient.put('/user/profile', profileData);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await apiClient.get('/user/profile');
    return response.data;
  }
};
