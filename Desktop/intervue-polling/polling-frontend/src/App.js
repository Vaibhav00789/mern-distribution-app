// src/App.js

import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import TeacherPanel from "./components/TeacherPanel";
import StudentPanel from "./components/StudentPanel";

function App() {
  const [socketId, setSocketId] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to server with ID:", socket.id);
      setSocketId(socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
      setSocketId(null);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="App" style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🎯 Live Polling System</h1>
      <p>🧠 Socket Connected: {socketId ? "Yes" : "No"}</p>
      <p>🔌 Socket ID: {socketId || "N/A"}</p>

      {!role && (
        <>
          <h2>Select Your Role</h2>
          <button onClick={() => setRole("teacher")} style={{ marginRight: "1rem" }}>
            I'm Teacher
          </button>
          <button onClick={() => setRole("student")}>
            I'm Student
          </button>
        </>
      )}

      {role === "teacher" && <TeacherPanel />}
      {role === "student" && <StudentPanel />}
    </div>
  );
}

export default App;
