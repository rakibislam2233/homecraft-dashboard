import { Button, DatePicker, Input, Modal, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useGetAllUserQuery } from "../../../redux/features/user/userApi";
import { RxInfoCircled } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

export default function Users() {
  const [page, setPage] = useState(1);
  const [date, setDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: userData, isLoading } = useGetAllUserQuery({
    page,
    searchTerm,
    date,
  });

  const clients = userData?.data?.results || [];
  const totalClients = userData?.data?.pagination?.totalResult || 0;
  const limit = userData?.data?.pagination?.limit || 10;

  const dataToTableData = (clients) => {
    return clients.map((client) => ({
      key: client.id,
      id: client.id.slice(-6),
      fullName: client.profile?.fullName,
      email: client.email,
      phoneNumber: client.profile?.phoneNumber,
      createdAt: dayjs(client.createdAt).format("DD/MM/YYYY"),
      fullClientData: client,
    }));
  };

  const tableData = dataToTableData(clients);

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
    setSelectedClient(record.fullClientData);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    console.log("Deleting client:", selectedClient?._id);
    setIsDeleteModalOpen(false);
  };

  const showModal = (record) => {
    setSelectedClient(record.fullClientData);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const columns = [
    {
      title: "#User.ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Client Name",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Client Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (text) => (text ? text : "N/A"),
    },
    {
      title: "Client's Address",
      dataIndex: "address",
      key: "clientAddress",
      align: "center",
      render: (address) =>
        address?.formattedAddress ? address.formattedAddress : "N/A",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      render: (text) => (text ? text : "N/A"),
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
            className="text-red-500 rounded-full bg-[#FDFAF3] p-1 m-0"
          >
            <RiDeleteBin6Line size={20} />
          </button>
          <button
            onClick={() => showModal(record)}
            className="text-[#883DBD] rounded-full bg-[#FDFAF3] p-1 m-0"
          >
            <RxInfoCircled size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto">
      {/* total users/clients number */}
      <div className="border primary-border shadow-lg rounded-xl flex justify-start items-center gap-4 p-4 my-4">
        <div className="bg-primary p-4 rounded text-white">
          <FaUserFriends size={32} />
        </div>
        <div>
          <div className="text-2xl roboto font-semibold">
            Total Client's / User's
          </div>
          <div className="text-3xl text-primary">{totalClients}</div>
        </div>
      </div>

      {/* below content */}
      <div className="border border-[#E4E5E8] rounded-lg">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-2xl">Client's / User's List</h3>
          <div className="flex justify-around gap-4">
            {/* Search Bar */}
            <DatePicker
              placeholder="Select Date"
              style={{ width: "150px" }}
              className="rounded-full px-4 py-2"
              onChange={handleDateChange}
            />
            <Input
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={handleSearchTermChange}
              style={{ width: "300px" }}
              className="rounded-full px-4 py-2"
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
          className="rounded-lg"
          pagination={{
            pageSize: limit,
            total: totalClients,
            current: page,
            onChange: (newPage) => {
              setPage(newPage);
            },
          }}
        />
      </div>

      <Modal
        title={
          <h1 className="text-xl !text-center font-bold "> Client Info </h1>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        closable={false}
        footer={[
          <div className="flex justify-center" key="ok-footer">
            <button
              key="ok"
              type="primary"
              onClick={handleOk}
              className="bg-primary text-white rounded-full px-20 py-2 mt-4"
            >
              OK
            </button>
          </div>,
        ]}
      >
        <div
          onClick={handleCancel}
          className="absolute top-0.5 right-0.5 w-9 h-9 bg-red-500 flex items-center justify-center cursor-pointer"
          style={{
            borderBottomLeftRadius: "1.25rem",
            borderTopRightRadius: "0.5rem",
          }}
        >
          <RxCross2 className="text-white text-xl" />
        </div>
        {selectedClient && (
          <div className=" mt-8">
            <div className=" flex justify-between items-center border-b border-b-slate-500 px-2 pb-0.5">
              <p className="font-semibold m-0">Client Name</p>
              <p className="m-0">{selectedClient.profile?.fullName || "N/A"}</p>
            </div>
            <div className=" flex justify-between items-center border-b border-b-slate-500 px-2 pb-0.5 mt-3">
              <p className="font-semibold m-0">Client Email</p>
              <p className="m-0">{selectedClient.email || "N/A"}</p>
            </div>
            <div className=" flex justify-between items-center border-b border-b-slate-500 px-2 pb-0.5 mt-3 ">
              <p className="font-semibold m-0">Client Address</p>
              <p className="m-0">{selectedClient.address || "N/A"}</p>
            </div>
            <div className=" flex justify-between items-center border-b border-b-slate-500 px-2 pb-0.5 mt-3 ">
              <p className="font-semibold m-0">Phone Number</p>
              <p className="m-0">
                {selectedClient.profile?.phoneNumber || "N/A"}
              </p>
            </div>
            <div className=" flex justify-between items-center border-b border-b-slate-500 px-2 pb-0.5 mt-3 ">
              <p className="font-semibold m-0">Date</p>
              <p className="m-0">
                {dayjs(selectedClient.createdAt).format("DD/MM/YYYY") || "N/A"}
              </p>
            </div>
            <div className=" flex justify-between items-center border-b border-b-slate-500 px-2 pb-0.5 mt-3 ">
              <p className="font-semibold m-0">Verification Status</p>
              <p className="capitalize m-0">
                {selectedClient.verificationStatus || "N/A"}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        closable={false}
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
        <div
          onClick={handleDeleteCancel}
          className="absolute top-0.5 right-0.5 w-9 h-9 bg-red-500 flex items-center justify-center cursor-pointer"
          style={{
            borderBottomLeftRadius: "1.25rem",
            borderTopRightRadius: "0.5rem",
          }}
        >
          <RxCross2 className="text-white text-xl" />
        </div>
        {selectedClient && (
          <div className="space-y-4 mt-4 text-center">
            <p className="text-lg">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {selectedClient.profile?.fullName}
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
