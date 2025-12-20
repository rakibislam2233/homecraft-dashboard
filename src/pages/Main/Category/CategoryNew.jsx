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
import { IoAddOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

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
          className="w-16 h-16 object-cover rounded"
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
      <div className="flex justify-end mb-6 mt-8">
        <button
          className="gradient-button text-lg lg:text-xl font-bold rounded-xl"
          size="large"
          onClick={handleOpenModalForAdd}
        >
          <IoAddOutline size={30} />
          <span className="font-normal">Add Category</span>
        </button>
      </div>

      <div className="">
        {/* <div className="bg-[#720000] w-full h-[60px] px-4 flx items-center justify-start">
          <h2 className="text-xl lg:text-3xl font-normal text-white">Category List</h2>
        </div> */}
        <Table
          className=""
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
      </div>

      {/* ADD / EDIT MODAL */}
      <Modal
        title={
          <h2 className="text-xl lg:text-2xl">
            {isEditMode ? "Edit Category" : "Add Category"}
          </h2>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        closable={false}
        footer={null}
        centered
      >
        <div
          onClick={() => setIsModalVisible(false)}
          className="absolute top-0.5 right-0.5 w-9 h-9 bg-red-500 flex items-center justify-center cursor-pointer"
          style={{
            borderBottomLeftRadius: "1.25rem",
            borderTopRightRadius: "0.5rem",
          }}
        >
          <RxCross2 className="text-white text-xl" />
        </div>
        <div className="">
          <label htmlFor="categoryName" className="m-0 text-lg font-medium">
            Category Type
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            className="mt-4 py-2"
          />
        </div>
        <div className="w-full mt-4">
          <label htmlFor="categoryName" className="m-0 text-lg font-medium">
            Upload Logo
          </label>
          <Upload
            listType="picture-card"
            className="w-full flex justify-center items-center"
            fileList={fileList}
            showUploadList={false}
            onChange={handleImageChange}
            customRequest={({ onSuccess }) => onSuccess("ok")}
            style={{ width: "100%" }}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-24 object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <UploadOutlined className="text-2xl mb-2" />
                <div>Upload Image</div>
              </div>
            )}
          </Upload>
        </div>

        <Button
          type="primary"
          onClick={isEditMode ? handleEditCategory : handleAddCategory}
          className="w-full mt-6"
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
