import baseApi from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 01. login
    login: builder.mutation({
      query: (loginData) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
    // for protectet routes
    getUserByToken: builder.query({
      query: () => ({ url: `/api/v1/users/profile/me`, method: "GET" }),
      providesTags: ["auth"],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `/api/v1/users/profile/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    // 02. forgot password
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: `/api/v1/auth/forgot-password`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 03. verify email
    verifyEmail: builder.mutation({
      query: ({ code, email }) => {
        return {
          url: `/api/v1/auth/verify-otp`,
          method: "POST",
          body: { otp: code, email },
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 04. reset password
    resetPassword: builder.mutation({
      query: ({ email, newPassword }) => {
        return {
          url: `/api/v1/auth/reset-password`,
          method: "POST",
          body: { email, newPassword },
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 05. resend otp
    resendOtp: builder.query({
      query: ({ email }) => ({
        url: `/api/v1/auth/resend-otp`,
        method: "POST",
        body: { email },
      }),
      providesTags: ["auth"],
    }),

    // 04. reset password
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: `/api/v1/auth/change-password`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useResendOtpQuery,
  useLazyResendOtpQuery,
  useChangePasswordMutation,
  useLogoutMutation,
  useGetUserByTokenQuery,
  useUpdateUserMutation,
} = authApi;
