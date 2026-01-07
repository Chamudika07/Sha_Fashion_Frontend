import api from "./api";


export const getAllFrocks = async () => {
    try {
        const response = await api.get("/frocks");
        return response.data;
    } catch (error) {
        console.error("Error fetching frocks:", error);
        throw error;
    }
}