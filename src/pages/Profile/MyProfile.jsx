import { Button, Form, Spin } from "antd";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/images/dash-profile.png";
import PageHeading from "../../Components/PageHeading";
import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";
import { useGetUserByTokenQuery } from "../../redux/features/auth/authApi";

const baseImageUrl = import.meta.env.VITE_IMAGE_URL;

const MyProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetUserByTokenQuery();

  const profileData = data?.data || {};
  const avatarImage = profileData?.profile?.profileImage
    ? `${profileData?.profile?.profileImage}`
    : defaultImage;

  console.log(profileData);
  console.log(profileData.profile.fullName);
  console.log(profileData.profile.profileImage);

  const handleEditProfile = () => {
    navigate("edit", { state: { profileData } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  // Capitalize role first letter
  const roleLabel =
    profileData.role?.charAt(0).toUpperCase() + profileData.role?.slice(1) ||
    "";

  return (
    <div className="space-y-[24px] min-h-[83vh] bg-white rounded-2xl">
      <PageHeading
        title={"Personal Information"}
        backPath={-1}
        disbaledBackBtn={true}
        className={"px-10 border-b border-[#CEF0FF] py-6 text-button"}
      />
      <div className="w-full">
        <div className="py-4 px-8 flex justify-end items-center">
          <Button
            onClick={() => setIsModalOpen(true)}
            size="large"
            type="default"
            className="px-8 text-white bg-button font-semibold"
          >
            Change Password
          </Button>
        </div>
        <Form
          name="basic"
          layout="vertical"
          className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
          autoComplete="off"
          initialValues={{
            image: profileData.profile.profileImage,
            name: profileData.profile.fullName,
            email: profileData.email,
          }}
        >
          <div className="col-span-3 space-y-6">
            <div className="min-h-[365px] flex flex-col items-center justify-center p-8 rounded-lg border border-primary shadow-inner space-y-4">
              <div className="my-3">
                <img
                  src={avatarImage}
                  alt="Profile"
                  className="h-[144px] w-[144px] rounded-full object-cover"
                />
              </div>
              <h5 className="text-lg text-[#222222]">
                {profileData?.profile?.fullName || "N/A"}
              </h5>
              <h4 className="text-2xl text-[#222222]">{roleLabel}</h4>
            </div>
            <Button
              onClick={handleEditProfile}
              size="large"
              type="primary"
              className="px-8 w-full flex items-center justify-center gap-2"
            >
              <FiEdit />
              Edit Profile
            </Button>
          </div>

          <div className="col-span-5">
            <div className="col-span-9 space-y-[24px]">
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-medium mb-1">Name</p>
                  <div className="h-[56px] rounded-lg bg-[#EFFAFF] flex items-center px-4 text-primary">
                    {profileData?.profile?.fullName || "N/A"}
                  </div>
                </div>
                <div>
                  <p className="text-lg font-medium mb-1">Email</p>
                  <div className="h-[56px] rounded-lg bg-[#EFFAFF] flex items-center px-4 text-primary">
                    {profileData.email || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>

      <PasswordChangeModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default MyProfile;
