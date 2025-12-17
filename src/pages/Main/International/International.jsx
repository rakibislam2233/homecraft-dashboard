"use client";

import { Button, DatePicker, Pagination, Spin, Table } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useGetInternationalApplicantQuery } from "../../../redux/features/international/internationalApi";

export default function International() {
  const [page, setPage] = useState(1);
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetInternationalApplicantQuery({ page, date });

  console.log(apiData?.data?.jobs);

  const handleDateChange = (date, dateString) => {
    setDate(dateString);
    setPage(1);
  };

  const handlePaginationChange = (page) => {
    setPage(page);
  };

  const handleDetailsClick = (id) => {
    navigate(`/international/${id}`);
  };

  const tableData =
    apiData?.data?.jobs?.map((job) => ({
      key: job._id,
      id: job._id,
      userName: job.name,
      email: job.email,
      phone: job.phone ? job.phone : "N/A",
    })) || [];

  console.log(tableData);
  // Pagination total items from API (totalData)
  const totalItems = apiData?.data?.pagination?.totalData || 0;

  // Show loading spinner while fetching
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spin size="large" />
      </div>
    );
  }

  // Show error message if any
  if (isError) {
    return (
      <div className="text-center text-red-500 p-4">
        Failed to load international applications.
      </div>
    );
  }

  // Define columns for the table
  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
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
          className="bg-primary text-white"
          onClick={() => handleDetailsClick(record.id)}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="bg-button rounded-lg pb-4 shadow-md">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-2xl text-white font-semibold">
            International Applications
          </h3>
          <div className="flex justify-around gap-4">
            <DatePicker
              placeholder="Select Date"
              style={{ width: "150px" }}
              className="rounded-full"
              onChange={handleDateChange}
            />
            <Button
              className="bg-playground text-white"
              type="primary"
              icon={<IoSearch />}
              onClick={() => setPage(1)}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowKey="key"
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
