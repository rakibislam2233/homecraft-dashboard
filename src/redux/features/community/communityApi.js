import baseApi from "../../api/baseApi";

export const communityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // all beautician
    getAllCommunity: builder.query({
      //   query: ({ page = 1, limit = 10 }) => ({
      query: () => ({
        url: `/community`,
        method: "GET",
        // params: {
        //   page,
        //   limit,
        // },
      }),
      providesTags: ["community"],
    }),
    // get beautician by id
    getCommunityById: builder.query({
      query: (communityId) => ({
        url: `/community/details?communityId=${communityId}`,
        method: "GET",
      }),
      providesTags: ["community"],
    }),

    // New delete community endpoint
    deleteCommunity: builder.mutation({
      query: (communityId) => ({
        url: `/community/delete?communityId=${communityId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["community"],
    }),
  }),
});

export const {
  useGetAllCommunityQuery,
  useGetCommunityByIdQuery,
  useDeleteCommunityMutation,
} = communityApi;
