import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import LocationInput from './LocationInput';

function CreateMarker({ userLocation, locationError, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    latitude: userLocation?.latitude || '',
    longitude: userLocation?.longitude || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Vui lòng nhập tiêu đề';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Vui lòng mô tả tình hình';
    }
    
    if (!formData.latitude || !formData.longitude) {
      newErrors.location = 'Vui lòng cung cấp vị trí';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Tạo điểm cảnh báo</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="create-marker-form">
          {locationError && (
            <div className="alert alert-warning">
              ⚠️ {locationError}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">Tiêu đề *</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="VD: Ngập nặng đường Lê Duẩn"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả tình hình *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Mô tả chi tiết về tình trạng ngập lụt..."
              rows={4}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <ImageUpload
            images={formData.images}
            onChange={(images) => handleChange('images', images)}
          />

          <LocationInput
            latitude={formData.latitude}
            longitude={formData.longitude}
            hasGPS={!!userLocation}
            error={errors.location}
            onChange={(lat, lng) => {
              handleChange('latitude', lat);
              handleChange('longitude', lng);
            }}
          />

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Đăng cảnh báo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateMarker;