import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

function CommentSection({ markerId, comments, onAddComment }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      alert('Vui lòng nhập tên của bạn');
      return;
    }
    
    if (!newComment.trim()) {
      alert('Vui lòng nhập nội dung bình luận');
      return;
    }

    const comment = {
      id: Date.now(),
      username: username.trim(),
      text: newComment.trim(),
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('username', username);
    onAddComment(comment);
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <button
        className="toggle-comments-btn"
        onClick={() => setShowComments(!showComments)}
      >
        💬 {comments.length} bình luận
      </button>

      {showComments && (
        <div className="comments-container">
          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments">Chưa có bình luận nào</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <strong>{comment.username}</strong>
                    <span className="comment-time">
                      {formatDistanceToNow(new Date(comment.timestamp), {
                        addSuffix: true,
                        locale: vi
                      })}
                    </span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSubmit} className="comment-form">
            <input
              type="text"
              placeholder="Tên của bạn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="comment-username-input"
            />
            <textarea
              placeholder="Viết bình luận..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={2}
              className="comment-input"
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Gửi
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CommentSection;