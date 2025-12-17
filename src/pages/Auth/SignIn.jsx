import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import main_logo from "../../assets/images/service_marketplace_main_logo_red.svg";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setLogin } from "../../redux/slices/authSlice";
import { ErrorSwal, SuccessSwal } from "../../utils/allSwalFire";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [nizamLogin, { isLoading }] = useLoginMutation();

  const onFinish = async (values) => {
    try {
      const response = await nizamLogin(values).unwrap();
      console.log(response);

      localStorage.setItem("token", response?.data?.tokens?.accessToken);

      dispatch(
        setLogin({
          user: { ...response?.data?.user, _id: response?.data?.user?._id },
          token: response?.data?.tokens?.accessToken,
        })
      );

      SuccessSwal({
        title: "Welcome back!",
        text:
          response?.message || response?.data?.message || "Login successful!",
      });

      navigate(location.state ? location.state : "/");
    } catch (error) {
      ErrorSwal({
        title: "Login Failed!",
        text: error.data?.message || error?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      {/* Logo Section */}
      <div className="lg:border-r-2 border-gray mx-auto w-[100%]  lg:p-[25%] lg:pr-[25%]">
        {/* <img src={logo_image} alt="App Logo" /> */}
        <div className=" flex justify-center items-center text-primary text-3xl font-bold">
          <img className="w-[100%] mx-auto" src={main_logo} alt="Logo" />
        </div>
      </div>

      {/* Login Form Section */}
      <div className="lg:p-[2%] order-first lg:order-last">
        <div className="w-full py-[44px] lg:px-[44px] border border-gray-2 rounded-xl shadow-2xl">
          {/* Heading */}
          <div className="pb-[30px] space-y-2">
            <h1 className="text-[33px] text-center font-semibold">Sign In</h1>
            <p className="text-primary text-center lg:text-lg">
              Please enter your email and password to continue!
            </p>
          </div>

          {/* Login Form */}
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            requiredMark={false}
            className="text-start"
          >
            {/* Email Field */}
            <Form.Item
              label={<span className="font-medium text-base">Email</span>}
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please input a valid Email!",
                },
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="admin@gmail.com"
                aria-label="Email Address"
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label={<span className="font-medium text-base">Password</span>}
              className="mt-6"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long!",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="**********"
                aria-label="Password"
              />
            </Form.Item>

            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox className="text-base font-medium">
                  Remember me
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <button
                  onClick={() => navigate("/auth/forgot-password")}
                  type="link"
                  className="text-base font-medium text-primary"
                >
                  Forgot password?
                </button>
              </Form.Item>
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="px-2 w-full"
                loading={isLoading}
              >
                Sign In
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
