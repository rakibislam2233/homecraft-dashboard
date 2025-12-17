import { Button, DatePicker, Form, Input, Modal, Rate, Table } from "antd";
import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  useGetAllProfessionalsQuery,
  useGiveReviewMutation,
} from "../../../redux/features/user/userApi";
import { ErrorSwal, SuccessSwal } from "../../../utils/allSwalFire";

export default function Professional() {
  const navigate = useNavigate();
  const [reviewForm] = Form.useForm();

  const [page, setPage] = useState(1);
  const [date, setDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewProfessional, setReviewProfessional] = useState(null);

  const { data: professionalData, isLoading } = useGetAllProfessionalsQuery({
    page,
    date,
    searchTerm,
  });

  const [postReviewApi, { isLoading: isReviewLoading }] =
    useGiveReviewMutation();

  const professionals = professionalData?.data?.results || [];
  const totalProfessionals =
    professionalData?.data?.pagination?.totalResult || 0;
  const limit = professionalData?.data?.pagination?.limit || 10;

  const dataToTableData = (professionals) => {
    return professionals.map((professional) => ({
      key: professional.id,
      id: professional.id.slice(-6),
      fullName: professional.profile?.fullName,
      email: professional.email,
      phoneNumber: professional.profile?.phoneNumber,
      specification: professional.role,
      createdAt: dayjs(professional.createdAt).format("DD/MM/YYYY"),
      fullProfessionalData: professional,
    }));
  };

  const tableData = dataToTableData(professionals);

  const handleDateChange = (dateObject, dateString) => {
    setDate(dateString);
    setPage(1);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    setPage(1);
  };

  const showDeleteModal = (record) => {
    setSelectedProfessional(record.fullProfessionalData);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    console.log("Deleting professional:", selectedProfessional?._id);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const showReviewModal = (record) => {
    setReviewProfessional(record.fullProfessionalData);
    setIsReviewModalOpen(true);
    reviewForm.resetFields();
    reviewForm.setFieldsValue({
      rating: 4,
      reviewerType: "admin",
    });
  };

  const handleReviewCancel = () => {
    setIsReviewModalOpen(false);
    setReviewProfessional(null);
    reviewForm.resetFields();
  };

  const handleReviewSubmit = async (values) => {
    const { reviewerType, rating, detailReview } = values;

    console.log("Captured Rating:", rating);

    const payload = {
      professionalId: reviewProfessional?._id || reviewProfessional?.id,
      reviewerType,
      rating,
      comment: detailReview,
    };

    console.log("Submitting Review Payload:", payload);

    try {
      const response = await postReviewApi(payload).unwrap();
      SuccessSwal({
        title: "",
        text:
          response?.message ||
          response?.data?.message ||
          "Review send successfully statically!",
      });
      // message.success("Review added successfully!");
    } catch (error) {
      ErrorSwal({
        title: "",
        text:
          error?.message ||
          error?.data?.message ||
          "Review are not send properly!",
      });
      // message.error("Failed to submit review.");
    }

    setIsReviewModalOpen(false);
    setReviewProfessional(null);
    reviewForm.resetFields();
  };

  const handleRateChange = (value) => {
    reviewForm.setFieldsValue({ rating: value });
  };

  const columns = [
    {
      title: "#Professional.ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Professional Name",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Specification",
      dataIndex: "specification",
      key: "specification",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Professional Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "professionalAddress",
      align: "center",
      render: (address) =>
        address?.formattedAddress ? address.formattedAddress : "N/A",
    },
    {
      title: "Review",
      dataIndex: "reviewButton",
      key: "reviewButton",
      align: "center",
      render: (_, record) => (
        <div className="">
          <button
            onClick={() => showReviewModal(record)}
            className="bg-gradient-to-b from-[#008FBFA6] to-[#007399] text-white rounded w-[160px] h-[30px] shadow-lg"
          >
            Add Review
          </button>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-4">
          <button
            onClick={() => showDeleteModal(record)}
            className="text-red-500 rounded-full bg-[#FDFAF3] p-1 border"
          >
            <RiDeleteBin6Line size={16} />
          </button>
          <button
            onClick={() => navigate(`/all-users/professional/${record.key}`)}
            className="text-[#883DBD] rounded-full bg-[#FDFAF3] p-1 border"
          >
            <BsInfoCircle size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto">
      {/* total professionals */}
      <div className="border border-black shadow-lg rounded flex justify-start items-center gap-4 p-4 my-4">
        <div className="bg-primary p-4 rounded text-white">
          <FaUserCog size={32} />
        </div>
        <div>
          <div className="text-2xl font-semibold">Total Professional</div>
          <div className="text-3xl text-primary font-bold">
            {totalProfessionals}
          </div>
        </div>
      </div>
      {/* below content */}
      <div className="border shadow-sm rounded-lg">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-2xl">Professional’s List</h3>
          <div className="flex justify-around gap-4">
            {/* Search Bar */}
            <DatePicker
              placeholder="Select Date"
              style={{ width: "150px" }}
              className="rounded-full"
              onChange={handleDateChange}
            />
            <Input
              placeholder="Search by name, email or specialization"
              value={searchTerm}
              onChange={handleSearchTermChange}
              style={{ width: "300px" }}
              className="rounded-full"
              onPressEnter={handleSearch}
            />
            <Button
              className="bg-primary text-white rounded-full"
              type="primary"
              icon={<IoSearch />}
              onClick={handleSearch}
            ></Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
          className="shadow-md rounded"
          pagination={{
            pageSize: limit,
            total: totalProfessionals,
            current: page,
            onChange: (newPage) => {
              setPage(newPage);
            },
          }}
        />
      </div>

      {/* review modal here */}
      <Modal
        title={
          <div className="text-center text-xl font-bold">Give a Review</div>
        }
        open={isReviewModalOpen}
        onCancel={handleReviewCancel}
        centered
        footer={null}
        className="review-modal-custom"
        width={400}
      >
        <Form
          form={reviewForm}
          key={
            reviewProfessional?._id || reviewProfessional?.id || "new-review"
          }
          layout="vertical"
          onFinish={handleReviewSubmit}
          initialValues={{
            rating: 4,
            reviewerType: "admin",
          }}
          className="mt-6"
        >
          <Form.Item
            name="rating"
            rules={[{ required: true, message: "Please give a star rating!" }]}
          >
            <div className="flex justify-center">
              <Rate
                allowHalf
                defaultValue={3.5}
                style={{ fontSize: 32 }}
                onChange={handleRateChange}
              />
            </div>
          </Form.Item>

          <Form.Item
            label={<div className="font-semibold">Reviewer Type</div>}
            name="reviewerType"
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label={<div className="font-semibold">Detail Review</div>}
            name="detailReview"
            rules={[
              { required: true, message: "Please write a detailed review!" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Write your detailed review here..."
            />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              loading={isReviewLoading}
              type="primary"
              htmlType="submit"
              className="w-full h-12 bg-primary text-white border-none rounded-lg text-lg font-semibold"
            >
              Send Review
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        centered
        footer={[
          <div className="flex justify-center gap-4" key="delete-footer">
            <button
              key="cancel"
              onClick={handleDeleteCancel}
              className="border border-gray-300 rounded-full px-8 py-2 mt-4 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              key="delete"
              onClick={handleDelete}
              className="bg-red-600 text-white rounded-full px-8 py-2 mt-4 hover:bg-red-700"
            >
              Delete
            </button>
          </div>,
        ]}
      >
        {selectedProfessional && (
          <div className="space-y-4 mt-4 text-center">
            <p className="text-lg">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {selectedProfessional.profile?.fullName}
              </span>
              ?
            </p>
            <p className="text-red-600 font-bold">
              This action cannot be undone.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
