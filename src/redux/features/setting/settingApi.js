import baseApi from "../../api/baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // about  start
    getAbout: builder.query({
      query: () => ({
        url: "/settings/about-us",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),

    updateAbout: builder.mutation({
      query: ({ data }) => ({
        url: `/settings/about-us`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["settings"],
    }),

    // about  end

    //  terms start
    getTerms: builder.query({
      query: () => ({
        url: "/settings/terms-conditions",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),

    updateTerms: builder.mutation({
      query: ({ data }) => ({
        url: `/settings/terms-conditions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["settings"],
    }),
    //  terms end

    // privacy start
    getPrivacy: builder.query({
      query: () => ({
        url: "/settings/privacy-policy",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),

    updatePrivacy: builder.mutation({
      query: ({ data }) => ({
        url: `/settings/privacy-policy`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["settings"],
    }),
  }),
});

export const {
  useGetAboutQuery,
  useUpdateAboutMutation,
  useGetTermsQuery,
  useUpdateTermsMutation,
  useGetPrivacyQuery,
  useUpdatePrivacyMutation,
} = settingsApi;
