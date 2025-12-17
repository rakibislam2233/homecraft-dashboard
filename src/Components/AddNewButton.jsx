import { Button } from "antd";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AddNewButton = ({ text, path = "add-new" }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end">
      <Button
        onClick={() => navigate(path)}
        type="primary"
        size="large"
        className="rounded-full px-8"
        aria-label={`Navigate to ${text}`}
      >
        <FiPlus /> {text}
      </Button>
    </div>
  );
};

export default AddNewButton;
