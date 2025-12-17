import React, { useEffect, useState } from "react";
import DashboardChart from "../../../Components/DashboardCahrt";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import { useGetStatisticsQuery } from "../../../redux/features/common/commonApi";
import { Spin } from "antd";

const Earnings = () => {
  const [earningsData, setEarningsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data } = useGetStatisticsQuery();
  console.log(data?.data);

  // Fetch earnings data dynamically (replace with real API endpoint)
  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await fetch("/api/earnings"); // replace with actual API
        const data = await response.json();
        setEarningsData(data);
      } catch (error) {
        console.error("Error fetching earnings data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  // Formatting currency function
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  if (isLoading) {
    return (
      <LoaderWraperComp
        loader={
          <div>
            {" "}
            <Spin size="large" className="flex justify-center items-center" />
          </div>
        }
      />
    );
  }

  return (
    <div className="space-y-[16px]">
      <div className="bg-white p-[24px] pt-1 rounded-lg space-y-6">
        <p className="py-5 border-b border-info text-primary text-2xl font-sans">
          Earning
        </p>
        <div className="grid grid-cols-2 gap-x-6">
          <div className="bg-[#FFF8E1] px-[24px] py-6 rounded-2xl space-y-1 flex flex-col justify-center items-center drop-shadow-md border border-gray-100">
            <h3 className="text-2xl font-semiboldthin">{"Total Amount"}</h3>
            <h3 className="text-2xl font-semibold text-info">
              {data?.data && formatCurrency(data?.data?.totalRevenue)}
            </h3>
          </div>
          <div className="bg-[#FFF8E1] px-[24px] py-6 rounded-2xl space-y-1 flex flex-col justify-center items-center drop-shadow-md border border-gray-100">
            <h3 className="text-2xl font-semiboldthin">{"Transactions"}</h3>
            <h3 className="text-2xl font-semibold text-info">
              {data?.data?.totalTransactions}
            </h3>
          </div>
        </div>
      </div>
      <DashboardChart />
    </div>
  );
};

export default Earnings;
