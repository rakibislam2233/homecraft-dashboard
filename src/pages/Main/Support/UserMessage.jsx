import { MoreVertical, Search, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import user_image from "../../../assets/images/dashboard-profile.png";
import {
  getOnlineUsers,
  addOnlineStatusListener,
} from "./../../../socket/socket";
import { useSelector } from "react-redux";
import {
  fetchSupportConversationList,
  fetchSupportMessages,
  adminReplySupportMessage,
} from "./../../../socket/messageService";

export default function UserMessage() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [conversationsData, setConversationsData] = useState(null);
  const messagesEndRef = useRef(null);
  const currentUser = useSelector((state) => state.auth.user);

  // Fetch conversations once on mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetchSupportConversationList();
        // console.log("res : ", res);
        setConversationsData(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchConversations();
  }, []);

  console.log("conversationsData", conversationsData);
  console.log("users : ", users);

  // Update users sidebar when conversations or online users change
  useEffect(() => {
    if (!conversationsData) return;

    const mappedUsers = conversationsData.results.map((conv) => {
      const user = conv.userId;
      return {
        id: user.id,
        name: user.profile.fullName,
        email: user.email,
        avatar: user.profile.profileImage,
        isOnline: onlineUsers.has(user.id), // reactive
        unreadCount: conv.unreadByAdmin,
        lastMessage: conv.lastMessage || "No messages yet",
        lastMessageAt: conv.lastMessageAt,
        conversationId: conv._id,
      };
    });

    setUsers(mappedUsers);
  }, [conversationsData, onlineUsers]);

  // Subscribe to online users via socket
  useEffect(() => {
    const unsubscribe = addOnlineStatusListener(() => {
      setOnlineUsers(new Set(getOnlineUsers()));
    });
    return () => unsubscribe();
  }, []);

  // Load messages for a selected user
  const loadMessages = async (conversation) => {
    setSelectedUser(conversation);
    try {
      const res = await fetchSupportMessages(conversation.conversationId);
      setMessages(res.results || res);
    } catch (err) {
      console.error(err);
    }
  };

  console.log("selectedUser : ", selectedUser);
  // Send message handler
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const sent = await adminReplySupportMessage({
        conversationId: selectedUser.conversationId,
        message: newMessage,
      });

      // Ensure the message has senderId = currentUser
      const messageWithSender = {
        ...sent,
        senderId: currentUser, // important for correct alignment
      };

      setMessages((prev) => [...prev, messageWithSender]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  // Derive the selected user's online status from onlineUsers
  const selectedUserWithStatus = selectedUser
    ? { ...selectedUser, isOnline: onlineUsers.has(selectedUser.id) }
    : null;

  useEffect(() => {
    const unsubscribe = addOnlineStatusListener(() => {
      setOnlineUsers(new Set(getOnlineUsers())); // triggers re-render
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-[calc(100vh-122px)] bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Users List Sidebar */}
      <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 flex flex-col shadow-lg">
        <div className="p-6 border-b border-gray-200/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 shadow-sm"
            />
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => loadMessages(user)}
              className={`group flex  items-center p-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-200 transform ${
                selectedUser?.id === user.id
                  ? "bg-gradient-to-r from-gray-100 to-indigo-100 border border-primary rounded"
                  : "border-b border-b-[#545454]/60"
              }`}
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                />
                {onlineUsers.has(user.id) && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}

                {/* {user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )} */}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary">
                    {user.name}
                  </h3>
                  {/* {user.unreadCount > 0 && (
                    <div className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      {user.unreadCount}
                    </div>
                  )} */}
                </div>
                <p className="text-sm text-gray-500 truncate group-hover:text-gray-600">
                  {user.lastMessage ? user.lastMessage : "No messages yet"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center">
                <img
                  src={selectedUser?.avatar}
                  alt="Henry Silver"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-200 shadow-md"
                />
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900 capitalize">
                    {selectedUser?.name}
                  </h3>
                  {/* {user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )} */}

                  {/* <p className="text-sm text-green-600 font-medium">
                    Active now
                  </p> */}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/30 to-white/30">
              {messages.map((message, index) => (
                <div key={message._id}>
                  {index === 0 ||
                  messages[index - 1].createdAt !== message.createdAt ? (
                    <div className="flex justify-center mb-4">
                      <span className="text-xs text-gray-500 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  ) : null}
                  <div
                    className={`flex ${
                      message.senderId?._id === currentUser?._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md transform transition-all duration-200 ${
                        message.senderId?._id === currentUser?._id
                          ? "bg-gradient-to-r from-primary to-primary/90 text-white rounded-br-sm"
                          : "bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Scroll target - MUST be inside scrollable container */}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Message Input */}
            <div className="bg-white/90 backdrop-blur-sm border-t border-gray-200/50 p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-primary to-primary/90 text-white p-3 rounded-full hover:from-primary hover:to-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary/90 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to Messages
              </h3>
              <p className="text-gray-600 max-w-md">
                Select a conversation from the sidebar to start messaging with
                your users. Manage all your customer communications in one
                place.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 flex flex-col shadow-lg">
        <div className="flex items-center justify-center text-center flex-col gap-5 h-full">
          <div className="w-[84px] h-[84px]">
            <img
              src={user_image}
              alt="user-image"
              className="w-full h-full rounded-full shadow-sm border border-[#222222]"
            />
          </div>
          <div className="">
            <h3 className="text-xl font-normal text-[#222222] m-0">
              {selectedUser?.name}
            </h3>
            <p className="text-xs text-[#2D9F94] m-0"> {selectedUser?.email}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
