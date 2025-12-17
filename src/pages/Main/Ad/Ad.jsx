import { Button, Input, Modal, Pagination, Spin, Upload } from "antd";
import React, { useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  useAddBannerMutation,
  useDeleteBannerMutation,
  useEditBannerMutation,
  useGetAllBannerQuery,
} from "../../../redux/features/banner/bannerApi";
import { ErrorSwal, SuccessSwal } from "../../../utils/allSwalFire";

const Ad = () => {
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
  const [deleteBanner] = useDeleteBannerMutation();

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

  const showDeleteConfirm = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const id = categoryToDelete.id;
      console.log(id);
      const response = await deleteBanner(id).unwrap();
      SuccessSwal({
        title: "",
        text: response?.message || "Banner deleted successfully!",
      });
      refetch();
    } catch (error) {
      ErrorSwal({
        title: "",
        text: error?.message || "Failed to delete banner!",
      });
    } finally {
      setIsDeleteModalVisible(false);
      setCategoryToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setCategoryToDelete(null);
  };

  const resetModal = () => {
    setName("");
    setLink("");
    setImage(null);
    setExistingImageUrl("");
    setFileList([]);
    setCategoryId(null);
  };

  const handleOpenModalForAdd = () => {
    resetModal();
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const handleOpenModalForEdit = (banner) => {
    setIsEditMode(true);
    setCategoryId(banner.id);
    setName(banner.name);
    setLink(banner.link);
    setExistingImageUrl(banner.image);

    if (banner.image) {
      setFileList([
        {
          uid: "-1",
          name: "current-image",
          status: "done",
          url: `${baseUrl}${banner.image}`,
        },
      ]);
    }

    setIsModalVisible(true);
  };

  const handleBeforeUpload = (file) => {
    setExistingImageUrl("");
    setImage(file);
    setFileList([file]);
    return false;
  };

  const handleRemove = () => {
    setImage(null);
    setFileList([]);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <p>{"[Note: You can upload here max 5 banner.]"}</p>
        <Button type="primary" size="large" onClick={handleOpenModalForAdd}>
          <FaPlus /> Add Banner
        </Button>
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-64">
            <Spin size="large" />
          </div>
        ) : data?.data.length === 0 ? (
          <>
            <p className=" font-semibold text-xl text-center text-red-600 ">
              {" "}
              No category found. Please add some category!{" "}
            </p>
          </>
        ) : (
          <>
            <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data?.data?.map((category) => (
                <div
                  key={category.name}
                  className="relative border p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={`${baseUrl}${category.image}`}
                    alt={category.name}
                    className="w-full h-52 object-cover rounded-md mb-4"
                  />
                  <p className="text-lg font-semibold text-center">
                    {category.name}
                  </p>
                  <div className="flex gap-2 absolute top-2 right-4">
                    <Button
                      type="primary"
                      shape="circle"
                      onClick={() => handleOpenModalForEdit(category)}
                      block
                      className="mt-4"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      type="default"
                      shape="circle"
                      onClick={() => showDeleteConfirm(category)}
                      block
                      className="mt-4"
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal for Add/Edit Category */}
      <Modal
        title={isEditMode ? "Edit Category" : "Add Category"}
        open={isModalVisible}
        onCancel={() => {
          resetModal();
          setIsModalVisible(false);
        }}
        footer={null}
        centered
        width={400}
      >
        <div className="space-y-4">
          <Upload
            beforeUpload={handleBeforeUpload}
            maxCount={1}
            fileList={fileList}
            onRemove={handleRemove}
            listType="picture-card"
            accept="image/*"
          >
            {fileList.length === 0 && (
              <div>
                <div style={{ marginTop: 8 }}>Upload Image</div>
              </div>
            )}
          </Upload>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Banner Name"
            className="mt-2"
          />
          <Input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Banner link"
            className="mt-2"
          />

          <Button
            type="primary"
            onClick={isEditMode ? handleEditCategory : handleAddCategory}
            className="w-full mt-4"
            disabled={!name || (!image && !isEditMode)}
          >
            {isEditMode ? "Save Changes" : "Save"}
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        centered
        visible={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
        width={400}
      >
        <p>Are you sure you want to delete this Banner?</p>
      </Modal>

      {/* Pagination */}
      <div className=" flex justify-center py-8">
        <Pagination
          defaultCurrent={1}
          showQuickJumper={true}
          showSizeChanger={false}
          total={data?.pagination?.totalData || 0}
          current={page}
          onChange={(currentPage) => setPage(currentPage)}
          pageSize={10}
        />
      </div>
    </>
  );
};

export default Ad;
