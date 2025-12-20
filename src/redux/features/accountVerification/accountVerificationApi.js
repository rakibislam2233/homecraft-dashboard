import baseApi from "../../api/baseApi";

export const accountVerificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUnverifiedProfessionals: builder.query({
      query: ({ page = 1, limit = 10, month, searchTerm }) => ({
        url: "/api/v1/users/unverified-professionals",
        method: "GET",
        params: {
          page,
          limit,
          ...(month && { month }),
          ...(searchTerm && { searchTerm }),
        },
      }),
      providesTags: ["unverifiedProfessionals"],
    }),

    verifyProfessional: builder.mutation({
      query: (id) => ({
        url: `/api/v1/users/verify-professional/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["unverifiedProfessionals"],
    }),

    rejectProfessional: builder.mutation({
      query: (id) => ({
        url: `/api/v1/users/rejectProfessional/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["unverifiedProfessionals"],
    }),
  }),
});

export const {
  useGetUnverifiedProfessionalsQuery,
  useVerifyProfessionalMutation,
  useRejectProfessionalMutation,
} = accountVerificationApi;
