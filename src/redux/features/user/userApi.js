import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // user list
    getAllUser: builder.query({
      query: ({ page = 1, limit = 10, searchTerm, date }) => ({
        url: `/api/v1/users/clients`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm,
          date,
        },
      }),
      providesTags: ["user"],
    }),

    getAllProfessionals: builder.query({
      query: ({ page = 1, limit = 10, searchTerm, date }) => ({
        url: `/api/v1/users/professionals`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm,
          date,
        },
      }),
      providesTags: ["user"],
    }),

    getProfessionalDetails: builder.query({
      query: (id) => ({
        url: `/api/v1/users/professionals/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // review give api
    giveReview: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/reviews",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["jobs"],
    }),

    // Fetch currently logged-in user's data
    getUserData: builder.query({
      query: () => ({
        url: "/api/v1/users/profile/me",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    // Update user data
    updateUserData: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    adminNotification: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            params.append(key, value);
          });
        }
        return {
          url: "notification",
          method: "GET",
          params,
        };
      },
      providesTags: ["transaction", "user"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetAllProfessionalsQuery,
  useGetProfessionalDetailsQuery,
  useGiveReviewMutation,
  useGetUserDataQuery,
  useUpdateUserDataMutation,
  useAdminNotificationQuery,
} = userApi;
