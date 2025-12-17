import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import image from "../../../assets/images/host-details-image.png";

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

export default function AccountVerification() {
  const navigate = useNavigate();

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

  const handleChange = () => {
    console.log("first");
  };

  return (
    <div className="mx-auto p-4 shadow-sm">
      <h3 className="text-2xl font-bold text-center mb-4 bg-primary text-white rounded py-2">
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
                <div className="text-sm text-gray-600">{user.profession}</div>
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
  );
}
