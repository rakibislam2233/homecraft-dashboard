import { getSocket } from "./socket";

export const fetchSupportConversationList = (params = {}) => {
  return new Promise((resolve, reject) => {
    const socket = getSocket();
    if (!socket) return reject("Socket not connected");

    socket.emit(
      "admin-support-conversation-list",
      {
        page: params.page || 1,
        limit: params.limit || 50,
        searchTerm: params.searchTerm || "",
      },
      (response) => {
        response.success ? resolve(response.data) : reject(response.message);
      }
    );
  });
};

// Messages by conversation
export const fetchSupportMessages = (conversationId, params = {}) => {
  return new Promise((resolve, reject) => {
    const socket = getSocket();
    if (!socket) return reject("Socket not connected");

    socket.emit(
      "get-support-messages",
      {
        conversationId,
        page: params.page || 1,
        limit: params.limit || 50,
      },
      (response) => {
        response.success ? resolve(response.data) : reject(response.message);
      }
    );
  });
};

// Admin reply message
export const adminReplySupportMessage = (payload) => {
  return new Promise((resolve, reject) => {
    const socket = getSocket();
    if (!socket) return reject("Socket not connected");

    socket.emit("admin-reply-support-message", payload, (response) => {
      response.success ? resolve(response.data) : reject(response.message);
    });
  });
};
