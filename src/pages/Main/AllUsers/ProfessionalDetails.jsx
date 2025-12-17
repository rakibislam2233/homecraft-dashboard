import { Spin } from "antd";
import { BsBrowserChrome } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import {
  FaChevronLeft,
  FaDownload,
  FaFilePdf,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  FaTwitter,
} from "react-icons/fa6";
import { MdEmail, MdVerified } from "react-icons/md";
import { PiCompassRoseBold } from "react-icons/pi";
import { SiRedcandlegames } from "react-icons/si";
import { TbEyeDown } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import image from "../../../assets/images/host-details-image.png";
import { useGetProfessionalDetailsQuery } from "../../../redux/features/user/userApi";

const getFileExtensionFromUrl = (url) => {
  if (!url) return "";
  try {
    const urlObject = new URL(url);
    const path = urlObject.pathname;
    const segments = path.split("/");
    let fileNameWithExt = segments[segments.length - 1];

    if (!fileNameWithExt || fileNameWithExt === "/") {
      return "link";
    }

    const parts = fileNameWithExt.split(".");
    return parts.length > 1 ? parts.pop() : "file";
  } catch (error) {
    return "link";
  }
};

export default function ProfessionalDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: apiResponse, isLoading } = useGetProfessionalDetailsQuery(id);
  const professionalData = apiResponse?.data || [];

  const {
    email: professionalEmail,
    verificationStatus,
    profile,
    latestWork,
  } = professionalData;

  const fullName = profile?.fullName || "N/A";
  const specialization = profile?.speciality?.name || "N/A";
  const profileImage = profile?.profileImage
    ? import.meta.VITE_IMAGE_URL + profile?.profileImage
    : image;
  // const profileImage = image;
  const bio = profile?.bio || "No description available.";
  const isVerified = verificationStatus === "verified";

  // Company Info
  const companyInfo = profile?.companyInfo;
  const companyName = companyInfo?.companyName || "N/A";
  const companyEmail = companyInfo?.companyEmail || "N/A";
  const siretNumber = companyInfo?.siretNumber || "N/A";
  const companyAddress = companyInfo?.companyAddress?.formattedAddress || "N/A";
  const kbisDocumentUrl = companyInfo?.kbisDocument;

  // Contact Info
  const companyWebsiteUrl = companyInfo?.companyWebsiteUrl || "N/A";
  const companyPhoneNumber = companyInfo?.companyPhoneNumber || "N/A";

  // Projects & Certificates
  const projectAttachments = latestWork?.attachments || [];
  const certificationDocumentUrl = profile?.certificationDocument;

  const serviceAreas = profile?.serviceAreas || [];

  const facebookUrl = companyWebsiteUrl.includes("facebook")
    ? companyWebsiteUrl
    : null;

  // --- Dynamic Link Data Generation ---
  const kbisExt = getFileExtensionFromUrl(kbisDocumentUrl);
  const certExt = getFileExtensionFromUrl(certificationDocumentUrl);

  const handleDownload = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      console.log("No download URL provided.");
    }
  };

  const handleKbisDownload = () => handleDownload(kbisDocumentUrl);
  const handleCertificationDownload = () =>
    handleDownload(certificationDocumentUrl);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center border rounded shadow-sm mt-4 py-4 px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2">
            <FaChevronLeft />
          </button>
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
            <img
              src={profileImage}
              alt={fullName}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold">{fullName}</div>
            <div className="text-sm text-gray-600">{specialization}</div>
          </div>
        </div>

        {/* Verification Status/Actions */}
        <div className="pr-4 sm:pr-12">
          {isVerified ? (
            <h3 className="text-primary text-lg font-bold flex items-center gap-2">
              Verified <MdVerified size={20} />
            </h3>
          ) : (
            <div className="flex items-center gap-4 sm:gap-6">
              <button className="px-4 py-2 sm:px-6 sm:py-2 rounded bg-primary text-white text-sm">
                Verify
              </button>
              <button className="px-4 py-2 sm:px-6 sm:py-2 rounded bg-red-600 text-white text-sm">
                Reject
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 pl-16 py-4">
        <div className="flex-1">
          <div>
            <h3 className="text-xl font-bold text-gray-900 pb-1">
              Description
            </h3>
            <p className="text-gray-700">{bio}</p>
          </div>

          <div className="border p-4 rounded-lg shadow-md my-4">
            <p className="text-xl font-bold text-gray-900 pb-4">
              Company Information
            </p>

            <div className="flex flex-col sm:flex-row justify-start items-start gap-4">
              <div className="flex-1 space-y-4 w-full">
                <p className="flex items-center gap-4">
                  <PiCompassRoseBold
                    className="text-primary flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-gray-400 text-sm">Company Name</p>
                    <p className="font-medium break-words">{companyName}</p>
                  </div>
                </p>
                <p className="flex items-center gap-4">
                  <MdEmail className="text-primary flex-shrink-0" size={20} />
                  <div>
                    <p className="text-gray-400 text-sm">Email address</p>
                    <p className="font-medium break-words">{companyEmail}</p>
                  </div>
                </p>
                <p className="flex items-center gap-4">
                  <SiRedcandlegames
                    className="text-primary flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-gray-400 text-sm">Siret Number</p>
                    <p className="font-medium break-words">{siretNumber}</p>
                  </div>
                </p>
              </div>
              <div className="flex-1 space-y-4 w-full">
                <p className="flex items-start gap-4">
                  <FaLocationDot
                    className="text-primary flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="font-medium break-words w-[80%]">
                      {companyAddress}
                    </p>
                  </div>
                </p>
                <p className="flex items-center gap-4">
                  <FaFilePdf className="text-primary flex-shrink-0" size={20} />
                  <div>
                    <p className="text-gray-400 text-sm">Esther Howard</p>
                    <p className="font-medium text-black">PDF</p>
                  </div>
                  {kbisDocumentUrl && (
                    <button
                      onClick={handleKbisDownload}
                      className="ml-2 p-1 border rounded"
                    >
                      <FaDownload className="text-primary" size={20} />
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-lg shadow-md my-4">
            <p className="text-xl font-bold text-gray-900 pb-4">Projects</p>

            {projectAttachments.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {projectAttachments.map((url, index) => {
                  const ext = getFileExtensionFromUrl(url);
                  return (
                    <p
                      key={index}
                      onClick={() => handleDownload(url)}
                      className="flex items-center gap-1 underline cursor-pointer text-primary font-semibold truncate hover:text-primary/60 transition border rounded px-8 py-2 w-fit"
                      title={`Project${index + 1}.${ext}`}
                    >
                      <TbEyeDown size={20} className="text-primary pb-1" />
                      {`Project${index + 1}${ext ? `.${ext}` : ""}`}
                    </p>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500">
                No recent project attachments available.
              </p>
            )}

            <p className="text-xl font-bold text-gray-900 py-4">Certificates</p>
            <div className="flex justify-start items-center gap-4">
              <p
                className="flex items-center gap-1 underline cursor-pointer text-primary font-semibold truncate hover:text-primary/60 transition border rounded px-8 py-2"
                onClick={handleCertificationDownload}
                title={
                  certificationDocumentUrl ? `Certificate1.${certExt}` : "N/A"
                }
              >
                <TbEyeDown size={20} className="text-primary pb-1" />
                {certificationDocumentUrl
                  ? `Certificate1${certExt ? `.${certExt}` : ""}`
                  : "N/A"}
              </p>
            </div>
            {!certificationDocumentUrl && (
              <p className="text-gray-500">
                No certification document available.
              </p>
            )}
          </div>
        </div>

        {/* right side */}
        <div className="flex-1 lg:max-w-md">
          <div className="border p-4 rounded-lg shadow-md my-4">
            <p className="text-xl font-bold text-gray-900 pb-4">
              Contact Information
            </p>

            <div className="space-y-4">
              <p className="flex items-center gap-4">
                <BsBrowserChrome
                  className="text-primary flex-shrink-0"
                  size={20}
                />
                <div>
                  <p className="text-gray-400 text-sm">WEBSITE</p>
                  {companyWebsiteUrl !== "N/A" ? (
                    <a
                      href={companyWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary underline hover:underline break-words"
                    >
                      {companyWebsiteUrl}
                    </a>
                  ) : (
                    <p className="font-medium">N/A</p>
                  )}
                </div>
              </p>
              <hr />
              <p className="flex items-center gap-4">
                <FaPhone className="text-primary flex-shrink-0" size={20} />
                <div>
                  <p className="text-gray-400 text-sm">PHONE</p>
                  <p className="font-medium break-words">
                    {companyPhoneNumber}
                  </p>
                </div>
              </p>
              <hr />
              <p className="flex items-center gap-4">
                <MdEmail className="text-primary flex-shrink-0" size={24} />
                <div>
                  <p className="text-gray-400 text-sm">EMAIL ADDRESS</p>
                  <p className="font-medium break-words">
                    {professionalEmail || "N/A"}
                  </p>
                </div>
              </p>
            </div>
          </div>

          <hr className="my-6 lg:hidden" />

          <div className="border p-4 rounded-lg shadow-md my-4">
            <p className="text-xl font-bold text-gray-900 pb-4">Service Area</p>
            <div className="flex flex-wrap gap-2">
              {/* {["New York", "Paris", "USA", "London", "Berlin", "Tokyo"].map( */}
              {serviceAreas?.map((area, index) => (
                <p
                  key={index}
                  className="border border-[#008FBFA6] rounded-lg px-2 py-1 text-sm text-black shadow-md"
                >
                  {area?.areaName}
                </p>
              ))}
            </div>
          </div>

          <hr className="my-6 lg:hidden" />

          <div className="border p-4 rounded-lg shadow-md my-4">
            <p className="text-xl font-bold text-gray-900 pb-4">Social Media</p>
            <div className="flex justify-start items-center gap-4">
              {facebookUrl ? (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                >
                  <FaFacebookSquare
                    className="text-primary hover:text-primary/60 transition"
                    size={32}
                  />
                </a>
              ) : (
                <FaFacebookSquare className="text-gray-400" size={32} />
              )}
              <FaTwitter
                className="text-gray-400"
                size={32}
                title="Twitter (N/A)"
              />
              <FaLinkedin
                className="text-gray-400"
                size={32}
                title="LinkedIn (N/A)"
              />
            </div>
            {!facebookUrl && (
              <p className="text-gray-500 mt-2">
                No social media links available.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
