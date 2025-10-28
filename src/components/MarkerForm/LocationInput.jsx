import React, { useState } from 'react';

function LocationInput({ latitude, longitude, hasGPS, error, onChange }) {
  const [manualMode, setManualMode] = useState(!hasGPS);

  return (
    <div className="form-group">
      <label>Vị trí *</label>
      
      <div className="location-input-container">
        {hasGPS && !manualMode ? (
          <div className="location-auto">
            <div className="location-info">
              <span className="location-icon">📍</span>
              <div>
                <div className="location-coords">
                  {latitude.toFixed(6)}, {longitude.toFixed(6)}
                </div>
                <small>Vị trí được xác định tự động</small>
              </div>
            </div>
            <button
              type="button"
              className="btn-link"
              onClick={() => setManualMode(true)}
            >
              Nhập thủ công
            </button>
          </div>
        ) : (
          <div className="location-manual">
            <div className="location-inputs">
              <input
                type="number"
                step="any"
                placeholder="Vĩ độ (latitude)"
                value={latitude}
                onChange={(e) => onChange(parseFloat(e.target.value), longitude)}
                className={error ? 'error' : ''}
              />
              <input
                type="number"
                step="any"
                placeholder="Kinh độ (longitude)"
                value={longitude}
                onChange={(e) => onChange(latitude, parseFloat(e.target.value))}
                className={error ? 'error' : ''}
              />
            </div>
            <small className="form-hint">
              💡 Mẹo: Bạn có thể lấy tọa độ từ Google Maps
            </small>
          </div>
        )}
      </div>
      
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default LocationInput;