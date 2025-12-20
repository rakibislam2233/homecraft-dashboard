import { io } from "socket.io-client";

let socket = null;

export const getSocket = () => socket;

export const initSocket = () => {
  if (socket) return socket;

  const token = localStorage.getItem("token");
 
  socket = io(import.meta.env.VITE_SOCKET_SERVER, {
    transports: ["websocket"],
    auth: {
      token, // for socket auth middleware
    },
    extraHeaders: {
      Authorization: `Bearer ${token}`, // fallback for server-side checks
    },
    reconnection: true,
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket error:", err.message);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
