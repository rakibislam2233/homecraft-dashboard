import baseApi from "../../api/baseApi";

export const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all reports with pagination
    getReports: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/v1/reports",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["reports"],
    }),

    // Get a single report by ID
    getReportById: builder.query({
      query: (id) => ({
        url: `/api/v1/reports/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "reports", id }],
    }),

    // Send action on a report for professional
    sendReportAction: builder.mutation({
      query: ({ id, actionPayload }) => ({
        url: `/api/v1/reports/professional/action/${id}`,
        method: "POST",
        body: actionPayload,
      }),
      invalidatesTags: ["reports"],
    }),
  }),
});

export const {
  useGetReportsQuery,
  useGetReportByIdQuery,
  useSendReportActionMutation,
} = supportApi;
