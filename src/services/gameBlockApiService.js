import axiosClient from '../apis/axiosClient';

const gameBlockApiService = {
    getAllGameBlocks: async () => {
        try {
            const response = await axiosClient.get('/game-blocks');
            return response.data;
        } catch (error) {
            console.error('Error fetching game blocks:', error);
            throw error;
        }
    },

    getGameBlockById: async (id) => {
        try {
            const response = await axiosClient.get(`/game-blocks/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching game block by ID:', error);
            throw error;
        }
    },

    createGameBlock: async (gameBlockData) => {
        try {
            const response = await axiosClient.post('/game-blocks', gameBlockData);
            return response.data;
        } catch (error) {
            console.error('Error creating game block:', error);
            throw error;
        }
    },

    updateGameBlock: async (id, gameBlockData) => {
        try {
            const response = await axiosClient.put(`/game-blocks/${id}`, gameBlockData);
            return response.data;
        } catch (error) {
            console.error('Error updating game block:', error);
            throw error;
        }
    },

    deleteGameBlock: async (id) => {
        try {
            const response = await axiosClient.delete(`/game-blocks/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting game block:', error);
            throw error;
        }
    },

    searchGameBlocks: async (query) => {
        try {
            const response = await axiosClient.get(`/game-blocks/search?query=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error searching game blocks:', error);
            throw error;
        }
    }
};

export default gameBlockApiService; 