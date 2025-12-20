// import { initSocket } from "../../../socket/socketClient";

// export const socketBaseQuery =
//   () =>
//   async ({ event, data }, { dispatch }) => {
//     return new Promise((resolve, reject) => {
//       if (!window.socket) {
//         reject({ error: "Socket not connected" });
//         return;
//       }

//       window.socket.emit(event, data, (response) => {
//         if (response?.success === false) {
//           reject({ error: response.message });
//         } else {
//           resolve({ data: response });
//         }
//       });
//     });
//   };
