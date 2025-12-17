import { Button, Image, message, Modal, Upload } from "antd";
import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import xyz from "../../../assets/images/services/frame1.jpg"; // Importing React Icons for Edit and Delete

export default function Advertisement() {
  const [advertisements, setAdvertisements] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/150?text=CoinView",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150?text=Keep+Exploring",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150?text=CoinView",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/150?text=Keep+Exploring",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const handleEdit = (ad) => {
    setCurrentAd(ad);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setAdvertisements(advertisements.filter((ad) => ad.id !== id));
    message.success("Advertisement deleted successfully!");
  };

  const handleImageUpload = (file) => {
    setNewImage(file);
    return false; // Prevent auto upload
  };

  const handleSave = () => {
    if (!newImage) {
      message.error("Please upload an image before saving.");
      return;
    }

    // Update advertisement with the new image
    setAdvertisements(
      advertisements.map((ad) =>
        ad.id === currentAd.id
          ? { ...ad, image: URL.createObjectURL(newImage) }
          : ad
      )
    );
    setIsModalOpen(false);
    setNewImage(null);
    message.success("Advertisement updated successfully!");
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6">Advertisement</h3>
      <p className="text-sm text-gray-500 mb-4">
        [Note: You can upload a maximum of 5 banners.]
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {advertisements.map((ad) => (
          <div
            key={ad.id}
            className="relative border p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Image
              // src={ad.image}
              src={xyz}
              alt={`Advertisement ${ad.id}`}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                icon={<FaEdit />}
                type="primary"
                shape="circle"
                size="small"
                onClick={() => handleEdit(ad)}
              />
              <Button
                icon={<FaTrashAlt />}
                type="danger"
                shape="circle"
                size="small"
                onClick={() => handleDelete(ad.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        className="mt-6 w-full border-dashed border-2 border-orange-400 py-4 text-orange-400"
        icon={<FaEdit />}
        type="text"
        onClick={() => setIsModalOpen(true)}
      >
        Upload Image
      </Button>

      {/* Edit Modal */}
      <Modal
        title="Edit Advertisement"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
        centered
        width={500}
      >
        <div className="space-y-4">
          <Upload
            beforeUpload={handleImageUpload}
            showUploadList={false}
            accept="image/*"
          >
            <Button block>Upload Image</Button>
          </Upload>
          {newImage && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(newImage)}
                alt="New Advertisement"
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
