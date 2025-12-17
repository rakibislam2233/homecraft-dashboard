import baseApi from "../../api/baseApi";

export const dashboardHomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // DashboardHome page
    getAllStats: builder.query({
      query: () => ({
        url: `/dashboard/over-view`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),

    // Earning in DashboardHome page
    getApplicants: builder.query({
      query: (year) => ({
        url: `/dashboard/${year}`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetAllStatsQuery, useGetApplicantsQuery } = dashboardHomeApi;
