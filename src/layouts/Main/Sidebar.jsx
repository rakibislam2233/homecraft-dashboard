import { createElement, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineArrowRight } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import main_logo from "../../assets/images/service_marketplace_main_logo.svg";
import { dashboardItems } from "../../constants/router.constants";
import { cn } from "../../lib/utils";
import { logout } from "../../redux/slices/authSlice";
import { routeLinkGenerators } from "../../utils/routeLinkGenerators";
import { IoIosArrowDown } from "react-icons/io";

const SubMenu = ({ children, isOpen, rootPath, location, openName, name }) => (
  <div
    className={cn("pl-8 space-y-1 h-0 overflow-hidden", {
      "h-fit pt-1.5":
        name === openName?.name ||
        (location.pathname.includes(rootPath) && !openName.name),
    })}
  >
    {children?.map(({ subName, subPath, subIcon }, inx) => (
      <NavLink
        key={inx}
        to={subPath}
        className={({ isActive }) =>
          isActive
            ? "bg-white text-primary w-full px-4 py-1 flex items-center justify-start gap-3 transition-all text-lg"
            : "text-white hover:text-primary hover:bg-white w-full px-4 py-1 flex items-center justify-start gap-3 transition-all text-lg"
        }
      >
        <div>{createElement(subIcon, { size: "22", className: "font-bold" })}</div>
        <span>{subName}</span>
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openName, setOpenName] = useState({});

  const handleLogOut = () => {
    Swal.fire({
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "     Sure    ",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        logout();
        localStorage.removeItem("token");
        navigate("/auth");
      }
    });
  };

  return (
    <div className="fixed top-0 left-0 w-[270px] min-h-screen h-full">
      <div className="h-full flex flex-col justify-between bg-gradient-to-b from-[#8E0003] to-[#4D0304] pt-[50px] border drop-shadow rounded-lg">
        {/* Logo */}
        <div className=" flex justify-center items-center text-primary text-3xl font-bold">
          {/* <img className="w-[70%] mx-auto" src={logo} alt="Logo" /> */}
          <img className="w-[60%] mx-auto" src={main_logo} alt="Logo" />
        </div>

        {/* Navigation Links */}
        <ul className="mt-10 max-h-[650px] overflow-y-auto space-y-1 xl:space-y-2 text-white">
          {routeLinkGenerators(dashboardItems).map(
            ({ name, icon, path, children, rootPath }, indx) =>
              children?.length ? (
                <li key={indx} className="overflow-hidden">
                  <button
                    aria-label="Toggle submenu"
                    onClick={() =>
                      setOpenName((c) => ({
                        name: c?.name === name ? null : name,
                      }))
                    }
                    className={cn(
                      "outline-none hover:text-primary hover:bg-white w-full px-4 py-2.5 flex items-center justify-between gap-3 text-lg transition-all ",
                      {
                        "bg-white text-primary py-2.5":
                          name === openName?.name ||
                          (location.pathname.includes(rootPath) &&
                            !openName.name),
                      }
                    )}
                  >
                    <div className="flex items-center justify-start gap-3 w-full">
                      <div>{createElement(icon, { size: "28" })}</div>
                      <span>{name}</span>
                    </div>
                    <IoIosArrowDown
                      className={cn(" hover:text-primary", {
                        "rotate-180 text-primary ":
                          name === openName?.name ||
                          (location.pathname.includes(rootPath) &&
                            !openName.name),
                      })}
                      size={23}
                    />
                  </button>
                  <SubMenu
                    children={children}
                    isOpen={name === openName?.name}
                    rootPath={rootPath}
                    location={location}
                    openName={openName}
                    name={name}
                  />
                </li>
              ) : (
                <li key={indx} className="w-full">
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-white text-primary w-full px-4 py-2.5 flex items-center justify-start gap-3 text-lg transition-all "
                        : "hover:text-primary text-[20px] hover:bg-white w-full px-4 py-2.5 flex items-center justify-start gap-3 text-lg transition-all"
                    }
                  >
                    <div>{createElement(icon, { size: "20" })}</div>
                    <span>{name}</span>
                  </NavLink>
                </li>
              )
          )}
        </ul>

        {/* Logout Button */}
        <div className="p-[24px]">
          <button
            onClick={handleLogOut}
            className="bg-white text-primary w-full px-10 py-4 flex justify-center items-center gap-2 rounded-lg text-xl"
          >
            <BiLogOut className="text-white" size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
