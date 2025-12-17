import baseApi from "../../api/baseApi";

export const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // client page
    getEarningHistory: builder.query({
      query: ({ page = 1, limit = 10, name, date }) => ({
        url: "/payment/history",
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
        url: "/charge",
        method: "GET",
      }),
      providesTags: ["earning"],
    }),
    // charge/update

    //  edit category
    updateSessionCharge: builder.mutation({
      query: (data) => ({
        url: `/charge/update`,
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
