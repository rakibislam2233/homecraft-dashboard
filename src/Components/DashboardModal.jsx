import { Modal } from "antd";
import React from "react";
import { IoMdClose } from "react-icons/io";

const DashboardModal = ({
  isModalOpen,
  setIsModalOpen,
  closeIcon = true, // Default close icon is true
  children,
  maxWidth = "444px", // Default width
  title, // Optional title prop
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Handle ESC key to close modal for better accessibility
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsModalOpen(false);
    }
  };

  React.useEffect(() => {
    // Add event listener for ESC key
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Modal
      title={title || null} // Optional title handling
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      closeIcon={false} // Disable Ant Design's close icon
      style={{
        maxWidth: maxWidth, // Allow custom maxWidth
      }}
    >
      <div>
        {closeIcon && (
          <button
            onClick={handleCancel}
            type="button"
            className="absolute top-0 right-0 text-white bg-[#EB5757] shadow-inner px-2.5 py-2 rounded-none rounded-bl-xl rounded-tr-md"
          >
            <IoMdClose size={23} />
          </button>
        )}
        {children}
      </div>
    </Modal>
  );
};

export default DashboardModal;
