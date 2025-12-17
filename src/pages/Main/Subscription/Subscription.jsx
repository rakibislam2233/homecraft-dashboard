import { Checkbox, Form, Input, message, Modal, Select } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { TiTickOutline } from "react-icons/ti";

const { Option } = Select;

export default function Subscription({ type }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [form] = Form.useForm();

  const plans = [
    {
      id: 1,
      title: "Basic Plan",
      subTitle: "Try Basic Plan",
      price: "0.00",
      features: [
        "View professional profiles",
        "Immediate appointment backlog",
        "Email-based contact",
        "Submit up to 2 projects/intends",
        "£3.59 project for access",
        "Unlimited functions (using payment)",
      ],
    },
    {
      id: 2,
      title: "Premium Plan",
      subTitle: "Try Premium Plan",
      price: "49.00",
      features: [
        "Watch messaging with professionals",
        "Create & manage projects",
        "Submit it projects/intends (£2/month)",
        "€4.99/pages for access",
        "Unlimited negotiated functions",
        "Unlimited negotiated functions",
      ],
    },
  ];

  const facilities = [
    { key: "submit_projects", label: "Submit up to 2 projects/month" },
    { key: "project_extras", label: "£3.59/project for extras" },
    { key: "unlimited_favorites", label: "Unlimited favorites (unorganized)" },
    { key: "messaging", label: "Watch messaging with professionals" },
    { key: "manage_projects", label: "Create & manage projects" },
  ];

  const handleCreatePlan = () => {
    setModalType("create");
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleEditPlan = (plan) => {
    setModalType("edit");
    setIsModalOpen(true);
    form.setFieldsValue({
      serviceFor: plan.title,
      planName: plan.title,
      planPrice: plan.price,
      planExpiry: "1 Month",
      view_profiles: true,
      appointment_booking: true,
      email_contact: true,
      submit_projects: true,
      project_extras: true,
      unlimited_favorites: true,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFinish = async (values) => {
    try {
      const facilitiesData = {};
      facilities.forEach((facility) => {
        facilitiesData[facility.key] = values[facility.key] || false;
      });

      const payload = {
        serviceFor: values.serviceFor,
        planName: values.planName,
        planPrice: values.planPrice,
        planExpiry: values.planExpiry,
        facilities: facilitiesData,
        type: modalType,
      };

      console.log("Payload to send to backend:", payload);

      // Here you would make your API call
      // await createOrUpdatePlan(payload);

      message.success(
        `Plan ${modalType === "create" ? "created" : "updated"} successfully!`
      );
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error:", error);
      message.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={handleCreatePlan}
          className="bg-primary hover:bg-primary/80 text-white font-semibold px-12 py-2 rounded-full flex items-center gap-2 "
        >
          Create Plan <FaPlus />
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.length === 0 ? (
            <div className="text-center">
              <h4 className="">No Subscription Plan!</h4>
            </div>
          ) : (
            <>
              {plans?.map((plan, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h2 className="text-2xl font-bold text-center mb-2">
                    {plan.title}
                  </h2>
                  <p className="text-sm text-center mb-4">
                    <span className="text-3xl text-red-600 font-bold">
                      € {plan.price}/
                    </span>
                    Monthly
                  </p>

                  <h3 className="bg-red-800 text-white py-2 px-4 font-semibold mb-3 text-center">
                    {plan.subTitle}
                  </h3>
                  <div className="pt-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <TiTickOutline className="m-2 h-4 w-4 rounded-full border border-green-400 text-green-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleEditPlan(plan)}
                      className="bg-primary hover:bg-primary/80 text-white font-semibold w-full py-2 rounded-full"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <Modal
        title={
          modalType === "create" ? (
            <span className="text-xl text-primary font-bold">Create Plan</span>
          ) : (
            <span className="text-xl text-primary font-bold"> Edit Plan </span>
          )
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={450}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="mt-6"
        >
          <Form.Item
            name="serviceFor"
            label="Service for"
            rules={[{ required: true, message: "Please select service type" }]}
          >
            <Select placeholder="Client/Professional" size="large">
              <Option value="Basic Plan">Client</Option>
              <Option value="Premium Plan">Professional</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="planName"
            label="Plan Name"
            rules={[{ required: true, message: "Please select plan name" }]}
          >
            <Select placeholder="Select plan name" size="large">
              <Option value="Basic Plan">Basic Plan</Option>
              <Option value="Premium Plan">Premium Plan</Option>
            </Select>
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="planPrice"
              label="Plan Price"
              rules={[{ required: true, message: "Please enter plan price" }]}
            >
              <Input
                placeholder="20"
                prefix="€"
                type="number"
                size="large"
                min="0"
                max="10000"
                step="0"
              />
            </Form.Item>

            <Form.Item
              name="planExpiry"
              label="Plan Expiry"
              rules={[{ required: true, message: "Please select plan expiry" }]}
            >
              <Select placeholder="Select expiry period" size="large">
                <Option value="1 Month">1 Month</Option>
                <Option value="3 Months">3 Months</Option>
                <Option value="6 Months">6 Months</Option>
                <Option value="1 Year">1 Year+</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Facilities</h3>
            <div className="px-4">
              {facilities.map((facility) => (
                <div
                  key={facility.key}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-700 flex-1">
                    {facility.label}
                  </span>
                  <Form.Item
                    name={facility.key}
                    valuePropName="checked"
                    className="mb-0"
                  >
                    <Checkbox />
                  </Form.Item>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button className="bg-primary hover:bg-primary/80 text-white font-semibold px-12 py-2 rounded-full">
              {modalType === "create" ? "Create plan" : "Update plan"}
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
