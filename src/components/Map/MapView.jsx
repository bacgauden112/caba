import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerPopup from "./MarkerPopup";

// Fix icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component để xử lý zoom tới vị trí
function LocationControls({ userLocation, onRequestLocation }) {
  const map = useMap();

  const zoomToUserLocation = () => {
    if (userLocation) {
      map.flyTo([userLocation.latitude, userLocation.longitude], 16, {
        duration: 1.5,
      });
    } else {
      onRequestLocation();
    }
  };

  return (
    <div className="location-controls">
      <button
        className="location-btn"
        onClick={zoomToUserLocation}
        title={userLocation ? "Zoom tới vị trí của bạn" : "Xác định vị trí"}
      >
        <span className="location-icon">📍</span>
      </button>
    </div>
  );
}

// Fix icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icon cho điểm cảnh báo
const floodIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userIcon = new L.Icon({
  iconUrl:
    "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapView({ markers, userLocation, onMarkerUpdate, onRequestLocation }) {
  const defaultCenter = [16.0544, 108.2022]; // Đà Nẵng, Vietnam
  const defaultZoom = 13;

  return (
    <div className="map-wrapper">
      <MapContainer
        center={
          userLocation
            ? [userLocation.latitude, userLocation.longitude]
            : defaultCenter
        }
        zoom={defaultZoom}
        style={{ height: "100%", width: "100%" }}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Location Controls */}
        <LocationControls
          userLocation={userLocation}
          onRequestLocation={onRequestLocation}
        />

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={userIcon}
          >
            <Popup>Vị trí của bạn</Popup>
          </Marker>
        )}

        {/* Flood warning markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
            icon={floodIcon}
          >
            <MarkerPopup marker={marker} onUpdate={onMarkerUpdate} />
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
