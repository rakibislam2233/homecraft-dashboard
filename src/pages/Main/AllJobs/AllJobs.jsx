import { Button, message, Modal, Pagination, Tooltip } from "antd";
import { useState } from "react";
import { FaHospital, FaPlus } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  useDeleteJobMutation,
  useGetJobsQuery,
} from "../../../redux/features/jobs/jobsApi";

const baseImageUrl = import.meta.env.VITE_IMAGE_URL;

export default function AllJobs() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const { data, refetch } = useGetJobsQuery({ page });
  console.log(data);

  const [deleteJob] = useDeleteJobMutation();

  const jobs = data?.data?.allJobs || [];

  const handlePaginationChange = (page) => {
    setPage(page);
  };

  const totalItems = data?.data?.pagination?.totalData || 0;

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      // Pass object with id as expected by API
      await deleteJob({ id: deleteId }).unwrap();
      message.success("Job deleted successfully");
      setIsModalOpen(false);
      setDeleteId(null);
      refetch();
    } catch (error) {
      message.error("Failed to delete job");
      setIsModalOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="z-20" style={{ padding: 20 }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-primary text-2xl font-bold mb-4">
            Total jobs: {jobs.length}
          </h3>
          <Button type="primary" onClick={() => navigate("/job-post")}>
            Add Job Post <FaPlus />
          </Button>
        </div>
        {jobs?.map((job) => (
          <div
            key={job.id}
            style={{
              backgroundColor: "#E6F0FA",
              borderRadius: 10,
              padding: 20,
              marginBottom: 20,
              display: "flex",
              gap: 15,
              alignItems: "flex-start",
            }}
          >
            {/* Left Icon */}
            <img
              src={
                job.companyLogo ? (
                  baseImageUrl + job.companyLogo
                ) : (
                  <FaHospital className="w-6 h-6" />
                )
              }
              alt={job.hospitalName}
              className="rounded-full w-8 h-8 object-cover "
            />

            {/* Job Info */}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold", fontSize: 16 }}>
                {job?.hospitalName}
              </div>
              <div style={{ fontSize: 12, color: "gray" }}>{job.location}</div>
              <div className="text-primary font-bold text-xl ">
                {job?.title}
              </div>
              <div style={{ fontSize: 14, marginTop: 6, lineHeight: 1.4 }}>
                <p
                  className="mb-6 text-base"
                  dangerouslySetInnerHTML={{
                    __html: job.description.slice(0, 150) + "...",
                  }}
                />
              </div>
              <div className="text-primary font-bold text-lg ">
                Monthly Pay: $
                {job.salary ? `${job.salary.toLocaleString()}` : "-"}
              </div>
            </div>

            {/* Right side buttons */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                alignItems: "flex-end",
              }}
            >
              {/* <Tooltip title="Edit">
                <Button
                  size="small"
                  shape="circle"
                  icon={<FiEdit />}
                  onClick={() => navigate(`/edit-job-post/${job._id}`)}
                />
              </Tooltip> */}
              <Button
                type="primary"
                onClick={() => navigate(`/edit-job-post/${job._id}`)}
              >
                Edit Job Post <FiEdit />
              </Button>
              <button
                style={{
                  backgroundColor: "#1077BC",
                  borderRadius: 6,
                  padding: "6px 12px",
                  color: "white",
                  fontWeight: "600",
                  fontSize: 14,
                }}
                onClick={() => navigate(`/all-jobs/all-applicants/${job._id}`)}
              >
                Total Applicants : {job.totalApply.toString().padStart(2, "0")}
              </button>

              <button
                style={{
                  backgroundColor: "#1077BC",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 16px",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={() => navigate(`/all-jobs/${job._id}`)}
              >
                Details
              </button>
              <Tooltip title="Delete">
                <Button
                  size="small"
                  shape="circle"
                  danger
                  icon={<FiTrash2 />}
                  onClick={() => openDeleteModal(job._id)}
                />
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center p-4">
        <Pagination
          current={page}
          total={totalItems}
          pageSize={10}
          onChange={handlePaginationChange}
          showQuickJumper
          showSizeChanger={false}
        />
      </div>
      <Modal
        title="Confirm Delete"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
        centered
      >
        <p>Are you sure you want to delete this job?</p>
      </Modal>
    </>
  );
}
