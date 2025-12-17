import { Button, DatePicker, Input, Pagination, Table, Tag } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useGetEarningHistoryQuery } from "../../../redux/features/earning/earningApi";
import SessionPrice from "./SessionPrice";

export default function EarningHistory() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const { data, isLoading, isError } = useGetEarningHistoryQuery({
    page,
    limit: 10,
    name: searchTerm,
    date: dateFilter,
  });

  const onChangeDate = (date, dateString) => {
    setDateFilter(dateString);
    setPage(1);
  };

  const handleSearch = () => {
    setPage(1);
  };

  const columns = [
    {
      title: "SI NO.",
      dataIndex: "serialNo",
      key: "serialNo",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
      align: "center",
    },
    {
      title: "Transaction No.",
      dataIndex: "transactionId",
      key: "transactionId",
      align: "center",
      render: (text) => (
        <span className="text-xs font-mono">{text || "-"}</span>
      ),
    },
    {
      title: "Time & Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <span>{text ? dayjs(text).format("h:mm A, DD/MM/YY") : "-"}</span>
      ),
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (text) => <span className="font-bold">${text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <Tag
          color={
            status === "completed"
              ? "green"
              : status === "pending"
              ? "orange"
              : "red"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  // Ensure data.data is always an array
  const tableData = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="">
      <SessionPrice />

      <div className="bg-button rounded-lg py-4 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 px-4">
          <h3 className="text-2xl text-white font-semibold">Earning History</h3>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <DatePicker
              placeholder="Filter by date"
              style={{ width: "100%", maxWidth: "200px" }}
              className="rounded-full"
              onChange={onChangeDate}
              allowClear
            />

            <div className="flex gap-2">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-full px-4"
                placeholder="Search by name or email"
                onPressEnter={handleSearch}
              />
              <Button
                className="bg-secondary text-white"
                type="primary"
                shape="circle"
                icon={<IoSearch />}
                onClick={handleSearch}
              />
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          loading={isLoading}
          rowKey="_id"
          className="mt-4"
          locale={true}
          // locale={{ emptyText: "No data available" }}
        />
      </div>

      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          total={data?.pagination?.totalItem || 0}
          pageSize={10}
          onChange={(page) => setPage(page)}
          showSizeChanger={false}
          showQuickJumper
          className="pagination-white"
        />
      </div>
    </div>
  );
}
