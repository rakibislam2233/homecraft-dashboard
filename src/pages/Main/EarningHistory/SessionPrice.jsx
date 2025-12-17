import { Button, Form, Input, Space, Spin, message } from "antd";
import { useEffect } from "react";
import {
  useGetSessionChargeQuery,
  useUpdateSessionChargeMutation,
} from "../../../redux/features/earning/earningApi";

export default function SessionPrice() {
  const { data, isLoading, isError } = useGetSessionChargeQuery();
  const [updateCharge, { isLoading: isUpdating }] =
    useUpdateSessionChargeMutation();

  const [form] = Form.useForm();

  // Set form initial value when data is loaded
  useEffect(() => {
    if (data?.data?.charge) {
      form.setFieldsValue({
        charge: data.data.charge.toString(),
      });
    }
  }, [data, form]);

  const handleSubmit = async (values) => {
    try {
      await updateCharge({
        charge: parseFloat(values.charge),
      }).unwrap();
      message.success("Session price updated successfully");
    } catch (err) {
      message.error(err.data?.message || "Failed to update session price");
    }
  };

  if (isError) return <div>Error loading session price</div>;

  return (
    <div className="flex justify-start items-center gap-12 my-4">
      <div className="rounded-lg border px-12 py-8 bg-white shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Create Session Price</h2>
        <Spin spinning={isLoading || isUpdating}>
          <div className="flex items-center gap-4">
            <span className="font-medium">Per Session: </span>
            <Form form={form} onFinish={handleSubmit} layout="inline">
              <Space.Compact>
                <Form.Item
                  name="charge"
                  noStyle
                  rules={[
                    { required: true, message: "Please enter price" },
                    {
                      pattern: /^\d+(\.\d{1,2})?$/,
                      message: "Invalid price format",
                    },
                  ]}
                >
                  <Input
                    prefix="$"
                    style={{ width: 150 }}
                    disabled={isLoading || isUpdating}
                  />
                </Form.Item>
                <div className="ml-4">
                  <Form.Item noStyle>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isUpdating}
                    >
                      Update
                    </Button>
                  </Form.Item>
                </div>
              </Space.Compact>
            </Form>
          </div>
        </Spin>
      </div>
    </div>
  );
}
