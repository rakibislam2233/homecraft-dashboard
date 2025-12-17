import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Spin, Upload } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/images/dash-profile.png";
import PageHeading from "../../Components/PageHeading";
import {
  useGetUserByTokenQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";

// Removed: useUploadFileMutation (since we are not using a separate upload API)

const baseImageUrl = import.meta.env.VITE_IMAGE_URL;

const EditMyProfile = () => {
  const navigate = useNavigate();
  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateUserMutation();

  // State to hold the image URL for display (current or preview of new)
  const [displayImageUrl, setDisplayImageUrl] = useState("");

  // New state to hold the actual new File object selected by the user
  const [newFile, setNewFile] = useState(null);

  const { data, isLoading, refetch } = useGetUserByTokenQuery();
  const profileData = data?.data || {};

  useEffect(() => {
    if (profileData?.profile?.profileImage) {
      // Set the initial image URL for display
      setDisplayImageUrl(profileData?.profile?.profileImage);
    }
  }, [profileData?.profile?.profileImage]);

  /**
   * Handler for Ant Design's Upload component to store the new file.
   * This prevents default upload and stores the File object and its preview URL.
   */
  const handleImageChange = (file) => {
    // Store the new File object
    setNewFile(file);

    // Create a preview URL for immediate display
    const reader = new FileReader();
    reader.onload = (e) => {
      setDisplayImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);

    return false; // Prevent default upload behavior
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      // 1. Append the name field using the key 'fullName'
      formData.append("fullName", values.name);

      // 2. Append the image field using the key 'profileImage'
      if (newFile) {
        // If a new file was selected, append the actual File object
        formData.append("profileImage", newFile);
        message.info("Uploading image and updating profile...");
      } else {
        // If no new file, append the existing URL string (path)
        formData.append("profileImage", displayImageUrl || "");
      }

      const response = await updateProfile(formData).unwrap();

      message.success(
        response?.data?.message ||
          response?.message ||
          "Profile updated successfully"
      );

      refetch();
      navigate("/settings/profile");
    } catch (error) {
      console.error("Update profile error:", error);
      message.error(error?.data?.message || "Failed to update profile");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-[24px] min-h-[83vh] bg-white rounded-2xl">
      <PageHeading
        title={"Edit Personal Information"}
        backPath={-1}
        className={"px-10 border-b border-primary text-button py-6"}
      />

      <div className="w-full">
        <Form
          name="basic"
          layout="vertical"
          className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            name: profileData?.profile?.fullName,
            email: profileData.email,
          }}
        >
          <div className="col-span-3 space-y-6">
            <div className="min-h-[365px] flex flex-col items-center justify-center p-8 rounded-lg border border-primary shadow-inner space-y-4">
              <div className="my-3 relative">
                <img
                  // Use displayImageUrl for current or new image preview
                  src={displayImageUrl ? `${displayImageUrl}` : defaultImage}
                  alt="Profile"
                  className="h-40 w-40 rounded-full object-cover"
                />

                {/* Reintroduced Upload Component */}
                <Upload
                  // Use the custom handler to store the file object
                  beforeUpload={handleImageChange}
                  accept="image/*"
                  showUploadList={false}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <UploadOutlined className="text-white text-4xl font-bold" />
                  </div>
                </Upload>
              </div>
              <h5 className="text-lg">{profileData?.profile?.fullName}</h5>
              <h4 className="text-2xl">{"Admin"}</h4>
            </div>
          </div>

          <div className="col-span-5 space-y-[24px]">
            <Form.Item
              className="text-lg font-medium"
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input size="large" className="h-[56px] rounded-lg mt-3" />
            </Form.Item>

            <Form.Item
              className="text-lg font-medium"
              label="Email"
              name="email"
            >
              <Input
                readOnly
                size="large"
                className="h-[56px] rounded-lg mt-3"
              />
            </Form.Item>

            <Form.Item className="flex justify-end pt-4">
              <Button
                size="large"
                type="primary"
                className="px-8 w-[250px]"
                htmlType="submit"
                loading={isUpdateLoading}
              >
                Save Changes
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditMyProfile;
