import React, { createContext, useContext, useEffect, useState } from "react";
import {
  initSocket,
  disconnectSocket,
  getOnlineUsers,
  addOnlineStatusListener,
} from "./../socket/socket";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  useEffect(() => {
    let unsubscribeOnline = null;

    // Initialize socket
    initSocket()
      .then((sock) => {
        setSocket(sock);
        setIsConnected(true);

        // Set initial online users
        setOnlineUsers(getOnlineUsers());

        // Subscribe to online status changes
        unsubscribeOnline = addOnlineStatusListener(() => {
          setOnlineUsers(new Set(getOnlineUsers())); // update state on change
        });

        // Optional: handle disconnect/reconnect events
        sock.on("connect", () => setIsConnected(true));
        sock.on("disconnect", () => setIsConnected(false));
      })
      .catch((err) => console.error("Socket init failed:", err));

    // Cleanup on unmount
    return () => {
      if (unsubscribeOnline) unsubscribeOnline();
      disconnectSocket();
      setSocket(null);
      setIsConnected(false);
      setOnlineUsers(new Set());
    };
  }, []);

  const value = {
    socket,
    isConnected,
    onlineUsers,
    waitForSocket: () => {
      if (socket) return Promise.resolve(socket);
      return Promise.reject(new Error("Socket not initialized"));
    },
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

// Hook to use socket anywhere
export const useSocket = () => useContext(SocketContext);
