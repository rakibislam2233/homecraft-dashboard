import { useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import { cn } from "../../../lib/utils";
import { compareByCTime } from "../../../utils/impFunction";
import PageHeading from "../../../Components/PageHeading";
import { useAdminNotificationQuery } from "../../../redux/features/user/userApi";

const Notifications = () => {
  console.log(socket, "socket--------->");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch notifications from API
  const { data, isLoading, isError } = useAdminNotificationQuery(undefined);
  //console.log(data,"data")
  // Reset notifications on mount
  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        // Handle the notification data here
        console.log("Notification received:", data);
        // Optionally, you can navigate to a specific page or show a toast notification
        // navigate("/notifications");
      });
    }
  }, []);
  // useEffect(() => {
  //   dispatch(resetNotification());
  // }, [dispatch]);

  // Assume the notifications are in data.data; adjust if needed
  const notifications = data?.data?.notifications || [];
  //console.log(notifications,"notifications")
  return (
    <div className="rounded-lg">
      <PageHeading title={"All Notifications"} />
      <LoaderWraperComp
        isLoading={isLoading}
        isError={isError}
        className={"h-[80vh]"}
      >
        <div className="py-[24px]">
          {notifications?.map((item, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 px-[24px] py-4 cursor-pointer border-b border-blue-50 hover:bg-gray-100 transition-all relative"
            >
              <IoIosNotificationsOutline
                style={{ cursor: "pointer" }}
                className="border border-white w-[42px] h-[42px] rounded-lg p-1.5 shadow-sm bg-[#181F81] text-white group-hover:bg-[#b3dfc7]"
              />
              <div className="space-y-[2px]">
                <h6 className="text-lg">{item.msg}</h6>
                <small className="text-[12px] text-gray-500">
                  {compareByCTime(item.createdAt)}
                </small>
              </div>
              <div
                className={cn(
                  "absolute right-3 inset-y-0 w-fit flex items-center",
                  {
                    hidden: !!item?.isReadable,
                  }
                )}
              >
                <div className="text-[9px] font-semibold bg-yellow-400 px-2 h-[16px] rounded-full flex items-center justify-center">
                  New
                </div>
              </div>
            </div>
          ))}
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default Notifications;
