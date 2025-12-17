// import baseApi from "../../api/baseApi";

// export const blogApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // all beautician
//     getBlogs: builder.query({
//       query: ({ page = 1, limit = 10 }) => ({
//         url: `/blog/all`,
//         method: "GET",
//         params: {
//           page,
//           limit,
//         },
//       }),
//       providesTags: ["blogs"],
//     }),
//     // get beautician by id
//     getBlogDetails: builder.query({
//       query: (id) => ({
//         url: `/blog/single/${id}`,
//         method: "GET",
//       }),
//       providesTags: ["blogs"],
//     }),

//     // -------------
//     // post jobs
//     postBlog: builder.mutation({
//       query: (blogData) => ({
//         url: "/blog/create",
//         method: "POST",
//         body: blogData,
//       }),
//       invalidatesTags: ["blogs"],
//     }),
//     // update jobs
//     updateBlog: builder.mutation({
//       query: ({ id, blogData }) => ({
//         url: `/blog/edit/${id}`,
//         method: "POST",
//         body: blogData,
//       }),
//       invalidatesTags: ["blogs"],
//     }),

//     deleteBlog: builder.mutation({
//       query: ({ id }) => ({
//         url: `/blog/delete/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["blogs"],
//     }),
//   }),
// });

// export const {
//   useGetBlogsQuery,
//   useGetBlogDetailsQuery,
//   usePostBlogMutation,
//   useUpdateBlogMutation,
//   useDeleteBlogMutation,
// } = blogApi;

import baseApi from "../../api/baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/blog/all`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["blogs"],
    }),

    getBlogDetails: builder.query({
      query: (id) => ({
        url: `/blog/single/${id}`,
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),

    postBlog: builder.mutation({
      query: (blogData) => ({
        url: "/blog/create",
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: ["blogs"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, blogData }) => ({
        url: `/blog/edit/${id}`,
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: ["blogs"],
    }),

    deleteBlog: builder.mutation({
      query: ({ id }) => ({
        url: `/blog/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogDetailsQuery,
  usePostBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
