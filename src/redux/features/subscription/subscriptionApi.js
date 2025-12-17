import baseApi from "../../api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/subscriptions",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["subscriptions"],
    }),

    createSubscription: builder.mutation({
      query: (payload) => ({
        url: "/subscriptions",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["subscriptions"],
    }),

    updateSubscription: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/subscriptions/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["subscriptions"],
    }),
  }),
});

export const {
  useGetSubscriptionsQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
} = subscriptionApi;
