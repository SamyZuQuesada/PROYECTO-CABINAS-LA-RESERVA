const API_BASE_URL = 'http://localhost:3000';

export const landingApi = {
    getData: async () => {
        const response = await fetch(`${API_BASE_URL}/landing`);
        return await response.json();
    },

};