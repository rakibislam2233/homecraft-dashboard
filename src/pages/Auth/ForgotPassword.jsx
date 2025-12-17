import { Button, Input } from "antd";
import Form from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import main_logo from "../../assets/images/service_marketplace_main_logo_red.svg";
import PageHeading from "../../Components/PageHeading";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";
import { ErrorSwal, SuccessSwal } from "../../utils/allSwalFire";

// import Swal from "sweetalert2";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onFinish = async (values) => {
    const { email } = values;
    console.log(email);

    try {
      const response = await forgotPassword(values).unwrap();
      console.log(response);

      localStorage.setItem("token", response?.data?.token);

      SuccessSwal({
        title: "Success",
        text: response.data.message || response.message || "Success",
      });

      navigate(`/auth/verify-email/${email}`);
    } catch (error) {
      ErrorSwal({
        title: "",
        text: error.data.message || error.data || "Something went wrong!",
      });
    }

    // navigate(`/auth/verify-email`);
  };

  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      {/* Image Section */}
      <div className="lg:border-r-2 border-gray mx-auto w-[100%]  lg:p-[25%] lg:pr-[25%]">
        {/* <img src={logo_image} alt="App Logo" /> */}
        <div className=" flex justify-center items-center text-primary text-3xl font-bold">
          <img className="w-[100%] mx-auto" src={main_logo} alt="Logo" />
        </div>
      </div>

      {/* Form Section */}
      <div className="lg:p-[2%] order-first lg:order-last">
        <div className="w-full py-[64px] lg:px-[44px] space-y-8 border border-gray-2 rounded-xl shadow-2xl">
          {/* Page Heading */}
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading
              backPath={"/auth"}
              title={"Forget Password"}
              disbaledBackBtn={false}
            />
            <p className="drop-shadow text-primary mt-4 text-center lg:text-start">
              Enter your email address to get a verification code for resetting
              your password.
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
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please input a valid email address!",
                },
                {
                  required: true,
                  message: "Email is required!",
                },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Please input a valid email address!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter your email"
                aria-label="Email Address"
              />
            </Form.Item>

            {/* Submit Button */}
            <div className="w-full flex justify-center pt-5">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full px-2"
                loading={isLoading}
              >
                Get OTP
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
