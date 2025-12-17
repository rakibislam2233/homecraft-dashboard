// export default function AllApplicants() {
//   return (
//     <>
//       <h3>AllApplicants</h3>
//     </>
//   );
// }

import { Button, DatePicker, Pagination, Spin, Table } from "antd";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useGetJobApplicantsQuery } from "../../../redux/features/jobs/jobsApi";

export default function AllApplicants() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const { data, isLoading } = useGetJobApplicantsQuery({ id, page, date });

  console.log(data?.data?.applicants);

  // const applicants = data?.data?.applicants || [];
  const totalItems = data?.data?.pagination?.totalData || 0;

  // Column definitions for the table
  const columns = [
    {
      title: "User ID",
      dataIndex: "_id",
      key: "_id",
      align: "center",
    },
    {
      title: "User Name",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Phone No.",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          className="bg-primary text-white "
          onClick={() => handleDetailsClick(record._id)}
        >
          Details
        </Button>
      ),
    },
  ];

  const handleDateChange = (date, dateString) => {
    setDate(dateString);
    setPage(1);
  };

  const handleDetailsClick = (id) => {
    navigate(`/all-jobs/all-applicants/details/${id}`);
  };

  const handlePaginationChange = (page) => {
    setPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spin size="large" />
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="bg-button rounded-lg py-4 shadow-md">
        <div className="flex justify-between items-center p-4">
          {/* <h3 className="text-2xl text-white font-semibold">All Applicants</h3> */}
          <div className="text-white shadow-sm px-4 flex items-center">
            <button
              onClick={handleBack}
              className="mr-2 cursor-pointer"
              aria-label="Go back"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold ">All Applicants</h1>
          </div>
          <div className="flex justify-around gap-4">
            <DatePicker
              placeholder="Select Date"
              style={{ width: "150px" }}
              className="rounded-full"
              onChange={handleDateChange}
            />
            <Button
              className="bg-primary/50 text-white"
              type="primary"
              icon={<IoSearch />}
              onClick={() => setPage(1)}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={
            data?.data?.applicants.map((applicant) => ({
              ...applicant?.parsonal_info,
              key: applicant._id,
              _id: applicant._id,
              phone: applicant?.parsonal_info?.phone
                ? applicant?.parsonal_info?.phone
                : "N/A",
            })) || []
          }
          pagination={false}
          rowKey="id"
        />
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
    </>
  );
}
