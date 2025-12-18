import { FaHospitalUser, FaUsers } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useGetAllStatsQuery } from "../../../redux/features/dashboardHome/dashboardHomeApi";
import DashboardChart from "./DashboardChart";

import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import image from "../../../assets/images/host-details-image.png";
import total_acc from "../../../assets/dashboard/verify-acc.svg";
import total_user from "../../../assets/dashboard/total-client.svg";
import total_professional from "../../../assets/dashboard/total-profession.svg";
import total_earning from "../../../assets/dashboard/total-earning.svg";

const dummyData = [
  {
    id: 1,
    name: "User NAME",
    profession: "Painter",
    location: "New York",
    email: "example@gmail.com",
    profileImage: image,
  },
  {
    id: 2,
    name: "User NAME",
    profession: "Painter",
    location: "New York",
    email: "example@gmail.com",
    profileImage: image,
  },
  {
    id: 3,
    name: "User NAME",
    profession: "Painter",
    location: "New York",
    email: "example@gmail.com",
    profileImage: image,
  },
  {
    id: 4,
    name: "User NAME",
    profession: "Painter",
    location: "New York",
    email: "example@gmail.com",
    profileImage: image,
  },
  {
    id: 5,
    name: "User NAME",
    profession: "Painter",
    location: "New York",
    email: "example@gmail.com",
    profileImage: image,
  },
  {
    id: 6,
    name: "User NAME",
    profession: "Painter",
    location: "New York",
    email: "example@gmail.com",
    profileImage: image,
  },
];

export default function DashboardHome() {
  const { data } = useGetAllStatsQuery();

  const handleCardClick = (id, e) => {
    // Only navigate if the click wasn't on a button
    if (!e.target.closest("button")) {
      navigate(`/all-users/professional/${id}`);
    }
  };

  const handleButtonClick = (e, action, id) => {
    e.stopPropagation();
    if (action === "verify") {
      console.log("Verify user", id);
      // Add your verify logic here
    } else {
      console.log("Reject user", id);
      // Add your reject logic here
    }
  };

  function CardInfo({ icon, title, number }) {
    return (
      <>
        <img src={icon} className="w-12 h-12" alt="icon" />
        <div>
          <div className="2xl:text-xl text-base font-medium roboto mb-3">{title}</div>
          <div className="2xl:text-3xl text-2xl font-bold roboto">{number}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-2 md:space-y-4 lg:space-y-6 mt-8">
        <div className="flex gap-9 w-full">
          <div className="w-[60%] primary-border rounded-lg drop-shadow-[#0000001A]">
            <DashboardChart />
          </div>
          <div className="flex justify-center rounded-lg w-[40%]">
            <div className="grid grid-cols-2 gap-x-8 gap-y-7 w-full h-full">
              <div className="text-white bg-gradient-to-t from-[#4D0304] to-[#8E0003] rounded-lg px-4 flex justify-center items-center gap-4  w-full h-full">
                <CardInfo
                  icon={total_earning}
                  title="Total Earning"
                  number={`$254.99`}
                />
              </div>

              <div className="text-white bg-gradient-to-t from-[#0C3D00] to-[#21A300] rounded-lg px-4 flex justify-center items-center gap-4  w-full h-full">
                <CardInfo
                  icon={total_acc}
                  title="Verified A.C"
                  number={`112`}
                />
              </div>

              <div className="text-white bg-gradient-to-t from-[#996300] to-[#FFA500] rounded-lg px-1 flex justify-center items-center gap-4  w-full h-full">
                <CardInfo
                  icon={total_professional}
                  title="Total Profession"
                  number={`254`}
                />
              </div>
              <div className="text-white bg-gradient-to-t from-[#771212] to-[#DD2222] rounded-lg px-4 flex justify-center items-center gap-4 w-full h-full">
                <CardInfo
                  icon={total_user}
                  title="Total Client"
                  number={`1250`}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-primary text-3xl font-bold mb-2">
              Recent Professionals
            </h3>
            <button className="bg-primary text-white rounded px-4 py-2 flex items-center gap-2">
              See all <FaArrowRight />
            </button>
          </div>

          {/* <AccountVerification /> */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {dummyData.map((user) => (
              <div
                key={user.id}
                className="border p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer"
                onClick={(e) => handleCardClick(user.id, e)}
              >
                <div className="flex justify-center gap-4">
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="rounded-md w-20 h-20 mb-4"
                  />
                  <div>
                    <div className="text-lg font-semibold">{user.name}</div>
                    <div className="text-sm text-gray-600">
                      {user.profession}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <FaLocationDot className="text-primary" size={20} />{" "}
                        {user.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <MdEmail className="text-primary" size={24} />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    className="bg-primary text-white py-1 px-4 rounded-md"
                    onClick={(e) => handleButtonClick(e, "verify", user.id)}
                  >
                    Verify
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-4 rounded-md"
                    onClick={(e) => handleButtonClick(e, "reject", user.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
