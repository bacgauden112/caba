import { useState, useEffect } from 'react';
import { getMarkers, createMarker, updateMarker as apiUpdateMarker } from '../services/api';

export const useMarkers = () => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load markers on mount
  useEffect(() => {
    loadMarkers();
  }, []);

  const loadMarkers = async () => {
    try {
      setLoading(true);
      const data = await getMarkers();
      setMarkers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addMarker = async (markerData) => {
    try {
      const newMarker = await createMarker(markerData);
      setMarkers(prev => [newMarker, ...prev]);
      return newMarker;
    } catch (err) {
      throw new Error('Không thể tạo điểm cảnh báo: ' + err.message);
    }
  };

  const updateMarker = async (markerId, updates) => {
    try {
      const updated = await apiUpdateMarker(markerId, updates);
      setMarkers(prev =>
        prev.map(marker =>
          marker.id === markerId ? { ...marker, ...updated } : marker
        )
      );
      return updated;
    } catch (err) {
      throw new Error('Không thể cập nhật: ' + err.message);
    }
  };

  return {
    markers,
    loading,
    error,
    addMarker,
    updateMarker,
    refresh: loadMarkers
  };
};