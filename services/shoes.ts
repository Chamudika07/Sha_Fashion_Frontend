import api from "./api";    

export const getAllShoes = async () => {
    try {
        const response = await api.get("/shoes");
        return response.data;
    } catch (error) {
        console.error("Error fetching shoes:", error);
        throw error;
    }
};

export const getShoeById = async (shoeId: number) => {
    try {
        const response = await api.get(`/shoes/${shoeId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching shoe with id ${shoeId}:`, error);
        throw error;
    }
};

export const updateShoeQuantity = async (shoeId: number, updatedShoe: {
    name?: string;
    size?: string;
    quntity?: number;
    price?: number;
    brand?: string;
}) => {
    try {
        const response = await api.put(`/shoes/${shoeId}`, updatedShoe);
        return response.data;
    } catch (error) {
        console.error(`Error updating shoe with id ${shoeId}:`, error);
        throw error;
    }
};

export const deleteShoe = async (shoeId: number) => {
    try {
        const response = await api.delete(`/shoes/${shoeId}`);
        return response.status === 204; // Returns true if successful
    } catch (error) {
        console.error(`Error deleting shoe with id ${shoeId}:`, error);
        throw error;
    }
}; 