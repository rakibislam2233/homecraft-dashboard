import baseApi from "../../api/baseApi";

export const valueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get value
    getValue: builder.query({
      query: (value) => ({
        url: `/value/all/${value}`,
        method: "GET",
        // params: {
        //   value,
        // },
      }),
      providesTags: ["value"],
    }),

    //  add
    addValue: builder.mutation({
      query: ({ value, jobData }) => ({
        url: `/value/create/${value}`,
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["value"],
    }),
    //  update
    updateValue: builder.mutation({
      query: ({ id, value, jobData }) => ({
        url: `/value/update/${value}/${id}`,
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["value"],
    }),

    // delete
    deleteValue: builder.mutation({
      query: ({ id }) => ({
        url: `/value/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["value"],
    }),
  }),
});

export const {
  useGetValueQuery,
  useAddValueMutation,
  useUpdateValueMutation,
  useDeleteValueMutation,
} = valueApi;
