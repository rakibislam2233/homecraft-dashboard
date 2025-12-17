import {
  FaCalendarAlt,
  FaClock,
  FaHospital,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUser,
} from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetJobDetailsQuery } from "../../../redux/features/jobs/jobsApi";

const baseImageUrl = import.meta.env.VITE_IMAGE_URL;

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetJobDetailsQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError || !data || !data.data) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 underline mb-4"
        >
          ← Back
        </button>
        <h2>Job not found</h2>
      </div>
    );
  }

  const jobDetails = data.data;

  // Helper to format dates
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const salaryFormatted = jobDetails.salary
    ? `$${jobDetails.salary.toLocaleString()}`
    : "-";

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-primary mr-2 cursor-pointer"
          aria-label="Go back"
        >
          <FiChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-primary">Details of this Job</h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 relative">
              {/* Hospital Info */}
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-50 rounded-full text-primary mr-4">
                  <img
                    src={
                      jobDetails.companyLogo ? (
                        baseImageUrl + jobDetails.companyLogo
                      ) : (
                        <FaHospital className="w-6 h-6" />
                      )
                    }
                    alt={jobDetails.hospitalName}
                    className="rounded-full w-8 h-8 object-cover "
                  />

                  {/* <FaHospital className="w-6 h-6" />{" "} */}
                  {/* Placeholder for hospital logo */}
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {jobDetails.hospitalName}
                  </h2>
                  <p className="text-gray-500 flex items-center">
                    <FaMapMarkerAlt className="mr-1" />
                    {jobDetails.address}
                  </p>
                </div>
              </div>

              {/* Job Title and Description */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-primary mb-4">
                  {jobDetails.title}
                </h1>
                <p
                  className="mb-6 text-base"
                  dangerouslySetInnerHTML={{
                    __html: jobDetails.description,
                  }}
                />
                {/* <p className="text-gray-700 mb-6">{jobDetails.description}</p> */}
              </div>

              {/* Responsibilities */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Key Responsibilities:
                </h2>
                <ul className="space-y-2 pl-5 list-disc">
                  {jobDetails.responsibilities?.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Requirements:
                </h2>
                <ul className="space-y-2 pl-5 list-disc">
                  {jobDetails.requirements?.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Benefits:
                </h2>
                <ul className="space-y-2 pl-5 list-disc">
                  {jobDetails.benefits?.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Job summary */}
              <div className="mb-8">
                <p
                  className="mb-6 text-base"
                  dangerouslySetInnerHTML={{
                    __html: jobDetails.summary,
                  }}
                />
                {/* <p className="text-gray-700 mb-6">{jobDetails.summary}</p> */}
              </div>
            </div>
          </div>

          {/* Right Column (Job Overview) */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white lg:sticky lg:top-20 rounded-xl shadow-md overflow-hidden">
              {/* Job Overview Header */}
              <div className="bg-primary text-white p-6">
                <h3 className="text-xl font-bold text-center">Job Overview</h3>
              </div>

              {/* Job Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-gray-700">{jobDetails.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaCalendarAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Start Date
                    </p>
                    <p className="text-gray-700">
                      {formatDate(jobDetails.startDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaCalendarAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Deadline
                    </p>
                    <p className="text-gray-700">
                      {formatDate(jobDetails.deadline)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaUser className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vacancy</p>
                    <p className="text-gray-700">{jobDetails.vacancy}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Hours per week
                    </p>
                    <p className="text-gray-700">{jobDetails.hoursPerWeek}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaMoneyBillWave className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Monthly Pay
                    </p>
                    <p className="text-gray-700">{salaryFormatted}</p>
                  </div>
                </div>
              </div>

              {/* Total Applicants */}
              <div className="p-6">
                <p className="w-full mx-auto text-center bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  Total Applicants ({jobDetails.totalApply || 0})
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
