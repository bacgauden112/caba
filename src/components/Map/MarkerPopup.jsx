import React from 'react';
import { Popup } from 'react-leaflet';
import VoteButton from '../Interaction/VoteButton';
import CommentSection from '../Interaction/CommentSection';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

function MarkerPopup({ marker, onUpdate }) {
  return (
    <Popup className="marker-popup" maxWidth={300}>
      <div className="popup-content">
        <h3>{marker.title || 'Cảnh báo ngập lụt'}</h3>
        
        {marker.images && marker.images.length > 0 && (
          <div className="popup-images">
            {marker.images.map((img, idx) => (
              <img key={idx} src={img} alt={`Ảnh ${idx + 1}`} />
            ))}
          </div>
        )}
        
        <p className="popup-description">{marker.description}</p>
        
        <div className="popup-meta">
          <span className="popup-time">
            {formatDistanceToNow(new Date(marker.timestamp), { 
              addSuffix: true,
              locale: vi 
            })}
          </span>
          <span className="popup-location">
            📍 {marker.latitude.toFixed(4)}, {marker.longitude.toFixed(4)}
          </span>
        </div>

        <VoteButton 
          markerId={marker.id}
          initialVotes={marker.votes || 0}
          onVote={(newVotes) => onUpdate(marker.id, { votes: newVotes })}
        />

        <CommentSection 
          markerId={marker.id}
          comments={marker.comments || []}
          onAddComment={(comment) => {
            const updatedComments = [...(marker.comments || []), comment];
            onUpdate(marker.id, { comments: updatedComments });
          }}
        />
      </div>
    </Popup>
  );
}

export default MarkerPopup;