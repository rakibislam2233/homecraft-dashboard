import { Button } from "antd";
import Form from "antd/es/form/Form";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import image from "../../assets/images/forgot.png";
import PageHeading from "../../Components/PageHeading";
import {
  useLazyResendOtpQuery,
  useVerifyEmailMutation,
} from "../../redux/features/auth/authApi";
import { ErrorSwal, SuccessSwal } from "../../utils/allSwalFire";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [code, setCode] = useState("");

  // Redux hooks for verifying the OTP and resending it
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [triggerResendOtp, { isLoading: isResending }] =
    useLazyResendOtpQuery();

  // Function to handle OTP verification submission
  const onFinish = async () => {
    if (!/^\d{6}$/.test(code)) {
      return Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please enter a valid 6-digit OTP.",
      });
    }

    try {
      const response = await verifyEmail({ code, email }).unwrap();
      localStorage.setItem("token", response?.data?.token);
      console.log(response);
      SuccessSwal({ title: "Success", text: response.message || "Success" });
      navigate(`/auth/reset-password/${email}`);
    } catch (error) {
      ErrorSwal({
        title: "",
        text: error.data.message || error.data || "Something went wrong!",
      });
    }
  };

  // Function to handle resending the OTP
  const handleResendOtp = async () => {
    try {
      const response = await triggerResendOtp({ email }).unwrap();
      SuccessSwal({
        title: "OTP Sent",
        text:
          response?.message ||
          response?.data?.message ||
          "OTP has been resent successfully!",
      });
    } catch (error) {
      ErrorSwal({
        title: "Error",
        text: error?.data?.message || error?.message || "Failed to resend OTP.",
      });
    }
  };

  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8 bg-white">
      {/* Image Section */}
      <div className="lg:border-r-2 border-gray mx-auto w-[90%] lg:p-[8%]">
        <img src={image} alt="Verify Email Illustration" />
      </div>

      {/* OTP Form Section */}
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[64px] lg:px-[44px] space-y-5">
          {/* Page Heading */}
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading
              backPath={"/auth/forgot-password"}
              title={"Verify OTP"}
              disbaledBackBtn={false}
            />
            <p className="drop-shadow text-[#646464] mt-5 text-center lg:text-left">
              Please check your email. We have sent a code to contact @gmail.com
            </p>
          </div>

          {/* Form */}
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            {/* OTP Input */}
            <div className="py-3 text-2xl font-semibold flex justify-center">
              <OTPInput
                value={code}
                onChange={setCode}
                numInputs={6}
                inputStyle={{
                  height: "70px",
                  width: "70px",
                  margin: "20px",
                  border: "1px solid #142F62",
                  outline: "none",
                  borderRadius: "16px",
                }}
                renderSeparator={<span> </span>}
                renderInput={(props) => (
                  <input {...props} aria-label="OTP Input" />
                )}
              />
            </div>

            {/* Resend OTP Button */}
            <div className="w-full flex justify-center pt-2">
              <Button
                type="default"
                size="large"
                onClick={handleResendOtp}
                loading={isResending}
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </Button>
            </div>

            {/* Submit (Verify) Button */}
            <div className="w-full flex justify-center pt-5">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full px-2"
                loading={isLoading}
              >
                Verify
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
