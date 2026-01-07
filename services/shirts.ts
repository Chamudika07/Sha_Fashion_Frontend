import api from "./api";

export const getAllShirts = async () => {
    try {
        const response = await api.get("/shirts");
        return response.data;
    } catch (error) {
        console.error("Error fetching shirts:", error);
        throw error;
    }
};