import baseApi from "../../api/baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/contact/all`,
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
        url: `/contact/single/${id}`,
        method: "GET",
      }),
      providesTags: ["contact"],
    }),
  }),
});

export const { useGetContactsQuery, useGetContactDetailsQuery } = contactApi;
