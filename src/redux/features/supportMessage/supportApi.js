// import { createApi } from "@reduxjs/toolkit/query/react";
// import { socketBaseQuery } from "./socketBaseQuery";
// import { baseApi } from "./../../api/baseApi";

// export const supportSocketApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     /* Admin conversation list */
//     getSupportConversationListSocket: builder.query({
//       queryFn: (payload) =>
//         socketBaseQuery()({
//           event: "admin-support-conversation-list",
//           data: payload,
//         }),
//     }),

//     /* Admin get messages */
//     getSupportMessagesSocket: builder.query({
//       queryFn: (payload) =>
//         socketBaseQuery()({
//           event: "admin-get-support-messages",
//           data: payload,
//         }),
//     }),

//     /* Admin reply */
//     adminReplySupportSocket: builder.mutation({
//       queryFn: (payload) =>
//         socketBaseQuery()({
//           event: "admin-reply-support-message",
//           data: payload,
//         }),
//     }),
//   }),
// });

// export const {
//   useGetSupportConversationListSocketQuery,
//   useGetSupportMessagesSocketQuery,
//   useAdminReplySupportSocketMutation,
// } = supportSocketApi;
// export const {
//   useGetAllSupportConversationsQuery,
//   useGetSupportMessagesByConversationQuery,
//   useAdminReplySupportMutation,
// } = supportApi;
