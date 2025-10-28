import React, { useState } from 'react';

function VoteButton({ markerId, initialVotes, onVote }) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(() => {
    // Check if user has voted before (from localStorage)
    const voted = localStorage.getItem(`voted_${markerId}`);
    return voted === 'true';
  });

  const handleVote = () => {
    if (hasVoted) {
      alert('Bạn đã vote cho điểm này rồi!');
      return;
    }

    const newVotes = votes + 1;
    setVotes(newVotes);
    setHasVoted(true);
    localStorage.setItem(`voted_${markerId}`, 'true');
    onVote(newVotes);
  };

  return (
    <div className="vote-container">
      <button
        className={`vote-btn ${hasVoted ? 'voted' : ''}`}
        onClick={handleVote}
        disabled={hasVoted}
      >
        👍 {votes}
      </button>
      {hasVoted && <span className="vote-label">Đã vote</span>}
    </div>
  );
}

export default VoteButton;