import { Button, Table } from "antd";
import React, { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import DashboardModal from "./DashboardModal";
const DashboardHomeTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };
  const columns = [
    {
      title: "#Tr.ID",
      dataIndex: "transIs",
      key: "transIs",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (data) => (
        <Button
          onClick={() => showModal(data)}
          type="text"
          shape="circle"
          className="px-0 py-0 text-white"
        >
          <FiAlertCircle size={22} />
        </Button>
      ),
    },
  ];
  const data = [];
  for (let index = 0; index < 20; index++) {
    data.push({
      transIs: "12345678",
      name: "Henry",
      subscription: "Standard",
      amount: "$9.99",
      date: "16 Apr 2024",
      _id: index,
    });
    // const element = array[index];
  }
  return (
    <div className="bg-playground rounded-lg py-[20px]">
      <div>
        <h3 className="text-2xl text-white px-6 pb-5">
          {"Recent Transactions"}
        </h3>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
      <DashboardModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        <div className="flex flex-col justify-between">
          <div className="text-sm text-white py-2">
            <h6 className="font-medium text-center text-lg">
              Transaction Details
            </h6>
            <div className="flex justify-between border-b border-blue-400 py-5">
              <p>Transaction ID : </p>
              <p className="font-medium">{modalData.transIs}</p>
            </div>
            <div className="flex justify-between border-b border-blue-400 py-5">
              <p>Date : </p>
              <p className="font-medium">{modalData.date}</p>
            </div>
            <div className="flex justify-between border-b border-blue-400 py-5">
              <p>User name :</p>
              <p className="font-medium">{modalData.name}</p>
            </div>
            <div className="flex justify-between border-b border-blue-400 py-5">
              <p>A/C number :</p>
              <p className="font-medium">{"****  ****  ****  *545"}</p>
            </div>
            <div className="flex justify-between border-b border-blue-400 py-5">
              <p>A/C holder name :</p>
              <p className="font-medium">{"Henry"}</p>
            </div>
            <div className="flex justify-between border-b border-blue-400 py-5">
              <p>Transaction amount :</p>
              <p className="font-medium">{modalData.amount}</p>
            </div>
          </div>
          <div className="flex justify-center py-[40px] ">
            <Button size="middle" type="primary" className="w-44 rounded-xl">
              Okay
            </Button>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default DashboardHomeTable;
