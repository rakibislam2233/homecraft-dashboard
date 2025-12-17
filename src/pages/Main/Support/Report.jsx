import { MoreVertical, Search, Send } from "lucide-react";
import { useState } from "react";

export default function Report() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Sample users data
  const users = [
    {
      id: 2,
      name: "Darrell Steward",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      lastMessage: "hi, can you tell me ab...",
      isOnline: true,
      hasNewMessage: false,
      lastSeen: "5 hours ago",
      unreadCount: 4,
    },
    {
      id: 29,
      name: "Darrell Steward",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      lastMessage: "hi, can you tell me ab...",
      isOnline: false,
      hasNewMessage: false,
      lastSeen: "5 hours ago",
      unreadCount: 4,
    },
    {
      id: 82,
      name: "Darrell Steward",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      lastMessage: "hi, can you tell me ab...",
      isOnline: true,
      hasNewMessage: false,
      lastSeen: "5 hours ago",
      unreadCount: 4,
    },
    {
      id: 4,
      name: "Kristin Watson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      lastMessage: "hi, can you tell me ab...",
      isOnline: false,
      hasNewMessage: false,
      lastSeen: "3 hours ago",
      unreadCount: 0,
    },
    {
      id: 5,
      name: "Devon Lane",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      lastMessage: "hi, can you tell me ab...",
      isOnline: true,
      hasNewMessage: true,
      lastSeen: "30 minutes ago",
      unreadCount: 2,
    },
    {
      id: 411,
      name: "Kristin Watson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      lastMessage: "hi, can you tell me ab...",
      isOnline: false,
      hasNewMessage: false,
      lastSeen: "3 hours ago",
      unreadCount: 0,
    },
    {
      id: 511,
      name: "Devon Lane",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      lastMessage: "hi, can you tell me ab...",
      isOnline: true,
      hasNewMessage: true,
      lastSeen: "30 minutes ago",
      unreadCount: 2,
    },
    {
      id: 6,
      name: "Esther Howard",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      lastMessage: "hi, can you tell me ab...",
      isOnline: false,
      hasNewMessage: false,
      lastSeen: "6 hours ago",
      unreadCount: 0,
    },
    {
      id: 7,
      name: "Julie Jones",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
      lastMessage: "hi, can you tell me ab...",
      isOnline: false,
      hasNewMessage: false,
      lastSeen: "2 days ago",
      unreadCount: 0,
    },
    {
      id: 26,
      name: "Esther Howard",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      lastMessage: "hi, can you tell me ab...",
      isOnline: false,
      hasNewMessage: false,
      lastSeen: "6 hours ago",
      unreadCount: 0,
    },
    {
      id: 27,
      name: "Julie Jones",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
      lastMessage: "hi, can you tell me ab...",
      isOnline: false,
      hasNewMessage: false,
      lastSeen: "2 days ago",
      unreadCount: 0,
    },
    {
      id: 8,
      name: "Ronald Richards",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
      lastMessage: "hi, can you tell me ab...",
      isOnline: false,
      hasNewMessage: false,
      lastSeen: "1 day ago",
      unreadCount: 0,
    },
    {
      id: 9,
      name: "Robert Fox",
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
      lastMessage: "hi, can you tell me ab...",
      isOnline: false,
      hasNewMessage: false,
      lastSeen: "4 hours ago",
      unreadCount: 0,
    },
    {
      id: 10,
      name: "Ahmad Kabir",
      avatar:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face",
      lastMessage: "hi, can you tell me ab...",
      isOnline: false,
      hasNewMessage: false,
      lastSeen: "8 hours ago",
      unreadCount: 0,
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Users List Sidebar */}
      <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 flex flex-col shadow-lg">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200/50 ">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 shadow-sm"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`group flex items-center p-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-200 transform ${
                selectedUser?.id === user.id
                  ? "bg-gradient-to-r from-gray-100 to-indigo-100 border-2 border-primary rounded"
                  : "border-b border-gray-100/50"
              }`}
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                />
                {user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary">
                    {user.name}
                  </h3>
                  {user.unreadCount > 0 && (
                    <div className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      {user.unreadCount}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate group-hover:text-gray-600">
                  {user.lastMessage}
                </p>
              </div>
              {/* <div
                className={` ${
                  user.isOnline
                    ? "rounded-full p-2 border-2 border-gray-400 bg-primary"
                    : "rounded-full p-2 border-2 border-gray-400 "
                }  `}
              ></div> */}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  alt="Henry Silver"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-200 shadow-md"
                />
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">Henry Silver</h3>
                  <p className="text-sm text-green-600 font-medium">
                    Active now
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Report Section */}
            <div className="flex-1 p-6 bg-gradient-to-b from-gray-50/30 to-white/30 min-h-0">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Got a report about a User
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Henry Silver filed a report on "Jack-N-Slash" for "bad
                  speech."
                </p>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Here is the Complaint:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris blandit molestie sapien, vel pharetra magna consequat
                    vitae. Pellentesque imperdiet dapibus semper, duis a nibh
                    eleifend ligula euismod aliquet. Pellentesque dignissim
                    magna elit, et egestas nunc. Sed dictum maximus eget.
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Ignore
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                    Take Action
                  </button>
                </div>
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
                Welcome to Report List
              </h3>
              <p className="text-gray-600 max-w-md">
                Select a conversation from the sidebar to see report issue.
              </p>
            </div>
          </div>
        )}
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
