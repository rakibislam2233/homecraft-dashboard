import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import image from "../../../assets/images/host-details-image.png";
import {
  useGetUnverifiedProfessionalsQuery,
  useVerifyProfessionalMutation,
  useRejectProfessionalMutation,
} from "./../../../redux/features/accountVerification/accountVerificationApi";
 
export default function AccountVerification() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetUnverifiedProfessionalsQuery({
    page: 1,
    limit: 10,
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
        message.success("This Professional rejected successfully done");
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong!");
    }
  };

  const handleChange = () => {
    console.log("first");
  };

  if (isLoading) return <Spin className="mt-8" />;

  if (isError)
    return <div className="text-center mt-8">Failed to load professionals</div>;

  const professionals = data?.data?.results || [];

  return (
    <div className="mx-auto p-4 shadow-sm">
      <h3 className="text-2xl font-bold text-center mb-4 bg-primary text-white rounded py-2 roboto">
        New Professionals Account Management
      </h3>
      <div className="flex justify-between mb-4">
        <select onChange={handleChange} className="border p-2 rounded-md">
          <option value="February 2025">February 2025</option>
          <option value="March 2025">March 2025</option>
        </select>
        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Search by name or email"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {professionals.map((user) => (
          <div
            key={user._id}
            className="border p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer"
            onClick={(e) => handleCardClick(user._id, e)}
          >
            <div className="flex justify-center gap-4">
              <img
                src={image}
                alt="Profile"
                className="rounded-md w-20 h-20 mb-4"
              />
              <div>
                <div className="text-lg font-semibold roboto">
                  {user.profile?.fullName}
                </div>
                <div className="text-sm text-gray-600">{user.role}</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <FaLocationDot className="text-primary" size={20} /> New
                    York
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
                onClick={(e) => handleButtonClick(e, "verify", user._id)}
              >
                Verify
              </button>
              <button
                className="bg-red-500 text-white py-1 px-4 rounded-md"
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
