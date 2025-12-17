import { Checkbox, Form, Input, message, Modal, Select, Spin } from "antd";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { TiTickOutline } from "react-icons/ti";
import {
  useGetSubscriptionsQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
} from "./../../../redux/features/subscription/subscriptionApi";

const { Option } = Select;

// Feature schema to maintain labels/descriptions for API payload
const FEATURE_SCHEMA = {
  fullProfileAccess: {
    label: "Full profile & portfolio",
    description: "Show complete professional profile with portfolio",
  },
  bioAndReview: {
    label: "Biographic and review",
    description: "Add biography and receive client reviews",
  },
  onlineAppointmentBooking: {
    label: "Online appointment booking",
    description: "Clients can book appointments directly",
  },
  clientMessagingAccess: {
    label: "Client messaging access",
    description: "Direct chat access with clients",
  },
  basicStats: {
    label: "Basic stats (views, clicks)",
    description: "View how many clients viewed your profile",
  },
  maxProjectsPerWeek: {
    label: "Accept up to 4 projects/week",
    description: "You can manage 3 new projects every week",
  },
  localVisibility: {
    label: "Local visibility",
    description: "Show your profile to nearby clients",
  },
  noCommission: {
    label: "No commission on services",
    description: "Keep 100% of your earnings — no commission charged",
  },
};

export default function Subscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [form] = Form.useForm();
  const [editingPlanId, setEditingPlanId] = useState(null);

  // API hooks
  const { data, isLoading, isError } = useGetSubscriptionsQuery({
    page: 1,
    limit: 10,
  });

  const [createSubscription] = useCreateSubscriptionMutation();
  const [updateSubscription] = useUpdateSubscriptionMutation();

  const plans = data?.data?.results || [];

  const handleCreatePlan = () => {
    setModalType("create");
    setEditingPlanId(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleEditPlan = (plan) => {
    setModalType("edit");
    setEditingPlanId(plan.id);
    setIsModalOpen(true);

    const featureValues = {};
    Object.keys(FEATURE_SCHEMA).forEach((key) => {
      featureValues[key] = plan.features?.[key]?.enabled ?? false;
    });

    form.setFieldsValue({
      serviceFor: plan.plan,
      planName: plan.plan,
      planPrice: plan.price,
      planExpiry: plan.durationLabel,
      ...featureValues,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingPlanId(null);
    form.resetFields();
  };

  const handleFinish = async (values) => {
    try {
      const features = {};
      Object.entries(FEATURE_SCHEMA).forEach(([key, meta]) => {
        features[key] = {
          label: meta.label,
          description: meta.description,
          enabled: Boolean(values[key]),
        };
      });

      const payload = {
        plan: values.planName,
        price: Number(values.planPrice),
        durationLabel: values.planExpiry,
        features,
      };

      if (modalType === "create") {
        await createSubscription(payload).unwrap();
        message.success("Plan created successfully");
      } else {
        await updateSubscription({ id: editingPlanId, payload }).unwrap();
        message.success("Plan updated successfully");
      }

      setIsModalOpen(false);
      setEditingPlanId(null);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Something went wrong!");
    }
  };

  if (isLoading) return <Spin className="mt-8" />;

  if (isError)
    return <div className="text-center mt-8">Failed to load subscriptions</div>;

  return (
    <>
      <div className="text-center mt-6">
        <h2 className="text-4xl font-bold">Your Subscription Plan </h2>
        {/* <p className="text-sm">Growth Your Bussiness (Save 2.5%)</p> */}
        <p className="text-sm">Growth Your Bussiness</p>
        <h3 className="font-bold text-xl">Professional</h3>
      </div>
      <div className="flex justify-end">
        <button
          disabled
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
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h2 className="text-2xl font-bold text-center mb-2">
                    {plan.plan}
                  </h2>
                  <p className="text-sm text-center mb-4">
                    <span className="text-3xl text-red-600 font-bold">
                      € {plan.price}/
                    </span>
                    Monthly
                  </p>

                  <h3 className="bg-red-800 text-white py-2 px-4 font-semibold mb-3 text-center">
                    {plan.subTitle || "Subscription Plan"}
                  </h3>
                  <div className="pt-4">
                    <ul className="space-y-2">
                      {Object.keys(plan.features || {}).map((key, i) => (
                        <li key={i} className="flex items-center">
                          <TiTickOutline className="m-2 h-4 w-4 rounded-full border border-green-400 text-green-600" />
                          <span>{plan.features[key].label}</span>
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
              <Option value="Basic">Client</Option>
              <Option value="Premium">Professional</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="planName"
            label="Plan Name"
            rules={[{ required: true, message: "Please select plan name" }]}
          >
            <Select placeholder="Select plan name" size="large">
              <Option value="Basic">Basic</Option>
              <Option value="Premium">Premium</Option>
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
              {Object.keys(FEATURE_SCHEMA).map((key) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 flex-1">
                    {FEATURE_SCHEMA[key].label}
                  </span>
                  <Form.Item
                    name={key}
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
