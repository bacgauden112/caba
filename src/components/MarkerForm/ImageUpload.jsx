import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

function ImageUpload({ images, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    setUploading(true);

    try {
      const compressedImages = await Promise.all(
        files.map(async (file) => {
          // Compress image
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          };
          
          const compressedFile = await imageCompression(file, options);
          
          // Convert to base64 for preview and storage
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(compressedFile);
          });
        })
      );

      onChange([...images, ...compressedImages]);
    } catch (error) {
      alert('Lỗi khi tải ảnh: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="form-group">
      <label>Hình ảnh</label>
      
      <div className="image-upload-container">
        {images.map((img, idx) => (
          <div key={idx} className="image-preview">
            <img src={img} alt={`Preview ${idx + 1}`} />
            <button
              type="button"
              className="remove-image-btn"
              onClick={() => removeImage(idx)}
            >
              &times;
            </button>
          </div>
        ))}

        {images.length < 5 && (
          <label className="image-upload-btn">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              disabled={uploading}
              style={{ display: 'none' }}
            />
            <div className="upload-placeholder">
              {uploading ? '⏳ Đang tải...' : '+ Thêm ảnh'}
            </div>
          </label>
        )}
      </div>
      
      <small className="form-hint">
        Tối đa 5 ảnh, mỗi ảnh tối đa 1MB
      </small>
    </div>
  );
}

export default ImageUpload;