import baseApi from "../../api/baseApi";

export const internationalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // all beautician
    getInternationalApplicant: builder.query({
      query: ({ date, page = 1, limit = 10 }) => ({
        url: `/dashboard/all-international-application`,
        method: "GET",
        params: {
          date,
          page,
          limit,
        },
      }),
      providesTags: ["international"],
    }),
    // get beautician by id
    getInternationalApplicantDetails: builder.query({
      query: (id) => ({
        url: `/dashboard/single-international-application/${id}`,
        method: "GET",
      }),
      providesTags: ["international"],
    }),
  }),
});

export const {
  useGetInternationalApplicantQuery,
  useGetInternationalApplicantDetailsQuery,
} = internationalApi;
