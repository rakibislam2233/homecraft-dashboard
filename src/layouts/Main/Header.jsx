import { Avatar } from "antd";
import { FaRegBell } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import profileImage from "../../assets/images/naisa_header_profile.svg";

// const socket = io(`${import.meta.env.VITE_IMAGE_URL}`);

const Header = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const unreadNotifications = 2;

  return (
    <div className="w-full h-24 flex justify-between items-center rounded-l-md bg-gradient-to-b from-[#8E0003] to-[#4D0304] shadow-sm relative z-50">
      <div className=" p-4 ">
        <div className="text-2xl text-white font-2xl font-bold">
          Welcome, {user?.profile?.fullName || "Admin"}
        </div>
        <div className="text-white pt-4">Have a nice day!</div>
      </div>
      <div className="flex items-center gap-4 pr-4">
        <div>
          {/* notification button */}
          <button
            className="relative text-white p-4 rounded-full transition-colors border"
            onClick={() => navigate(`/notifications`)}
            aria-label="View notifications"
          >
            <FaRegBell size={32} className="w-6 h-6" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1.5 right-1.5 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                {unreadNotifications}
              </span>
            )}
          </button>
        </div>
        {/* profile image */}
        <div onClick={(e) => navigate("/settings/profile")}>
          <Avatar
            size={60}
            icon={
              <img
                src={
                  user?.image
                    ? `${import.meta.env.VITE_IMAGE_URL}` + user?.image
                    : profileImage
                }
                alt="headr_profile_image"
                className="w-full h-full object-cover cursor-pointer"
              />
            }
          />
        </div>
        {/* admin name */}
        <div>
          <h4 className="font-bold text-white text-lg">
            {user?.profile?.fullName || "Naissatalyz"}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Header;
