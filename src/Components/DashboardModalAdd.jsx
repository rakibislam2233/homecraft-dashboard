import React from "react";
import { Button, Form, Input } from "antd";

const DashboardModalAdd = ({
  isModalOpen,
  setIsModalOpen,
  handleSave,
  modalData,
}) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg w-[400px]">
        <h3 className="text-xl mb-4">Add Category</h3>
        <Form
          name="categoryForm"
          layout="vertical"
          initialValues={{
            name: modalData.name || "",
          }}
          onFinish={handleSave}
        >
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input size="large" />
          </Form.Item>

          {/* Image Upload */}
          <Form.Item label="Category Image" name="image">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    // Assuming modalData contains the image
                    setModalData({ ...modalData, image: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </Form.Item>

          <div className="flex justify-between mt-6">
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Add Category
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DashboardModalAdd;
