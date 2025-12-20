import { baseApi } from "./../../api/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/v1/categories",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["categories"],
    }),

    addCategory: builder.mutation({
      query: (formData) => ({
        url: "/api/v1/categories",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["categories"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/v1/categories/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["categories"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/v1/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
