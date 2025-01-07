import axiosClient from '../apis/axiosClient';

const favoritesApiService = {
    addFavorite: async (favoriteData) => {
        try {
            const response = await axiosClient.post('/favorites', favoriteData);
            return response.data;
        } catch (error) {
            console.error('Error adding favorite:', error);
            throw error;
        }
    },

    deleteFavorite: async (id) => {
        try {
            const response = await axiosClient.delete(`/favorites/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting favorite:', error);
            throw error;
        }
    },

    getAllFavorites: async () => {
        try {
            const response = await axiosClient.get('/favorites');
            return response.data;
        } catch (error) {
            console.error('Error fetching all favorites:', error);
            throw error;
        }
    },

    getFavoriteById: async (id) => {
        try {
            const response = await axiosClient.get(`/favorites/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching favorite by ID:', error);
            throw error;
        }
    },

    getFavoritesByUserId: async (userId) => {
        try {
            const response = await axiosClient.get(`/favorites/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching favorites by user ID:', error);
            throw error;
        }
    }
};

export default favoritesApiService; 