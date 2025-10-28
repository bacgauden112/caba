import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get all markers
export const getMarkers = async () => {
  try {
    const response = await api.get('/markers');
    return response.data;
  } catch (error) {
    // Fallback to localStorage if API fails
    const cached = localStorage.getItem('markers');
    return cached ? JSON.parse(cached) : [];
  }
};

// Create new marker
export const createMarker = async (markerData) => {
  try {
    const response = await api.post('/markers', markerData);
    
    // Also save to localStorage
    const cached = localStorage.getItem('markers');
    const markers = cached ? JSON.parse(cached) : [];
    const newMarker = { ...markerData, id: response.data.id || Date.now() };
    localStorage.setItem('markers', JSON.stringify([newMarker, ...markers]));
    
    return newMarker;
  } catch (error) {
    // Fallback to localStorage only
    const cached = localStorage.getItem('markers');
    const markers = cached ? JSON.parse(cached) : [];
    const newMarker = { ...markerData, id: Date.now() };
    localStorage.setItem('markers', JSON.stringify([newMarker, ...markers]));
    return newMarker;
  }
};

// Update marker
export const updateMarker = async (markerId, updates) => {
  try {
    const response = await api.patch(`/markers/${markerId}`, updates);
    
    // Update localStorage
    const cached = localStorage.getItem('markers');
    if (cached) {
      const markers = JSON.parse(cached);
      const updated = markers.map(m =>
        m.id === markerId ? { ...m, ...updates } : m
      );
      localStorage.setItem('markers', JSON.stringify(updated));
    }
    
    return response.data;
  } catch (error) {
    // Fallback to localStorage
    const cached = localStorage.getItem('markers');
    if (cached) {
      const markers = JSON.parse(cached);
      const updated = markers.map(m =>
        m.id === markerId ? { ...m, ...updates } : m
      );
      localStorage.setItem('markers', JSON.stringify(updated));
      return updated.find(m => m.id === markerId);
    }
    throw error;
  }
};