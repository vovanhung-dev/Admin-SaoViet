import axiosClient from '../apis/axiosClient';

const imagesApiService = {
    getAllImages: async () => {
        try {
            const response = await axiosClient.get('/images');
            return response.data;
        } catch (error) {
            console.error('Error fetching images:', error);
            throw error;
        }
    },

    getImageById: async (id) => {
        try {
            const response = await axiosClient.get(`/images/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching image by ID:', error);
            throw error;
        }
    },

    createImage: async (imageData) => {
        try {
            const response = await axiosClient.post('/images', imageData);
            return response.data;
        } catch (error) {
            console.error('Error creating image:', error);
            throw error;
        }
    },

    updateImage: async (id, imageData) => {
        try {
            const response = await axiosClient.put(`/images/${id}`, imageData);
            return response.data;
        } catch (error) {
            console.error('Error updating image:', error);
            throw error;
        }
    },

    deleteImage: async (id) => {
        try {
            const response = await axiosClient.delete(`/images/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting image:', error);
            throw error;
        }
    },

    searchImages: async (query) => {
        try {
            const response = await axiosClient.get(`/images/search?query=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error searching images:', error);
            throw error;
        }
    }
};

export default imagesApiService; 