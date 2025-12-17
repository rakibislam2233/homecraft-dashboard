import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import {
  useAddBannerMutation,
  useDeleteBannerMutation,
  useEditBannerMutation,
  useGetAllBannerQuery,
} from "../../../redux/features/banner/bannerApi";
import { ErrorSwal, SuccessSwal } from "../../../utils/allSwalFire";

const Category = () => {
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [fileList, setFileList] = useState([]);
  const baseUrl = import.meta.env.VITE_IMAGE_URL;

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const { data, isLoading, refetch } = useGetAllBannerQuery({ page });
  const [addCategory] = useAddBannerMutation();
  const [editCategory] = useEditBannerMutation();
  const [deleteDeal] = useDeleteBannerMutation();

  const handleAddCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("link", link);

      const response = await addCategory(formData).unwrap();

      SuccessSwal({
        title: "",
        text: response.message || "Banner added successfully",
      });
      resetModal();
      refetch();
      setIsModalVisible(false);
    } catch (error) {
      ErrorSwal({
        title: "",
        text: error?.data?.message || error?.message || "Failed to add banner",
      });
    }
  };

  const handleEditCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("link", link);

      if (image && typeof image !== "string") {
        formData.append("image", image);
      }

      const response = await editCategory({
        id: categoryId,
        data: formData,
      }).unwrap();

      SuccessSwal({
        title: "",
        text: response.message || "Banner updated successfully",
      });
      resetModal();
      refetch();
      setIsModalVisible(false);
    } catch (error) {
      ErrorSwal({
        title: "",
        text:
          error?.data?.message || error?.message || "Failed to update banner",
      });
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      // Simulate API delete response
      const response = { message: "Category deleted successfully" };
      SuccessSwal({
        title: "",
        text: response.message || "Category deleted successfully",
      });
      setIsDeleteModalVisible(false);
    } catch (error) {
      ErrorSwal({
        title: "",
        text: error?.message || "Failed to delete category",
      });
    }
  };

  const handleOpenModalForAdd = () => {
    setIsEditMode(false);
    setCategoryId(null);
    setName("");
    setIsModalVisible(true);
  };

  const handleOpenModalForEdit = (category) => {
    setIsEditMode(true);
    setCategoryId(category.id);
    setName(category.name);
    setIsModalVisible(true);
  };

  const handleOpenDeleteModal = (category) => {
    setCategoryId(category.id);
    setIsDeleteModalVisible(true);
  };

  const columns = [
    {
      title: "S. No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex justify-center gap-2">
          <Button
            icon={<FaEdit />} // Edit icon
            type="primary"
            shape="round"
            onClick={() => handleOpenModalForEdit(record)}
          />
          <Button
            icon={<FaTrash />} // Delete icon
            type="danger"
            shape="round"
            onClick={() => handleOpenDeleteModal(record)}
          />
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button type="primary" size="large" onClick={handleOpenModalForAdd}>
          Add Category
        </Button>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={data.data}
          rowKey={(record) => record.id}
          pagination={{
            current: page,
            total: data?.pagination?.totalData || 0,
            pageSize: 10,
            showSizeChanger: false,
            onChange: (current) => setPage(current),
          }}
        />
      </div>

      {/* Modal for Add/Edit Category */}
      <Modal
        title={isEditMode ? "Edit Category" : "Add Category"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width={500}
      >
        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            className="mt-2"
          />
          <Button
            type="primary"
            onClick={isEditMode ? handleEditCategory : handleAddCategory}
            className="w-full mt-4"
          >
            {isEditMode ? "Save Changes" : "Save"}
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Category"
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="danger"
            onClick={() => handleDeleteCategory(categoryId)}
          >
            Delete
          </Button>,
        ]}
        centered
        width={400}
      >
        <p>Are you sure you want to delete this category?</p>
      </Modal>
    </>
  );
};

export default Category;
