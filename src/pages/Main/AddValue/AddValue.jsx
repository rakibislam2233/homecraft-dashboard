import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Space,
  Table,
  Upload,
} from "antd";
import { useState } from "react";
import { FaEdit, FaFolder } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { useUploadFileMutation } from "../../../redux/features/upload/uploadApi";
import {
  useAddValueMutation,
  useDeleteValueMutation,
  useGetValueQuery,
  useUpdateValueMutation,
} from "../../../redux/features/value/valueApi";

const baseImageUrl = import.meta.env.VITE_IMAGE_URL;

const AddValue = ({ type }) => {
  const [page, setPage] = useState(1);

  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // File upload states
  const [fileList, setFileList] = useState([]);
  const [companyLogoUrl, setCompanyLogoUrl] = useState(""); // This stores the uploaded image path

  // Delete modal state
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Form and upload states
  const [form] = Form.useForm();

  // API hooks
  const [uploadFile] = useUploadFileMutation();
  const { data, isLoading, refetch } = useGetValueQuery(type);
  const [addValue, { isLoading: isAdding }] = useAddValueMutation();
  const [updateValue, { isLoading: isUpdating }] = useUpdateValueMutation();
  const [deleteValue, { isLoading: isDeleting }] = useDeleteValueMutation();

  // Prepare table data
  const dataSource = (data?.data || []).map((item) => ({
    key: item._id,
    id: item._id,
    typeValue: item.type,
    logo: item.logo || null,
  }));

  const resetModal = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setEditId(null);
    setCompanyLogoUrl("");
    setFileList([]);
    form.resetFields();
  };

  const openAddModal = () => {
    resetModal();
    setIsModalVisible(true);
  };

  const openEditModal = (record) => {
    setIsEditMode(true);
    setEditId(record.id);
    form.setFieldsValue({ typeValue: record.typeValue });

    if (type === "Category" && record.logo) {
      setCompanyLogoUrl(record.logo);
      setFileList([
        {
          uid: "-1",
          name: record.logo.split("/").pop(),
          status: "done",
          url: record.logo,
        },
      ]);
    } else {
      setCompanyLogoUrl("");
      setFileList([]);
    }
    setIsModalVisible(true);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalVisible(true);
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
  const handleAdd = async () => {
    try {
      const values = await form.validateFields();

      if (type === "Category" && !companyLogoUrl) {
        message.error("Please upload an icon");
        return;
      }

      const payload =
        type === "Category"
          ? {
              type: values.typeValue,
              logo: companyLogoUrl,
            }
          : { type: values.typeValue };

      await addValue({ value: type, jobData: payload }).unwrap();
      message.success(`${type} added successfully`);
      refetch();
      resetModal();
    } catch {
      message.error(`Failed to add ${type}`);
    }
  };

  const handleEdit = async () => {
    try {
      const values = await form.validateFields();

      if (type === "Category" && !companyLogoUrl) {
        message.error("Please upload an icon");
        return;
      }

      const payload =
        type === "Category"
          ? {
              type: values.typeValue,
              logo: companyLogoUrl,
            }
          : { type: values.typeValue };

      await updateValue({ id: editId, value: type, jobData: payload }).unwrap();
      message.success(`${type} updated successfully`);
      refetch();
      resetModal();
    } catch {
      message.error(`Failed to update ${type}`);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteValue({ id: deleteId }).unwrap();
      message.success(`${type} deleted successfully`);
      setIsDeleteModalVisible(false);
      refetch();
    } catch {
      message.error(`Failed to delete ${type}`);
      setIsDeleteModalVisible(false);
    }
  };

  const columns = [
    {
      title: "S. No",
      render: (_, __, index) => index + 1,
      width: 70,
      align: "center",
    },
    ...(type === "Category"
      ? [
          {
            title: "Icon",
            dataIndex: "logo",
            key: "logo",
            align: "center",
            width: 80,
            render: (logo) =>
              logo ? (
                <img
                  src={baseImageUrl + logo}
                  alt="icon"
                  style={{ width: 32, height: 32, objectFit: "contain" }}
                />
              ) : (
                <FaFolder />
              ),
          },
        ]
      : []),
    {
      title: type === "Category" ? "Category" : "Name",
      dataIndex: "typeValue",
      key: "typeValue",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => openEditModal(record)}>
            <FaEdit />
          </Button>
          <Button
            size="small"
            shape="circle"
            danger
            icon={<FiTrash2 />}
            onClick={() => openDeleteModal(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button type="primary" size="large" onClick={openAddModal}>
          Add {type === "Category" ? "Category" : "Name"}
        </Button>
      </div>
      <div className="w-[70%]">
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={isLoading}
          pagination={{
            current: page,
            pageSize: 10,
            onChange: (p) => setPage(p),
          }}
          rowKey="id"
        />
      </div>
      {/* Add/Edit Modal */}
      <Modal
        title={`${isEditMode ? "Edit" : "Add"} ${
          type === "Category" ? "Category" : "Name"
        }`}
        open={isModalVisible}
        onCancel={resetModal}
        footer={null}
        centered
        width={400}
      >
        <Form form={form} layout="vertical" initialValues={{ typeValue: "" }}>
          <Form.Item
            label={type === "Category" ? "Category Name" : "Name"}
            name="typeValue"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input
              placeholder={type === "Category" ? "Category Name" : "Name"}
            />
          </Form.Item>

          {type === "Category" && (
            <Form.Item label="Upload Icon" required>
              <Upload
                beforeUpload={() => false}
                onChange={onUploadChange}
                fileList={fileList}
                maxCount={1}
                accept="image/*"
                listType="picture"
                onRemove={() => setCompanyLogoUrl("")}
              >
                <Button icon={<UploadOutlined />}>Upload Company Logo</Button>
              </Upload>
            </Form.Item>
          )}

          <Button
            type="primary"
            block
            onClick={isEditMode ? handleEdit : handleAdd}
            loading={isAdding || isUpdating}
          >
            {isEditMode ? "Save Changes" : "Save"}
          </Button>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        loading={isDeleting}
        okButtonProps={{ danger: true }}
        centered
      >
        <p>Are you sure you want to delete this?</p>
      </Modal>
    </>
  );
};

export default AddValue;
