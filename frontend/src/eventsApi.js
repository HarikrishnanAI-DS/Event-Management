import React from "react";
import axios from "axios";

const baseURL = "http://localhost:5000/api";

// Get all events
export const getAllEvents = async () => {
    try {
        const response = await axios.get(`${baseURL}/events`);
        return response.data;
    } catch (error) {
        console.error('Error in getAllEvents:', error);
        throw error;
    }
};

// Get event by ID
export const getEventById = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/events/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error in getEventById:', error);
        throw error;
    }
};

// Add new event
export const addEvent = async (eventData) => {
    try {
        const response = await axios.post(`${baseURL}/events`, eventData);
        return response.data;
    } catch (error) {
        console.error('Error in addEvent:', error);
        throw error;
    }
};

// Update event
export const updateEvent = async (id, eventData) => {
    try {
        const response = await axios.put(`${baseURL}/events/${id}`, eventData);
        return response.data;
    } catch (error) {
        console.error('Error in updateEvent:', error);
        throw error;
    }
};

// Delete event
export const deleteEvent = async (id) => {
    try {
        const response = await axios.delete(`${baseURL}/events/${id}`);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error('Failed to delete event');
    } catch (error) {
        console.error('Error in deleteEvent:', error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        }
        throw error;
    }
};

// Book event
export const bookEvent = async (id, bookingData) => {
    try {
        const response = await axios.post(`${baseURL}/events/${id}/book`, bookingData);
        return response.data;
    } catch (error) {
        console.error('Error in bookEvent:', error);
        throw error;
    }
};
