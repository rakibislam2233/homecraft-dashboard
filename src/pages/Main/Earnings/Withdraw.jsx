import { Button, DatePicker, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import DashboardModal from "../../../Components/DashboardModal";
import { cn } from "../../../lib/utils";

// Mock API fetch (replace with actual API)
const fetchWithdrawData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          key: 1,
          name: "Josef Endrik",
          amount: 1000,
          payment: 900,
          account: "39*****56775",
          paymentRequest: "Pending",
          joinDate: "16 Apr 2024",
        },
        {
          key: 2,
          name: "Victoria Smith",
          amount: 2000,
          payment: 1500,
          account: "48*****23783",
          paymentRequest: "Accepted",
          joinDate: "17 Apr 2024",
        },
        // Add more mock data here...
      ]);
    }, 1000);
  });
};

const Withdraw = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [withdrawData, setWithdrawData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getWithdrawData = async () => {
      try {
        const data = await fetchWithdrawData();
        setWithdrawData(data);
      } catch (error) {
        toast.error("Failed to load withdrawal data.");
      } finally {
        setIsLoading(false);
      }
    };

    getWithdrawData();
  }, []);

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const columns = [
    {
      title: "#S.ID",
      dataIndex: "key",
      key: "key",
      render: (text) => (
        <button
          onClick={(e) => {
            navigator.clipboard.writeText(e.target.innerText);
            toast.success("Copied to clipboard!", {
              position: "bottom-center",
            });
          }}
          className="outline-none active:text-blue-600 transition-all"
        >
          {"454465456" + text}
        </button>
      ),
    },
    {
      title: "Salon Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Account Number",
      dataIndex: "account",
      key: "account",
      render: (text) => <span className="pl-4">{text}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <span>{text}$</span>,
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      render: (text) => <span>{text}$</span>,
    },
    {
      title: "Action",
      key: "paymentRequest",
      render: (data) => (
        <Button
          onClick={() => showModal(data)}
          className={cn("w-24 text-white bg-[#1B7443] ")}
        >
          Pay Now
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg py-[16px]">
      <div className="px-6 pb-5 pt-1 flex justify-between items-center">
        <h3 className="text-2xl font-sans">{"Withdraw request"}</h3>
        <div className="flex justify-end gap-x-4">
          <DatePicker
            placeholder="Date"
            style={{ width: "150px" }}
            className="custom-datepicker rounded-full text-[#222222] px-3.5 text-sm"
            onChange={onChange}
          />
          <Input
            className="focus:outline-none outline-none rounded-full placeholder:text-[#222222] px-3.5 text-sm w-[170px]"
            placeholder="User Name"
          />
          <Button
            className="bg-primary text-white border-none"
            type="primary"
            shape="circle"
            icon={<IoSearch className="" />}
          />
        </div>
      </div>

      {/* Table Display */}
      <Table
        columns={columns}
        dataSource={withdrawData}
        loading={isLoading}
        pagination={{
          position: ["bottomCenter"],
          showQuickJumper: true,
        }}
      />

      {/* Modal */}
      <DashboardModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        maxWidth={"850px"}
      >
        <div className="flex flex-col justify-between text-[#646464] font-sans">
          <h6 className="font-sans text-center text-2xl pt-[15px]">
            Withdraw Request Details
          </h6>
          <div className="space-y-[18px] divide-y divide-gray-100 border-b border-gray-100 pb-5 px-2">
            <div className="flex justify-between pt-[18px]">
              <p>Beautician ID :</p>
              <p className="">#{modalData.id}12345678</p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Beautician Name :</p>
              <p className="Victor">{modalData.name}</p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Account Number :</p>
              <p className="">{"****  ****  ****  *545"}</p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Amount Requested :</p>
              <p className="">${modalData.amount}</p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Date :</p>
              <p className="">{modalData.joinDate}</p>
            </div>
          </div>
          <div className="flex justify-center py-4 px-11 gap-x-6 mt-5">
            <Button
              size="middle"
              type="primary"
              className="w-52 rounded-lg bg-primary"
            >
              Accept
            </Button>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Withdraw;
