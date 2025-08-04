import { useNavigate } from "react-router-dom";
import frameImg from "../assets/frame.png";
import questionImg from "../assets/question.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-white text-gray-800">
      {/* Figma Logo Image */}
      <img
        src={frameImg}
        alt="App Logo"
        className="w-28 h-28 mb-4"
      />

      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        Live Polling System
      </h1>

      {/* Decorative Figma Image below the heading */}
      <img
        src={questionImg}
        alt="Illustration"
        className="w-64 md:w-96 mb-6"
      />

      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => navigate("/teacher")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl text-lg shadow-md transition"
        >
          I am a Teacher
        </button>

        <button
          onClick={() => navigate("/student")}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl text-lg shadow-md transition"
        >
          I am a Student
        </button>
      </div>
    </div>
  );
}
