import React, { useState } from 'react';
import { socket } from '../socket';

function TeacherPanel() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [results, setResults] = useState(null);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSendQuestion = () => {
    socket.emit("create_question", {
      question,
      options
    });
    setResults(null); // clear old results
    setQuestion('');
    setOptions(['', '', '', '']);
  };

  // Listen for poll results
  socket.on("poll_results", (data) => {
    setResults(data);
  });

  return (
    <div>
      <h2>Teacher Panel</h2>
      <input
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <br />
      {options.map((opt, idx) => (
        <input
          key={idx}
          type="text"
          placeholder={`Option ${idx + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(idx, e.target.value)}
        />
      ))}
      <br />
      <button onClick={handleSendQuestion}>Send Question</button>

      {results && (
        <div>
          <h3>Results:</h3>
          <ul>
            {Object.entries(results).map(([name, answer]) => (
              <li key={name}>{name} answered: {answer}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TeacherPanel;
