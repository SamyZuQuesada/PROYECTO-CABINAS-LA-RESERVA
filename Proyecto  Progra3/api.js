const API_BASE_URL = 'http://localhost:3000';

export const landingApi = {
    getData: async () => {
        const response = await fetch(`${API_BASE_URL}/landing`);
        return await response.json();
    },

};

export const testimoniosApi = {
    getTestimonios: async () => {
        const response = await fetch(`${API_BASE_URL}/testimonios`);
        return await response.json();
    },

    updateTestimonio: async (id, datos) => {
        const response = await fetch(`${API_BASE_URL}/testimonios/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });
        return await response.json();
    }
};