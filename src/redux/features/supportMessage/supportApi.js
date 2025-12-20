import { createApi } from "@reduxjs/toolkit/query/react";
import { socketBaseQuery } from "./socketBaseQuery";

export const supportApi = createApi({
  reducerPath: "supportApi",
  baseQuery: socketBaseQuery(),
  tagTypes: ["Support", "Unread"],
  endpoints: (builder) => ({

    // Get all support conversations
    getAllSupportConversations: builder.query({
      query: () => ({
        event: "get-all-support-conversations",
      }),
      providesTags: ["Support"],
    }),

    // Get support messages (admin / self)
    getSupportMessages: builder.query({
      query: ({ page = 1, limit = 50 }) => ({
        event: "get-support-messages",
        data: { page, limit },
      }),
      providesTags: ["Support"],
    }),

    //  Get support messages by receiver
    getSupportMessagesByReceiver: builder.query({
      query: (receiverId) => ({
        event: "get-support-messages-by-receiver",
        data: { receiverId }, //  691819e9ce0dbf246c50b225
      }),
      providesTags: ["Support"],
    }),

    // Admin reply to support
    adminReplySupport: builder.mutation({
      query: (payload) => ({
        event: "admin-reply-support",
        data: payload,
      }),
      invalidatesTags: ["Support", "Unread"],
    }),

    // Get unread support count
    getSupportUnreadCount: builder.query({
      query: () => ({
        event: "get-support-unread-count",
      }),
      providesTags: ["Unread"],
    }),

  }),
});

export const {
  useGetAllSupportConversationsQuery,
  useGetSupportMessagesQuery,
  useGetSupportMessagesByReceiverQuery,
  useAdminReplySupportMutation,
  useGetSupportUnreadCountQuery,
} = supportApi;
