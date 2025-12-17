import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetJobDetailsQuery,
  usePostJobMutation,
  useUpdateJobMutation,
} from "../../../redux/features/jobs/jobsApi";
import { useUploadFileMutation } from "../../../redux/features/upload/uploadApi";
import { useGetValueQuery } from "../../../redux/features/value/valueApi";

const { Option } = Select;

const baseImageUrl = import.meta.env.VITE_IMAGE_URL || "";

export default function JobPost() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [fileList, setFileList] = useState([]);
  const [companyLogoUrl, setCompanyLogoUrl] = useState("");
  // console.log(companyLogoUrl);

  const [uploadFile] = useUploadFileMutation();
  const { data: categoryV } = useGetValueQuery("Category");
  const { data: professionV } = useGetValueQuery("Profession");

  const categoryValue = categoryV?.data;
  const professionValue = professionV?.data;

  // Fetch job details if editing
  const { data: singleJobD, isSuccess: jobLoaded } = useGetJobDetailsQuery(id, {
    skip: !id,
  });
  const singleJobDetails = singleJobD?.data;

  const [postJob] = usePostJobMutation();
  const [updateJob] = useUpdateJobMutation();

  // Populate form when job details loaded
  useEffect(() => {
    if (jobLoaded && singleJobDetails) {
      form.setFieldsValue({
        hospitalName: singleJobDetails.hospitalName,
        title: singleJobDetails.title,
        address: singleJobDetails.address,
        deadline: singleJobDetails.deadline
          ? moment(singleJobDetails.deadline)
          : null,
        jobType: singleJobDetails.jobType,
        category: singleJobDetails.category,
        profession: singleJobDetails.profession,
        salary: singleJobDetails.salary,
        vacancy: singleJobDetails.vacancy,
        startDate: singleJobDetails.startDate
          ? moment(singleJobDetails.startDate)
          : null,
        hoursPerWeek: singleJobDetails.hoursPerWeek,
        responsibilities: singleJobDetails.responsibilities.length
          ? singleJobDetails.responsibilities
          : [""],
        requirements: singleJobDetails.requirements.length
          ? singleJobDetails.requirements
          : [""],
        benefits: singleJobDetails.benefits.length
          ? singleJobDetails.benefits
          : [""],
      });

      setDescription(singleJobDetails.description || "");
      setSummary(singleJobDetails.summary || "");

      if (singleJobDetails.companyLogo) {
        setCompanyLogoUrl(singleJobDetails.companyLogo);
        setFileList([
          {
            uid: "-1",
            name: "company-logo.jpg",
            status: "done",
            url: baseImageUrl + singleJobDetails.companyLogo,
          },
        ]);
      } else {
        setCompanyLogoUrl("");
        setFileList([]);
      }
    }
  }, [jobLoaded, singleJobDetails, form]);

  const onFinish = async (values) => {
    const payload = {
      hospitalName: values.hospitalName,
      title: values.title,
      address: values.address,
      deadline: values.deadline ? values.deadline.toISOString() : null,
      jobType: values.jobType,
      category: values.category,
      profession: values.profession,
      salary: Number(values.salary),
      vacancy: Number(values.vacancy),
      startDate: values.startDate ? values.startDate.toISOString() : null,
      hoursPerWeek: Number(values.hoursPerWeek),
      description,
      responsibilities: values.responsibilities || [],
      summary,
      requirements: values.requirements || [],
      benefits: values.benefits || [],
      companyLogo: companyLogoUrl,
    };

    try {
      let response;
      if (id) {
        response = await updateJob({ id, jobData: payload }).unwrap();
      } else {
        response = await postJob(payload).unwrap();
        console.log("Job posted successfully:", response);
      }

      navigate("/all-jobs");
      // navigate("/job-post/preview", { state: payload });
    } catch (error) {
      console.error("Failed to post/update job:", error);
    }
  };

  const onUploadChange = async ({ file, fileList }) => {
    setFileList(fileList);

    if (file.status === "removed") {
      setCompanyLogoUrl("");
      return;
    }

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadFile(formData).unwrap();

      if (response.success && response.data?.path) {
        setCompanyLogoUrl(response.data.path);
      } else {
        console.error("Upload failed: ", response.message || "No URL returned");
        setCompanyLogoUrl("");
      }
    } catch (error) {
      console.error("Upload error: ", error);
      setCompanyLogoUrl("");
    }
  };

  // Get current form values + quill content for preview navigation
  const handlePreview = () => {
    const values = form.getFieldsValue(true); // get all fields, including empty
    navigate("/job-post/preview", {
      state: {
        ...values,
        description,
        summary,
        responsibilities: values.responsibilities || [],
        requirements: values.requirements || [],
        benefits: values.benefits || [],
        companyLogoName: companyLogoUrl || "",
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-primary flex justify-start items-center gap-4 text-xl font-semibold mb-6">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        {id ? "Edit Job Post" : "Add Job Post"}
      </h3>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          responsibilities: [""],
          requirements: [""],
          benefits: [""],
        }}
        scrollToFirstError
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Hospital Name"
              name="hospitalName"
              rules={[
                { required: true, message: "Please input hospital name" },
              ]}
            >
              <Input placeholder="Hospital Name" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input job title" }]}
            >
              <Input placeholder="Senior Nurse" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please input address" }]}
            >
              <Input placeholder="New York, USA" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select Category" style={{ width: "100%" }}>
                {categoryValue?.map((cat) => (
                  <Option key={cat._id} value={cat.type}>
                    {cat.type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Profession"
              name="profession"
              rules={[{ required: true, message: "Please select profession" }]}
            >
              <Select placeholder="Select Profession" style={{ width: "100%" }}>
                {professionValue?.map((cat) => (
                  <Option key={cat._id} value={cat.type}>
                    {cat.type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Job Type"
              name="jobType"
              rules={[{ required: true, message: "Please select job type" }]}
            >
              <Select placeholder="Select Job Type" style={{ width: "100%" }}>
                <Option value="full-time">Full time</Option>
                <Option value="part-time">Part time</Option>
                <Option value="contract">Contract</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Hours per week"
              name="hoursPerWeek"
              rules={[
                { required: true, message: "Please input hours per week" },
              ]}
            >
              <Input type="number" placeholder="38" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Salary"
              name="salary"
              rules={[{ required: true, message: "Please input salary " }]}
            >
              <Input type="number" placeholder="Salary" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Vacancy"
              name="vacancy"
              rules={[{ required: true, message: "Please input vacancy" }]}
            >
              <Input type="number" placeholder="21" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: "Please select start date" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Deadline"
              name="deadline"
              rules={[{ required: true, message: "Please select deadline" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>

          <Col span={24} className="mb-8">
            <label className="block mb-2 font-medium">Description</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              style={{ height: 150 }}
            />
            {!description && (
              <div className="text-red-600 mt-2">Description is required</div>
            )}
          </Col>

          <Form.List name="responsibilities">
            {(fields, { add, remove }) => (
              <Col span={24} className="my-8">
                <h3 className="text-xl text-primary font-bold mb-4">
                  Responsibilities
                </h3>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 12,
                      width: "100%",
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter responsibility",
                        },
                      ]}
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Input placeholder="Responsibility name..." />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={{
                        color: "#ef4444",
                        fontSize: 20,
                        cursor: "pointer",
                        marginLeft: 12,
                      }}
                    />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Responsibilities
                  </Button>
                </Form.Item>
              </Col>
            )}
          </Form.List>

          <Form.List name="requirements">
            {(fields, { add, remove }) => (
              <Col span={24} className="my-8">
                <h3 className="text-xl text-primary font-bold mb-4">
                  Requirements
                </h3>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 12,
                      width: "100%",
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      rules={[
                        { required: true, message: "Please enter requirement" },
                      ]}
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Input placeholder="Requirement name..." />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={{
                        color: "#ef4444",
                        fontSize: 20,
                        cursor: "pointer",
                        marginLeft: 12,
                      }}
                    />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Requirements
                  </Button>
                </Form.Item>
              </Col>
            )}
          </Form.List>

          <Form.List name="benefits">
            {(fields, { add, remove }) => (
              <Col span={24} className="mb-8">
                <h3 className="text-xl text-primary font-bold mb-4">
                  Benefits
                </h3>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 12,
                      width: "100%",
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      rules={[
                        { required: true, message: "Please enter benefit" },
                      ]}
                      style={{ flex: 1, marginBottom: 0 }}
                    >
                      <Input placeholder="Benefit name..." />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={{
                        color: "#ef4444",
                        fontSize: 20,
                        cursor: "pointer",
                        marginLeft: 12,
                      }}
                    />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Benefits
                  </Button>
                </Form.Item>
              </Col>
            )}
          </Form.List>

          <Col span={24} className="mb-8">
            <label className="block mb-2 font-medium">Summary</label>
            <ReactQuill
              theme="snow"
              value={summary}
              onChange={setSummary}
              style={{ height: 150 }}
            />
            {!summary && (
              <div className="text-red-600 mt-2">Summary is required</div>
            )}
          </Col>

          <Col span={24} className="my-8">
            <Form.Item label="Company Logo" name="companyLogo">
              <Upload
                beforeUpload={() => false}
                onChange={onUploadChange}
                fileList={fileList}
                maxCount={1}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Upload Company Logo</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col
            span={24}
            className="flex gap-4 justify-end"
            style={{ marginTop: 12 }}
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={!description || !summary}
              className="bg-primary w-full"
            >
              {id ? "Update Job" : "Post Job"}
            </Button>
            {/* {id ? (
              <></>
            ) : (
              <Button
                type="default"
                onClick={() => {
                  const values = form.getFieldsValue(true);
                  navigate("/job-post/preview", {
                    state: {
                      ...values,
                      description,
                      summary,
                      responsibilities: values.responsibilities || [],
                      requirements: values.requirements || [],
                      benefits: values.benefits || [],
                      companyLogoName: companyLogoUrl || "",
                    },
                  });
                }}
                disabled={!description || !summary}
              >
                Preview
              </Button>
            )} */}
          </Col>
        </Row>
      </Form>
    </div>
  );
}
