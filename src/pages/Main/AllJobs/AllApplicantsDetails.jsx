import { useNavigate, useParams } from "react-router-dom";
import { useGetJobApplicantDetailsQuery } from "../../../redux/features/jobs/jobsApi";

export default function AllApplicantsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetJobApplicantDetailsQuery(id);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl font-medium text-gray-700">
          Applicant not found
        </h3>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
        >
          Back
        </button>
      </div>
    );
  }

  const applicant = data.data;
  const personalInfo = applicant.parsonal_info || {};
  const licenses = applicant.professional_licenses || [];
  const certifications = applicant.certifications || [];
  const educationList = applicant.education || [];
  const employmentList = applicant.emploment || [];

  // Helper to format date (YYYY-MM-DD)
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header with back button */}
      <div className="bg-secondary p-3 flex items-center">
        <button
          onClick={handleBack}
          className="flex items-center text-primary hover:text-primary/80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Applicants Details
        </button>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4">
        {/* Personal Information */}
        <div className="bg-secondary rounded-md p-6 mb-4">
          <h3 className="text-center text-lg font-semibold mb-6">
            Personal Information
          </h3>

          <div className="mb-6 space-y-2">
            <div>
              <span className="font-medium">Full Name: </span>
              {personalInfo.fullName || "N/A"}
            </div>
            <div>
              <span className="font-medium">Email: </span>
              {personalInfo.email || "N/A"}
            </div>
            <div>
              <span className="font-medium">Phone no: </span>
              {personalInfo.phone || "N/A"}
            </div>
            <div>
              <span className="font-medium">Gender: </span>
              {personalInfo.gender || "N/A"}
            </div>
            <div>
              <span className="font-medium">Country: </span>
              {personalInfo.country || "N/A"}
            </div>
            <div>
              <span className="font-medium">State: </span>
              {personalInfo.state || "N/A"}
            </div>
            <div>
              <span className="font-medium">City: </span>
              {personalInfo.city || "N/A"}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-700 mb-2">Expertise</h4>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Profession: </span>
                {personalInfo.profession || "N/A"}
              </div>
              <div>
                <span className="font-medium">Discipline: </span>
                {personalInfo.discipline || "N/A"}
              </div>
              <div>
                <span className="font-medium">Specialty: </span>
                {personalInfo.specialty || "N/A"}
              </div>
              <div>
                <span className="font-medium">Secondary specialty: </span>
                {personalInfo.secondarySpecialty || "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* Certification and credentials */}
        <div className="bg-secondary rounded-md p-6 mb-4">
          <h3 className="text-center text-lg font-semibold mb-6">
            Certification and credentials
          </h3>

          <div className="mb-4">
            <h4 className="font-bold text-gray-700 mb-2">
              Professional Licenses
            </h4>
            {licenses.length === 0 ? (
              <div>No licenses found.</div>
            ) : (
              licenses.map((license) => (
                <div key={license._id} className="mb-2 border p-2 rounded">
                  <div>
                    <span className="font-medium">License Type: </span>
                    {license.license_type || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">Medical Assistant: </span>
                    {license.medical_assistant || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">City: </span>
                    {license.city || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">State: </span>
                    {license.state || "N/A"}
                  </div>
                </div>
              ))
            )}
          </div>

          <div>
            <h4 className="font-bold text-gray-700 mb-2">Certifications</h4>
            {certifications.length === 0 ? (
              <div>No certifications found.</div>
            ) : (
              <ul className="list-disc list-inside">
                {certifications.map((cert, i) => (
                  <li key={i}>{cert}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="bg-secondary rounded-md p-6 mb-4">
          <h3 className="text-center text-lg font-semibold mb-6">Education</h3>

          {educationList.length === 0 ? (
            <div>No education information found.</div>
          ) : (
            educationList.map((edu) => (
              <div key={edu._id} className="mb-4 border p-3 rounded">
                <div>
                  <span className="font-medium">School/Program: </span>
                  {edu.school || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Graduation Year: </span>
                  {edu.year || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Degree: </span>
                  {edu.degree || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Major: </span>
                  {edu.major || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Country: </span>
                  {edu.country || "N/A"}
                </div>
                <div>
                  <span className="font-medium">City: </span>
                  {edu.city || "N/A"}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Employment History */}
        <div className="bg-secondary rounded-md p-6">
          <h3 className="text-center text-lg font-semibold mb-6">
            Employment History
          </h3>

          {employmentList.length === 0 ? (
            <div>No employment history found.</div>
          ) : (
            employmentList.map((job) => (
              <div key={job._id} className="mb-4 border p-3 rounded">
                <div>
                  <span className="font-medium">Company Name: </span>
                  {job.company || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Specialty: </span>
                  {job.specialty || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Country: </span>
                  {job.country || "N/A"}
                </div>
                <div>
                  <span className="font-medium">State: </span>
                  {job.state || "N/A"}
                </div>
                <div>
                  <span className="font-medium">City: </span>
                  {job.city || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Start Date: </span>
                  {formatDate(job.start_date)}
                </div>
                <div>
                  <span className="font-medium">End Date: </span>
                  {formatDate(job.end_date)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
