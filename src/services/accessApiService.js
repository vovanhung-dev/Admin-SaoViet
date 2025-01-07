import axiosClient from '../apis/axiosClient';

const accessApiService = {
    getAllAccess: async () => {
        try {
            const response = await axiosClient.get('/access');
            return response.data;
        } catch (error) {
            console.error('Error fetching access records:', error);
            throw error;
        }
    },

    getAccessById: async (id) => {
        try {
            const response = await axiosClient.get(`/access/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching access record by ID:', error);
            throw error;
        }
    },

    createAccess: async (accessData) => {
        try {
            const response = await axiosClient.post('/access', accessData);
            return response.data;
        } catch (error) {
            console.error('Error creating access record:', error);
            throw error;
        }
    },

    updateAccess: async (id, accessData) => {
        try {
            const response = await axiosClient.put(`/access/${id}`, accessData);
            return response.data;
        } catch (error) {
            console.error('Error updating access record:', error);
            throw error;
        }
    },

    deleteAccess: async (id) => {
        try {
            const response = await axiosClient.delete(`/access/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting access record:', error);
            throw error;
        }
    },

    searchAccess: async (query) => {
        try {
            const response = await axiosClient.get(`/access/search?query=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error searching access records:', error);
            throw error;
        }
    }
};

export default accessApiService; 