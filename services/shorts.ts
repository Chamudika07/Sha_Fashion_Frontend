import api from "./api";

export const getAllShorts = async () => {
    try {
        const response = await api.get("/shorts");
        return response.data;
    } catch (error) {
        console.error("Error fetching shorts:", error);
        throw error;
    }
}