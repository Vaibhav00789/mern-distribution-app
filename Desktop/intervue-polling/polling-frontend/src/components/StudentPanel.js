import React, { useEffect, useState } from 'react';
import { socket } from '../socket';

function StudentPanel() {
  const [name, setName] = useState('');
  const [joined, setJoined] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [results, setResults] = useState(null);

  useEffect(() => {
    socket.on("new_question", (data) => {
      setCurrentQuestion(data);
      setSelectedOption('');
      setResults(null);
    });

    socket.on("poll_results", (data) => {
      setResults(data);
    });
  }, []);

  const joinPoll = () => {
    if (!name) return;
    socket.emit("student_joined", name);
    setJoined(true);
  };

  const submitAnswer = () => {
    socket.emit("submit_answer", {
      student: name,
      answer: selectedOption
    });
  };

  return (
    <div>
      {!joined ? (
        <>
          <h2>Enter Your Name</h2>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={joinPoll}>Join</button>
        </>
      ) : (
        <>
          <h2>Welcome, {name}!</h2>

          {currentQuestion ? (
            <>
              <h3>{currentQuestion.question}</h3>
              {currentQuestion.options.map((opt, idx) => (
                <div key={idx}>
                  <input
                    type="radio"
                    name="option"
                    value={opt}
                    checked={selectedOption === opt}
                    onChange={() => setSelectedOption(opt)}
                  />
                  {opt}
                </div>
              ))}
              <button onClick={submitAnswer}>Submit</button>
            </>
          ) : (
            <p>Waiting for question...</p>
          )}

          {results && (
            <div>
              <h3>Poll Results:</h3>
              <ul>
                {Object.entries(results).map(([name, answer]) => (
                  <li key={name}>{name} answered: {answer}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default StudentPanel;
