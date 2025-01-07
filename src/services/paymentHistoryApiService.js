import axiosClient from '../apis/axiosClient';

const paymentHistoryApiService = {
    addPayment: async (paymentData) => {
        try {
            const response = await axiosClient.post('/paymentHistory', paymentData);
            return response.data;
        } catch (error) {
            console.error('Error adding payment:', error);
            throw error;
        }
    },

    deletePayment: async (id) => {
        try {
            const response = await axiosClient.delete(`/paymentHistory/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting payment:', error);
            throw error;
        }
    },

    getAllPayments: async () => {
        try {
            const response = await axiosClient.get('/paymentHistory');
            return response.data;
        } catch (error) {
            console.error('Error fetching all payments:', error);
            throw error;
        }
    },

    getPaymentById: async (id) => {
        try {
            const response = await axiosClient.get(`/paymentHistory/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching payment by ID:', error);
            throw error;
        }
    },

    searchPayments: async (query) => {
        try {
            const response = await axiosClient.get(`/paymentHistory/search`, { params: query });
            return response.data;
        } catch (error) {
            console.error('Error searching payments:', error);
            throw error;
        }
    },

    updatePayment: async (id, paymentData) => {
        try {
            const response = await axiosClient.put(`/paymentHistory/${id}`, paymentData);
            return response.data;
        } catch (error) {
            console.error('Error updating payment:', error);
            throw error;
        }
    }
};

export default paymentHistoryApiService; 