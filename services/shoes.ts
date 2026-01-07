// Import the pre-configured Axios instance
// This usually contains baseURL, headers, interceptors, etc.
import api from "./api";    

// ------------------------------
// Get ALL shoes from backend
// ------------------------------
export const getAllShoes = async () => {
    try {
        // Send a GET request to "/shoes"
        // This should return a list of all shoes
        const response = await api.get("/shoes");

        // Return only the response data (actual shoe list)
        return response.data;
    } catch (error) {
        // Log error if request fails
        console.error("Error fetching shoes:", error);

        // Re-throw error so the calling component can handle it
        throw error;
    }
};

// ------------------------------
// Get ONE shoe by ID
// ------------------------------
export const getShoeById = async (shoeId: number) => {
    try {
        // Send a GET request with shoe ID as URL parameter
        // Example: /shoes/5
        const response = await api.get(`/shoes/${shoeId}`);

        // Return shoe data
        return response.data;
    } catch (error) {
        // Log error with specific shoe ID
        console.error(`Error fetching shoe with id ${shoeId}:`, error);

        // Re-throw error
        throw error;
    }
};

// ------------------------------
// Update shoe details (mainly quantity)
// ------------------------------
export const updateShoeQuantity = async (
    shoeId: number,
    updatedShoe: {
        // Optional fields — only sent if provided
        name?: string;
        size?: string;
        quntity?: number;
        price?: number;
        brand?: string;
    }
) => {
    try {
        // Send PUT request to update shoe by ID
        // updatedShoe object is sent as request body
        const response = await api.put(`/shoes/${shoeId}`, updatedShoe);

        // Return updated shoe data from backend
        return response.data;
    } catch (error) {
        // Log error with shoe ID
        console.error(`Error updating shoe with id ${shoeId}:`, error);

        // Re-throw error
        throw error;
    }
};

// ------------------------------
// Delete a shoe by ID
// ------------------------------
export const deleteShoe = async (shoeId: number) => {
    try {
        // Send DELETE request to backend
        const response = await api.delete(`/shoes/${shoeId}`);

        // Backend usually returns 204 (No Content) on successful delete
        // This returns true if delete was successful
        return response.status === 204;
    } catch (error) {
        // Log error with shoe ID
        console.error(`Error deleting shoe with id ${shoeId}:`, error);

        // Re-throw error
        throw error;
    }
};
