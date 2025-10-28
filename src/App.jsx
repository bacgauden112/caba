import React, { useState } from "react";
import MapView from "./components/Map/MapView";
import CreateMarker from "./components/MarkerForm/CreateMarker";
import Header from "./components/Layout/Header";
import { useGeolocation } from "./hooks/useGeolocation";
import { useMarkers } from "./hooks/useMarkers";
import "./styles/global.css";

function App() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { location, error: locationError, requestLocation } = useGeolocation();
  const { markers, addMarker, updateMarker, loading } = useMarkers();

  const handleCreateMarker = async (markerData) => {
    try {
      const newMarker = await addMarker({
        ...markerData,
        latitude: location?.latitude || markerData.latitude,
        longitude: location?.longitude || markerData.longitude,
        timestamp: new Date().toISOString(),
      });
      setShowCreateForm(false);
      alert("Đã tạo điểm cảnh báo thành công!");
    } catch (error) {
      alert("Lỗi khi tạo điểm cảnh báo: " + error.message);
    }
  };

  return (
    <div className="app">
      <Header />

      <div className="main-container">
        <MapView
          markers={markers}
          userLocation={location}
          onMarkerUpdate={updateMarker}
          onRequestLocation={requestLocation}
        />

        <button
          className="fab-button"
          onClick={() => setShowCreateForm(true)}
          aria-label="Tạo điểm cảnh báo mới"
        >
          +
        </button>

        {showCreateForm && (
          <CreateMarker
            userLocation={location}
            locationError={locationError}
            onSubmit={handleCreateMarker}
            onClose={() => setShowCreateForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
