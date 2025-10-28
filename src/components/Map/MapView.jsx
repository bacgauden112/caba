import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerPopup from './MarkerPopup';

// Fix icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon cho điểm cảnh báo
const floodIcon = new L.Icon({
  iconUrl: '/icons/flood-marker.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const userIcon = new L.Icon({
  iconUrl: '/icons/user-location.png',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

function MapView({ markers, userLocation, onMarkerUpdate }) {
  const defaultCenter = [16.0544, 108.2022]; // Đà Nẵng, Vietnam
  const defaultZoom = 13;

  return (
    <MapContainer
      center={userLocation ? [userLocation.latitude, userLocation.longitude] : defaultCenter}
      zoom={defaultZoom}
      style={{ height: '100vh', width: '100%' }}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
  );
}

export default MapView;