import { MoreVertical, Search, Send } from "lucide-react";
import { useEffect, useState } from "react";
import user_image from "../../../assets/images/dash-profile.png";

import { useGetAllSupportConversationsQuery,
  useGetSupportMessagesByReceiverQuery,
  useAdminReplySupportMutation, } from "./../../../redux/features/supportMessage/supportApi";
 
export default function UserMessage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
 
  // 1. Fetch conversations
  const { data: conversations = [], isLoading: loadingConversations } =
    useGetAllSupportConversationsQuery();

  // 2. Fetch messages for selected user
  const { data: messages = [], isLoading: loadingMessages } =
    useGetSupportMessagesByReceiverQuery(selectedUser?.userId, {
      skip: !selectedUser,
    });

  // 3. Send message mutation
  const [sendReply, { isLoading: sending }] = useAdminReplySupportMutation();

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    await sendReply({
      receiverId: selectedUser.userId,
      message: newMessage,
    });

    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white/80 border-r flex flex-col">
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-3 border rounded-xl"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loadingConversations && (
            <p className="p-4 text-sm text-gray-500">Loading...</p>
          )}

          {conversations.map((user) => (
            <div
              key={user.userId}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center p-3 cursor-pointer ${
                selectedUser?.userId === user.userId
                  ? "bg-indigo-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <img
                src={user.avatar || user_image}
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-3 flex-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500 truncate">
                  {user.lastMessage}
                </p>
              </div>
              {user.unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {user.unreadCount}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Header */}
            <div className="p-4 bg-white border-b flex justify-between">
              <div className="flex items-center">
                <img
                  src={selectedUser.avatar || user_image}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <h3 className="font-semibold">{selectedUser.name}</h3>
                  <p className="text-sm text-green-600">Active</p>
                </div>
              </div>
              <MoreVertical />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {loadingMessages && (
                <p className="text-sm text-gray-500">Loading messages...</p>
              )}

              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${
                    msg.senderRole === "user" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-md ${
                      msg.senderRole === "user"
                        ? "bg-gray-700 text-white"
                        : "bg-primary text-white"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white flex gap-3">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border rounded-xl px-4 py-3"
              />
              <button
                onClick={handleSendMessage}
                disabled={sending}
                className="bg-primary text-white p-3 rounded-full"
              >
                <Send />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation
          </div>
        )}
      </div>

      {/* Profile Sidebar */}
      <div className="w-80 bg-white flex items-center justify-center">
        <div className="text-center">
          <img src={user_image} className="w-20 h-20 rounded-full mx-auto" />
          <h3 className="mt-2 font-semibold">Sushil Hemrom</h3>
          <p className="text-sm text-primary">sushil@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
