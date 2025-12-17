import baseApi from "../../api/baseApi";

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get banner
    getAllBanner: builder.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
      providesTags: ["banner"],
    }),

    //  add category
    addBanner: builder.mutation({
      query: (addBannerData) => ({
        url: "/banner/create",
        method: "POST",
        body: addBannerData,
      }),
      invalidatesTags: ["banner"],
    }),

    //  edit category
    editBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/banner/update?id=${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["banner"],
    }),

    // New delete community endpoint
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/delete?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetAllBannerQuery,
  useAddBannerMutation,
  useEditBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
