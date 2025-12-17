import { Button, Input } from "antd";
import Form from "antd/es/form/Form";
import { useNavigate, useParams } from "react-router-dom";
import image from "../../assets/images/forgot.png";
import PageHeading from "../../Components/PageHeading";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { ErrorSwal, SuccessSwal } from "../../utils/allSwalFire";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  // const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);

  const [resetPass, { isLoading }] = useResetPasswordMutation();

  const onFinish = async (values) => {
    console.log(email);
    const token = localStorage.getItem("token");

    // const password = values.password;
    // const confirmPassword = values.confirmPassword;

    const newPassword = values.confirmPassword;

    try {
      const response = await resetPass({
        email,
        token,
        newPassword,
        // password: password,
        // confirmPassword: confirmPassword,
      }).unwrap();

      SuccessSwal({
        title: "Success",
        text: response.message || "Password reset successfully!",
      });

      navigate("/auth");
    } catch (error) {
      ErrorSwal({
        title: "",
        text: error?.data?.message || error?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8 bg-white">
      {/* Image Section */}
      <div className="lg:border-r-2 border-primary mx-auto w-[96%] lg:p-[10%]">
        <img src={image} alt="Reset Password Illustration" />
      </div>

      {/* Form Section */}
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[44px] lg:px-[44px] space-y-8">
          {/* Page Heading */}
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading
              backPath={-1}
              title={"Set new password"}
              disbaledBackBtn={false}
            />
            <p className="drop-shadow text-[#464343] mt-5">
              Your password must be at least 8 characters long and include an
              uppercase letter, a number, and a special character.
            </p>
          </div>

          {/* Form */}
          <Form
            name="reset_password"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            requiredMark={false}
            onFinish={onFinish}
          >
            {/* New Password */}
            <Form.Item
              label={
                <span className="font-medium text-base">New Password</span>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input a new password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long!",
                },
                // {
                //   // pattern: /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                //   message:
                //     "Password must contain at least one uppercase letter, one number, and one special character!",
                // },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Enter new password"
                aria-label="New Password"
              />
            </Form.Item>

            {/* Confirm New Password */}
            <Form.Item
              label={
                <span className="font-medium text-base">
                  Confirm New Password
                </span>
              }
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please re-enter the password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password and confirmation password do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Confirm new password"
                aria-label="Confirm New Password"
              />
            </Form.Item>

            {/* Submit Button */}
            <div className="w-full flex justify-center pt-4">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full px-2"
                loading={isLoading}
              >
                Reset Password
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
