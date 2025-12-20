import baseApi from "../../api/baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/api/v1/contact/all`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["contact"],
    }),

    getContactDetails: builder.query({
      query: (id) => ({
        url: `/api/v1/contact/single/${id}`,
        method: "GET",
      }),
      providesTags: ["contact"],
    }),
  }),
});

export const { useGetContactsQuery, useGetContactDetailsQuery } = contactApi;
