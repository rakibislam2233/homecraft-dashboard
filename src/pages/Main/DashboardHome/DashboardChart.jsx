import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import {MdKeyboardArrowDown} from 'react-icons/md'

const DashboardChart = () => {
  const [year, setYear] = useState(dayjs().year());

  //   // const { data } = useGetApplicantsQuery(year);
  //   // console.log(data?.data);
  // Mock data - replace with your actual data fetching logic
  const data = [
    {
      month: "Jan",
      totalEarnings: 2400,
    },
    {
      month: "Feb",
      totalEarnings: 3600,
    },
    {
      month: "Mar",
      totalEarnings: 4950,
    },
    {
      month: "Apr",
      totalEarnings: 3300,
    },
    {
      month: "May",
      totalEarnings: 6750,
    },
    {
      month: "June",
      totalEarnings: 9100,
    },
    {
      month: "July",
      totalEarnings: 11340,
    },
    {
      month: "Aug",
      totalEarnings: 9880,
    },
    {
      month: "Sep",
      totalEarnings: 7750,
    },
    {
      month: "October",
      totalEarnings: 6670,
    },
    {
      month: "Nov",
      totalEarnings: 4180,
    },
    {
      month: "Dec",
      totalEarnings: 2800,
    },
  ];

  const handleYearChange = (date) => {
    if (date) {
      setYear(date.year());
      // Here you would typically refetch data for the new year
      // Example: refetch(year);
    }
  };

  return (
    <div className="bg-white rounded-lg px-[24px] py-[15px] drop-shadow-lg">
      <div className="flex justify-between items-center">
        <h4 className="text-[20px] text-black font-medium roboto">Earnings</h4>
        <DatePicker
          picker="year"
          className="!text-black custom-year-picker !border-none !w-24"
          value={dayjs().year(year)}
          defaultValue={dayjs().year(year)}
          onChange={handleYearChange}
          suffixIcon={<MdKeyboardArrowDown color="#000" size={24} />}
        />
      </div>
      <LoaderWraperComp>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={data}
            syncId="anyId"
            margin={{
              top: 20,
              left: -10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              tick={{ stroke: "#464343", strokeWidth: 0.5, fill: "#4D0304" }}
              dataKey="month"
            />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderColor: "#ccc",
                color: "#000",
              }}
            />
            <Legend />
            <Bar
              dataKey="totalEarnings"
              name="Monthly Earnings"
              fill="#800000"
              barSize={30}
              radius={[4, 4, 0, 0]} // Added slight radius for better visuals
            />
          </BarChart>
        </ResponsiveContainer>
      </LoaderWraperComp>
    </div>
  );
};

export default DashboardChart;
