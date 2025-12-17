import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // credentials: "include",
    // prepareHeaders: (headers) => {
    //   const token = localStorage.getItem("token");
    //   headers.set("Authorization", `Bearer ${token}`);
    //   return headers;
    // },

    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      //console.log(getState().auth.token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("X-Custom-Header", "foobar");
      return headers;
    },
  }),
  tagTypes: [
    "auth",
    "dashboard",
    "international",
    "jobs",
    "contact",
    "upload",
    "value",
    "blogs",
    "settings",
  ],
  endpoints: () => ({}),
});

export default baseApi;
