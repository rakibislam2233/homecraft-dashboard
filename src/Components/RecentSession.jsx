import { Pagination, Table } from "antd";
import React, { useState } from "react";

const data = {
  data: [
    {
      id: 1,
      sessionName: "Winter Season",
      location: "Bonsree, Dhaka",
      price: "$400",
      dateTime: "03-16-25",
      registeredUsers: 25,
    },
    {
      id: 2,
      sessionName: "Winter Season",
      location: "New York, USA",
      price: "$400",
      dateTime: "03-16-25",
      registeredUsers: 25,
    },
    {
      id: 3,
      sessionName: "Winter Season",
      location: "Paris, French",
      price: "$400",
      dateTime: "03-16-25",
      registeredUsers: 25,
    },
    // Add more data here as needed
  ],
  pagination: { totalData: 20 },
};

export default function RecentSession() {
  const [page, setPage] = useState(1);

  const columns = [
    {
      title: "SL No",
      dataIndex: "id",
      key: "id",
      render: (text) => `#${text}`,
      align: "center",
    },
    {
      title: "Session Name",
      dataIndex: "sessionName",
      key: "sessionName",
      align: "center",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
      align: "center",
    },
    {
      title: "Registered Users",
      dataIndex: "registeredUsers",
      key: "registeredUsers",
      align: "center",
    },
  ];

  const paginatedData = data.data.slice((page - 1) * 5, page * 5);

  return (
    <div className="bg-darkGreen rounded-lg">
      <div className="flex justify-start items-center gap-2 bg-button rounded-t-md h-[80px] text-white text-2xl font-semibold pl-8">
        <h2>Recent Session</h2>
      </div>

      <Table
        columns={columns}
        dataSource={paginatedData}
        pagination={false}
        className="mt-4"
      />

      <div className="flex justify-center p-4">
        <Pagination
          defaultCurrent={1}
          showQuickJumper={true}
          showSizeChanger={false}
          total={data.pagination.totalData}
          current={page}
          pageSize={5}
          onChange={(currentPage) => setPage(currentPage)}
          className="text-white"
        />
      </div>
    </div>
  );
}
