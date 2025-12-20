import baseApi from "../../api/baseApi";

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get banner
    getAllBanner: builder.query({
      query: () => ({
        url: "/api/v1/banner",
        method: "GET",
      }),
      providesTags: ["banner"],
    }),

    //  add category
    addBanner: builder.mutation({
      query: (addBannerData) => ({
        url: "/api/v1/banner/create",
        method: "POST",
        body: addBannerData,
      }),
      invalidatesTags: ["banner"],
    }),

    //  edit category
    editBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/banner/update?id=${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["banner"],
    }),

    // New delete community endpoint
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/api/v1/banner/delete?id=${id}`,
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
