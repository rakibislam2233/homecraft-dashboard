import { Button, message, Spin } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import {
  useGetTermsQuery,
  useUpdateTermsMutation,
} from "../../redux/features/setting/settingApi";

const EditTermsConditions = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [isContentChanged, setIsContentChanged] = useState(false);

  const { data, isLoading } = useGetTermsQuery();
  const [editTerms, { isLoading: isUpdating }] = useUpdateTermsMutation();

  const placeholder = "Enter your about us content here...";

  useEffect(() => {
    // if (data?.data?.description) {
    if (data?.data[0]?.description) {
      // setDescription(data.data.description);
      setDescription(data?.data[0]?.description || "");
    }
  }, [data]);

  const handleDescriptionChange = (content) => {
    setDescription(content);
    setIsContentChanged(true);
  };

  const handleSaveChanges = async () => {
    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
      message.error("Description cannot be empty");
      return;
    }

    try {
      const response = await editTerms({
        data: {
          description: trimmedDescription,
        },
      }).unwrap();

      message.success(
        response.message || response.data.message || "Updated Successfully!"
      );
      navigate("/settings/terms-conditions");
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
    <div className="min-h-[80vh] flex flex-col justify-between gap-6">
      <div className="space-y-6">
        <PageHeading
          title={"Edit Terms & Conditions"}
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

export default EditTermsConditions;
