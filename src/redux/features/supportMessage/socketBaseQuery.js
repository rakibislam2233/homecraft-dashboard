import { initSocket } from "../../../socket/socketClient";

export const socketBaseQuery =
  () =>
  async ({ event, data }) => {
    try {
      const socket = initSocket();

      const response = await new Promise((resolve, reject) => {
        socket.emit(event, data ?? {}, (res) => {
          if (res?.success) {
            resolve(res.data);
          } else {
            reject(res?.message || "Socket request failed");
          }
        });
      });

      return { data: response };
    } catch (error) {
      return {
        error: {
          status: "SOCKET_ERROR",
          error: error,
        },
      };
    }
  };
