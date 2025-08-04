import { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000");

export default function Teacher() {
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const createPoll = () => {
    const poll = {
      id: Date.now(),
      question,
      options,
      active: false,
      votes: Array(options.length).fill(0),
    };
    setPolls([...polls, poll]);
    socket.emit('createPoll', poll);
    setQuestion('');
    setOptions(['', '']);
  };

  const togglePoll = (id) => {
    const updatedPolls = polls.map((poll) =>
      poll.id === id ? { ...poll, active: !poll.active } : poll
    );
    setPolls(updatedPolls);
    const poll = updatedPolls.find(p => p.id === id);
    socket.emit('togglePoll', poll);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">Teacher Dashboard</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Poll Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
            className="w-full border p-2 rounded"
          />
        ))}
        <button
          onClick={() => setOptions([...options, ''])}
          className="text-blue-500 underline"
        >
          + Add option
        </button>
        <button
          onClick={createPoll}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Poll
        </button>
      </div>

      <hr className="my-6" />

      <h3 className="text-2xl font-semibold mb-4">Your Polls</h3>
      {polls.map((poll) => (
        <div key={poll.id} className="mb-4 p-4 border rounded">
          <h4 className="text-lg font-semibold">{poll.question}</h4>
          <ul className="list-disc pl-5">
            {poll.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
          <button
            onClick={() => togglePoll(poll.id)}
            className={`mt-2 px-4 py-1 rounded ${
              poll.active ? 'bg-red-600' : 'bg-green-600'
            } text-white`}
          >
            {poll.active ? 'Stop' : 'Start'} Poll
          </button>
        </div>
      ))}
    </div>
  );
}
