import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getAllEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/events`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getEventsByCategory = async (category) => {
    try {
        const response = await axios.get(`${API_URL}/events/category/${category}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(`${API_URL}/events`, eventData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
