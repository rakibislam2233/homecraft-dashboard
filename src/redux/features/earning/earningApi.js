import baseApi from "../../api/baseApi";

export const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // client page
    getEarningHistory: builder.query({
      query: ({ page = 1, limit = 10, name, date }) => ({
        url: "/api/v1/payment/history",
        method: "GET",
        params: {
          page,
          limit,
          name,
          date,
        },
      }),
      providesTags: ["earning"],
    }),

    getSessionCharge: builder.query({
      query: () => ({
        url: "/api/v1/charge",
        method: "GET",
      }),
      providesTags: ["earning"],
    }),
    // charge/update

    //  edit category
    updateSessionCharge: builder.mutation({
      query: (data) => ({
        url: `/api/v1/charge/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["earning"],
    }),
  }),
});

export const {
  useGetEarningHistoryQuery,
  useGetSessionChargeQuery,
  useUpdateSessionChargeMutation,
} = earningApi;
