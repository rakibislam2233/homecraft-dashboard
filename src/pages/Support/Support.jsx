import { Input } from "antd";
import React, { useState } from "react";
import MessageUsers from "../../Components/Messages/MessageUsers";
const { TextArea } = Input;

export default function Support() {
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "Henry Silver",
    email: "henry100@gmail.com",
    avatar:
      "https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png",
  });

  return (
    <div className="p-6 min-h-[83vh] bg-white rounded-lg">
      <div className="grid grid-cols-12 gap-10">
        <MessageUsers className={"col-span-4"} />
        <div className="col-span-8">
          <div className="flex justify-start items-center gap-2 pb-2 pl-8 shadow-sm border-b border-blue-50">
            <img
              src={userInfo.avatar}
              alt="user"
              className="h-[55px] w-[55px] rounded-full shadow border border-blue-50"
            />
            <div className="space-y-0.5">
              <p className="font-semibold">{userInfo.name}</p>
              <p className="max-w-[20ch] truncate text-xs text-[#4E4E4E]">
                {userInfo.email}
              </p>
            </div>
          </div>
          <div className="space-y-4 text-[#4E4E4E]">
            <div className="space-y-2">
              <p>Here is the message:</p>

              <TextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Type your message here"
                autoSize={{ minRows: 4, maxRows: 6 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
