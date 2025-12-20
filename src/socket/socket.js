import { io } from "socket.io-client";

const socketUrl = `${import.meta.env.VITE_SERVER_URL}`;

let socket;
let onlineUsers = new Set();
let connectionListeners = [];
let onlineStatusListeners = [];
let socketReadyPromise = null;

export const initSocket = () => {
  if (socket) return Promise.resolve(socket); // Already connected

  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("Socket not initialized: no token found in localStorage");
    return Promise.reject(new Error("No token found"));
  }

  socket = io(socketUrl, {
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
  });

  socketReadyPromise = new Promise((resolve, reject) => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      notifyConnectionListeners(true);
      resolve(socket);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
      reject(err);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      notifyConnectionListeners(false);
    });
  });

  // Online status tracking
  socket.on("user:online", (data) => {
    const { userId, isOnline } = data;
    if (isOnline) onlineUsers.add(userId);
    else onlineUsers.delete(userId);
    notifyOnlineStatusListeners(userId, isOnline, data.userProfile);
  });

  return socketReadyPromise;
};

export const getSocket = () => {
  if (!socket)
    throw new Error("Socket not connected. Call initSocket() first.");
  return socket;
};

export const waitForSocket = () => {
  if (socketReadyPromise) return socketReadyPromise;
  return Promise.reject(new Error("Socket not initialized"));
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    onlineUsers.clear();
    socketReadyPromise = null;
  }
};

// Connection listeners
const notifyConnectionListeners = (isConnected, reason = null) => {
  connectionListeners.forEach((listener) => {
    if (listener.onConnectionChange) {
      listener.onConnectionChange(isConnected, reason);
    }
  });
};

export const addConnectionListener = (listener) => {
  connectionListeners.push(listener);
  return () => {
    connectionListeners = connectionListeners.filter((l) => l !== listener);
  };
};

// Online status listeners
const notifyOnlineStatusListeners = (userId, isOnline, userProfile) => {
  onlineStatusListeners.forEach((listener) => {
    listener(userId, isOnline, userProfile);
  });
};

export const addOnlineStatusListener = (listener) => {
  onlineStatusListeners.push(listener);
  return () => {
    onlineStatusListeners = onlineStatusListeners.filter((l) => l !== listener);
  };
};

// Current online users
export const getOnlineUsers = () => new Set(onlineUsers);
export const isUserOnline = (userId) => onlineUsers.has(userId);
