import baseApi from "../../api/baseApi";

export const dashboardHomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // DashboardHome page
    getAllStats: builder.query({
      query: () => ({
        url: `/api/v1/dashboard/over-view`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),

    // Earning in DashboardHome page
    getApplicants: builder.query({
      query: (year) => ({
        url: `/api/v1/dashboard/${year}`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetAllStatsQuery, useGetApplicantsQuery } = dashboardHomeApi;
