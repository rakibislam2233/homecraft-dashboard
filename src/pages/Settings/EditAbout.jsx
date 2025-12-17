import { Button, message, Spin } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import {
  useGetAboutQuery,
  useUpdateAboutMutation,
} from "../../redux/features/setting/settingApi";

const EditAbout = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [isContentChanged, setIsContentChanged] = useState(false);

  const { data, isLoading } = useGetAboutQuery();
  const [editAbout, { isLoading: isUpdating }] = useUpdateAboutMutation();

  const placeholder = "Enter your about us description here...";

  useEffect(() => {
    // if (data?.data?.description) {
    if (data.data?.aboutUs) {
      // setDescription(data.data.description);
      setDescription(data.data?.aboutUs);
    }
  }, [data]);

  const handleDescriptionChange = (description) => {
    setDescription(description);
    setIsContentChanged(true);
  };

  const handleSaveChanges = async () => {
    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
      message.error("Description cannot be empty");
      return;
    }

    try {
      const response = await editAbout({
        data: {
          aboutUs: trimmedDescription,
        },
      }).unwrap();

      message.success(
        response.message || response.data.message || "Updated Successfully!"
      );
      navigate("/settings/about-us");
    } catch (error) {
      message.error(error?.data?.message || "Failed to update about section");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className=" flex flex-col justify-between gap-6">
      <div className="space-y-6">
        <PageHeading
          title={"Edit About Us"}
          backPath={-1}
          className={"text-button"}
        />

        <div className="min-h-[60vh] bg-white rounded-lg shadow-xl p-4">
          <ReactQuill
            placeholder={placeholder}
            theme="snow"
            value={description}
            onChange={handleDescriptionChange}
            className="h-[50vh]"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button
          size="large"
          type="primary"
          onClick={handleSaveChanges}
          className="px-8 w-[250px]"
          loading={isUpdating}
          disabled={isUpdating || !isContentChanged || !description.trim()}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditAbout;
