import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Table, Upload } from "antd";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ErrorSwal, SuccessSwal } from "../../../utils/allSwalFire";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../redux/features/category/categoryApi";

const CategoryNew = () => {
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // API
  const { data, isLoading } = useGetCategoriesQuery({ page, limit: 10 });
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  // MAP API RESPONSE → TABLE DATA
  const tableData =
    data?.data?.results?.map((item) => ({
      id: item._id,
      name: item.name,
      image: item.image,
    })) || [];

  const handleAddCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      const res = await addCategory(formData).unwrap();

      SuccessSwal({ text: res.message });
      resetModal();
      setIsModalVisible(false);
    } catch (error) {
      ErrorSwal({ text: error?.data?.message || "Failed to add category" });
    }
  };

  const handleEditCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      const res = await updateCategory({
        id: categoryId,
        formData,
      }).unwrap();

      SuccessSwal({ text: res.message });
      resetModal();
      setIsModalVisible(false);
    } catch (error) {
      ErrorSwal({ text: error?.data?.message || "Failed to update category" });
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const res = await deleteCategory(categoryId).unwrap();
      SuccessSwal({ text: res.message });
      setIsDeleteModalVisible(false);
    } catch (error) {
      ErrorSwal({ text: error?.data?.message || "Failed to delete category" });
    }
  };

  const handleOpenModalForAdd = () => {
    setIsEditMode(false);
    resetModal();
    setIsModalVisible(true);
  };

  const handleOpenModalForEdit = (category) => {
    setIsEditMode(true);
    setCategoryId(category.id);
    setName(category.name);
    setImagePreview(category.image);
    setIsModalVisible(true);
  };

  const handleImageChange = (info) => {
    const file = info.file.originFileObj;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setFileList([info.file]);
  };

  const resetModal = () => {
    setName("");
    setImage(null);
    setImagePreview(null);
    setFileList([]);
    setCategoryId(null);
  };

  const columns = [
    {
      title: "S. No",
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      align: "center",
      render: (image) => (
        <img
          src={image}
          alt="Category"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Button
            icon={<FaEdit />}
            type="primary"
            shape="round"
            onClick={() => handleOpenModalForEdit(record)}
          />
          <Button
            icon={<RiDeleteBin6Fill size={18} />}
            danger
            shape="round"
            onClick={() => {
              setCategoryId(record.id);
              setIsDeleteModalVisible(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button type="primary" size="large" onClick={handleOpenModalForAdd}>
          Add Category
        </Button>
      </div>

      <Table
        className="w-[60%]"
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          total: data?.data?.pagination?.totalResult || 0,
          pageSize: 10,
          onChange: setPage,
        }}
      />

      {/* ADD / EDIT MODAL */}
      <Modal
        title={isEditMode ? "Edit Category" : "Add Category"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
      >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
        />

        <Upload
          listType="picture-card"
          fileList={fileList}
          showUploadList={false}
          onChange={handleImageChange}
          customRequest={({ onSuccess }) => onSuccess("ok")}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="preview" style={{ width: "100%" }} />
          ) : (
            <div>
              <UploadOutlined />
              <div>Upload Image</div>
            </div>
          )}
        </Upload>

        <Button
          type="primary"
          onClick={isEditMode ? handleEditCategory : handleAddCategory}
          className="w-full"
        >
          {isEditMode ? "Save Changes" : "Save"}
        </Button>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        title="Delete Category"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={null}
        centered
      >
        <p className="text-center text-lg">
          Are you sure you want to delete this category?
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={() => setIsDeleteModalVisible(false)}>Cancel</Button>
          <Button danger onClick={handleDeleteCategory}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CategoryNew;
