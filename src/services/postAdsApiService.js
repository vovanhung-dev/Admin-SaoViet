import axiosClient from '../apis/axiosClient';

const postAdsApiService = {
    addPostAd: async (postAdData) => {
        try {
            const response = await axiosClient.post('/postAds', postAdData);
            return response.data;
        } catch (error) {
            console.error('Error adding post ad:', error);
            throw error;
        }
    },

    deletePostAd: async (id) => {
        try {
            const response = await axiosClient.delete(`/postAds/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting post ad:', error);
            throw error;
        }
    },

    getAllPostAds: async () => {
        try {
            const response = await axiosClient.get('/postAds');
            return response.data;
        } catch (error) {
            console.error('Error fetching all post ads:', error);
            throw error;
        }
    },

    getPostAdById: async (id) => {
        try {
            const response = await axiosClient.get(`/postAds/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching post ad by ID:', error);
            throw error;
        }
    },

    getPostAdsByUserId: async (userId) => {
        try {
            const response = await axiosClient.get(`/postAds/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching post ads by user ID:', error);
            throw error;
        }
    },

    updatePostAd: async (id, postAdData) => {
        try {
            const response = await axiosClient.put(`/postAds/${id}`, postAdData);
            return response.data;
        } catch (error) {
            console.error('Error updating post ad:', error);
            throw error;
        }
    },

    changePostAdStatus: async (id, status) => {
        try {
            const response = await axiosClient.put(`/postAds/${id}/status`, { status });
            return response.data;
        } catch (error) {
            console.error('Error changing post ad status:', error);
            throw error;
        }
    },

    getRevenueByMonthYear: async (month, year) => {
        try {
            const response = await axiosClient.get(`/postAds/revenue/${month}/${year}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching revenue by month and year:', error);
            throw error;
        }
    },

    getRevenueByAdType: async () => {
        try {
            const response = await axiosClient.get(`/postAds/revenue/ad-type`);
            return response.data;
        } catch (error) {
            console.error('Error fetching revenue by ad type:', error);
            throw error;
        }
    },

    getRevenueByStatus: async () => {
        try {
            const response = await axiosClient.get(`/postAds/revenue/status`);
            return response.data;
        } catch (error) {
            console.error('Error fetching revenue by status:', error);
            throw error;
        }
    },

    getPostAdsByCreatedBy: async (createdBy) => {
        try {
            const response = await axiosClient.get(`/postAds/createdBy/${createdBy}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching post ads by created by:', error);
            throw error;
        }
    }
};

export default postAdsApiService; 