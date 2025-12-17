import baseApi from "../../api/baseApi";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // all beautician
    getJobs: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/job/all`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["jobs"],
    }),
    // get beautician by id
    getJobDetails: builder.query({
      query: (id) => ({
        url: `/job/single/${id}`,
        method: "GET",
      }),
      providesTags: ["jobs"],
    }),
    // all beautician
    getJobApplicants: builder.query({
      query: ({ id, date, page = 1, limit = 10 }) => ({
        url: `/apply/all/${id}`,
        method: "GET",
        params: {
          date,
          page,
          limit,
        },
      }),
      providesTags: ["jobs"],
    }),
    // get beautician by id
    getJobApplicantDetails: builder.query({
      query: (id) => ({
        url: `/apply/single/${id}`,
        method: "GET",
      }),
      providesTags: ["jobs"],
    }),

    // -------------
    // post jobs
    postJob: builder.mutation({
      query: (jobData) => ({
        url: "/job/create",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["jobs"],
    }),
    // update jobs
    updateJob: builder.mutation({
      query: ({ id, jobData }) => ({
        url: `/job/update/${id}`,
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["jobs"],
    }),

    deleteJob: builder.mutation({
      query: ({ id }) => ({
        url: `/job/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobs"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobDetailsQuery,
  useGetJobApplicantsQuery,
  useGetJobApplicantDetailsQuery,
  usePostJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;
