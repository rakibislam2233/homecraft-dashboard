import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUser,
} from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

export default function JobPostPreview() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <p>No job data to preview.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
        >
          Back to Post
        </button>
      </div>
    );
  }

  // Destructure with fallback defaults
  const {
    title = "Registered nurse - progressive care",
    address = "New York, USA",
    deadline = "",
    jobType = "Full time",
    salary = "$1520 - $1600",
    vacancy = "12",
    startDate = "",
    hoursPerWeek = "38",
    description = "",
    summary = "",
    companyLogoName = "Logo.jpg",
    responsibilities = [],
    requirements = [],
    benefits = [],
  } = state;

  const formatDate = (d) => {
    if (!d) return "";
    try {
      const date = new Date(d);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return d;
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white min-h-screen rounded-lg shadow-md p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Header */}
      <div className="lg:col-span-3 flex items-center mb-6 sticky top-0 p-4 shadow">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="mr-4 p-2 rounded hover:bg-gray-200 transition"
        >
          <FiChevronLeft className="h-6 w-6 text-primary" />
        </button>
        <h1 className="text-2xl font-bold text-primary">Preview Job Post</h1>
      </div>

      {/* Left Column */}
      <div className="lg:col-span-2">
        <div className="flex items-center mb-6 gap-4">
          {/* Show company logo if available */}
          {companyLogoName && (
            <img
              src={companyLogoName}
              alt="Company Logo"
              className="w-20 h-20 object-contain rounded-md"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold text-primary">{title}</h2>
            <p className="text-gray-500">{address}</p>
          </div>
        </div>

        <div
          className="mb-6"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <section className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Key Responsibilities:</h3>
          {responsibilities.length ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No responsibilities listed.</p>
          )}
        </section>

        <section className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Requirements:</h3>
          {requirements.length ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {requirements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No requirements listed.</p>
          )}
        </section>

        <section className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Benefits:</h3>
          {benefits.length ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {benefits.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No benefits listed.</p>
          )}
        </section>

        <div className="mb-6" dangerouslySetInnerHTML={{ __html: summary }} />
      </div>

      {/* Right Column (Job Overview) */}
      <div className="w-full ">
        <div className="bg-white lg:sticky lg:top-20 rounded-xl shadow-md overflow-hidden">
          <div className="bg-primary text-white p-6">
            <h3 className="text-xl font-bold text-center">Job Overview</h3>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-start">
              <FaMapMarkerAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-gray-700">{address}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaCalendarAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500">Start Date</p>
                <p className="text-gray-700">{formatDate(startDate)}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaCalendarAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500">Deadline</p>
                <p className="text-gray-700">{formatDate(deadline)}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaUser className="text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500">Vacancy</p>
                <p className="text-gray-700">{vacancy}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaClock className="text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Hours per week
                </p>
                <p className="text-gray-700">{hoursPerWeek}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaMoneyBillWave className="text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Pay</p>
                <p className="text-gray-700">{salary}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <button
              className="mt-6 w-full bg-primary text-white py-3 rounded hover:bg-primary transition"
              onClick={() => navigate(-1)}
            >
              Back to Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
