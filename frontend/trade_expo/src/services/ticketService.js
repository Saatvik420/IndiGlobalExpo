import apiClient from '../api/client';

export const ticketService = {
  purchaseTicket: async (ticketData) => {
    const response = await apiClient.post('/tickets/purchase', ticketData);
    return response.data;
  },

  verifyPayment: async (paymentIntentId) => {
    const response = await apiClient.post(`/tickets/verify?paymentIntentId=${paymentIntentId}`);
    return response.data;
  },

  getHistory: async () => {
    const response = await apiClient.get('/tickets/history');
    return response.data;
  }
};
