import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Spin, message, Select, Input } from "antd";
import image from "../../../assets/images/host-details-image.png";
import {
  useGetUnverifiedProfessionalsQuery,
  useVerifyProfessionalMutation,
  useRejectProfessionalMutation,
} from "../../../redux/features/accountVerification/accountVerificationApi";
import dayjs from "dayjs";
import { useState } from "react";

export default function AccountVerification() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);

  const { data, isLoading, isError } = useGetUnverifiedProfessionalsQuery({
    page: 1,
    limit: 10,
    month: selectedMonth,
    searchTerm,
  });

  const [verifyProfessional] = useVerifyProfessionalMutation();
  const [rejectProfessional] = useRejectProfessionalMutation();

  const handleCardClick = (id, e) => {
    if (!e.target.closest("button")) {
      navigate(`/all-users/professional/${id}`);
    }
  };

  const handleButtonClick = async (e, action, id) => {
    e.stopPropagation();
    try {
      if (action === "verify") {
        await verifyProfessional(id).unwrap();
        message.success("Professional verified successfully");
      } else {
        await rejectProfessional(id).unwrap();
        message.success("Professional rejected successfully");
      }
    } catch {
      message.error("Something went wrong!");
    }
  };

  if (isLoading) return <Spin className="mt-8" />;
  if (isError)
    return <div className="text-center mt-8">Failed to load professionals</div>;

  const professionals = data?.data?.results || [];

  const currentYear = dayjs().year();
  const monthOptions = dayjs.months().map((month, index) => ({
    label: `${month} ${currentYear}`,
    value: `${currentYear}-${String(index + 1).padStart(2, "0")}`,
  }));

  return (
    <div className="mx-auto p-4 shadow-sm">
      <h3 className="text-2xl font-bold text-center mb-4 bg-primary text-white rounded py-2 roboto">
        New Professionals Account Management
      </h3>

      <div className="flex justify-between mb-4">
        {/* Month Filter */}
        <Select
          className="w-48"
          placeholder="Select month"
          options={monthOptions}
          allowClear
          onChange={(value) => setSelectedMonth(value)}
        />

        {/* Search */}
        <Input
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "300px" }}
          className="rounded-full px-4 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {professionals.map((user) => (
          <div
            key={user._id}
            className="border border-[#E4E5E8] rounded-lg p-4 flex justify-between items-center cursor-pointer"
            onClick={(e) => handleCardClick(user._id, e)}
          >
            <div className="flex gap-4">
              <img src={image} alt="Profile" className="rounded-md w-20 h-20" />
              <div>
                <div className="text-lg font-bold">
                  {user.profile?.fullName}
                </div>
                <div className="capitalize text-gray-500">{user.role}</div>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1 text-sm">
                    <FaLocationDot className="text-primary" />
                    New York
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <MdEmail className="text-primary" />
                    {user.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                className="red-button text-white text-sm py-1.5 px-4 rounded-md"
                onClick={(e) => handleButtonClick(e, "verify", user._id)}
              >
                Verify
              </button>
              <button
                className="bg-[#E44040] text-white text-sm py-1.5 px-4 rounded-md"
                onClick={(e) => handleButtonClick(e, "reject", user._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
