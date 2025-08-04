// src/socket.js

import { io } from "socket.io-client";

// Connect to backend socket server (port 5000)
export const socket = io("http://localhost:5000");
