import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000");

export default function Student() {
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    socket.on('activePoll', setPoll);
    socket.on('pollEnded', setShowResults);
    return () => {
      socket.off('activePoll');
      socket.off('pollEnded');
    };
  }, []);

  const submitVote = () => {
    if (selected !== null && poll) {
      socket.emit('vote', { pollId: poll.id, optionIndex: selected });
      setShowResults(true);
    }
  };

  if (!poll || !poll.active) return <p className="text-center mt-10">Waiting for poll to start...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{poll.question}</h2>
      <div className="space-y-3">
        {poll.options.map((opt, i) => (
          <div key={i}>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="option"
                value={i}
                onChange={() => setSelected(i)}
              />
              {opt}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={submitVote}
        disabled={selected === null}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit Vote
      </button>
    </div>
  );
}
