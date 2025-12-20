import baseApi from "../../api/baseApi";

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  upload file
    uploadFile: builder.mutation({
      query: (uploadData) => ({
        url: "/api/v1/uploded",
        method: "POST",
        body: uploadData,
      }),
      invalidatesTags: ["upload"],
    }),
  }),
});

export const { useUploadFileMutation } = uploadApi;
