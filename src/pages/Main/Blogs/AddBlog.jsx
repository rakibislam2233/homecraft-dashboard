import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Select,
  Spin,
  Typography,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBlogDetailsQuery,
  usePostBlogMutation,
  useUpdateBlogMutation,
} from "../../../redux/features/blog/blogApi";
import { useUploadFileMutation } from "../../../redux/features/upload/uploadApi";
import { useGetValueQuery } from "../../../redux/features/value/valueApi";

const { Text } = Typography;

const baseImageUrl = import.meta.env.VITE_IMAGE_URL || "";

export default function AddBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [description, setDescription] = useState("");
  const [fileList, setFileList] = useState([]);
  const [companyLogoUrl, setCompanyLogoUrl] = useState("");

  const [uploadFile] = useUploadFileMutation();
  const { data, isLoading } = useGetBlogDetailsQuery(id, { skip: !id });
  const singleData = data?.data;

  const [postBlog, { isLoading: isPosting }] = usePostBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  const { data: categoryV } = useGetValueQuery("Category");
  const categoryValue = categoryV?.data;

  useEffect(() => {
    if (id && singleData) {
      form.setFieldsValue({
        blogTitle: singleData.blogTitle,
        category: singleData.category,
      });
      setDescription(singleData.description || "");

      // Set fileList from existing banner if present
      if (singleData.banner) {
        const filename = singleData.banner.split("/").pop();
        setFileList([
          {
            uid: "-1",
            name: filename,
            status: "done",
            url: `${baseImageUrl || ""}${singleData.banner}`,
          },
        ]);
        setCompanyLogoUrl(singleData.banner);
      }
    }
  }, [id, singleData, form]);

  const onFinish = async (values) => {
    console.log(values);
    if (!description) {
      message.error("Description is required");
      return;
    }

    const payload = {
      blogTitle: values.blogTitle,
      category: values.category,
      description,
      banner: companyLogoUrl,
    };

    try {
      if (id) {
        await updateBlog({ id, blogData: payload }).unwrap();
        message.success("Blog updated!");
      } else {
        await postBlog(payload).unwrap();
        message.success("Blog added!");
      }
      navigate("/blogs");
    } catch (error) {
      console.log(error);
      message.error(error?.data?.message || "Something went wrong!");
    }
  };

  const onUploadChange = async ({ file, fileList: newFileList }) => {
    setFileList(newFileList);

    if (file.status === "removed") {
      setCompanyLogoUrl("");
      return;
    }

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadFile(formData).unwrap();

      if (response.success && response.data?.path) {
        setCompanyLogoUrl(response.data.path);
      } else {
        console.error("Upload failed: ", response.message || "No URL returned");
        setCompanyLogoUrl("");
      }
    } catch (error) {
      console.error("Upload error: ", error);
      setCompanyLogoUrl("");
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
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h3 className="text-primary flex justify-start items-center gap-4 text-xl font-semibold mb-6">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        {id ? "Edit Blog" : "Add Blog"}
      </h3>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Banner" name="banner">
          <Upload
            beforeUpload={() => false}
            onChange={onUploadChange}
            fileList={fileList}
            maxCount={1}
            accept="image/*"
            listType="picture"
            onRemove={() => setCompanyLogoUrl("")}
          >
            <Button icon={<UploadOutlined />}>Upload Banner</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Title"
          name="blogTitle"
          rules={[{ required: true, message: "Please input blog title" }]}
        >
          <Input placeholder="Blog title" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select Category" style={{ width: "100%" }}>
            {categoryValue?.map((cat) => (
              <Option key={cat._id} value={cat.type}>
                {cat.type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div className="my-12">
          <label className="block mb-2 font-medium">Description</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            style={{ height: 200 }}
          />
          {!description && (
            <div className="text-red-600 mt-2">Description is required</div>
          )}
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPosting || isUpdating}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
