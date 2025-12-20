import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./lib/Providers/AuthProvider.jsx";
import router from "./routes/index.jsx";
import { store } from "./redux/store.js";
import { SocketProvider } from "./providers/socketProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <SocketProvider>
          <RouterProvider router={router} />
          <Toaster />
        </SocketProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
