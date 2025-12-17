import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import { useGetPrivacyQuery } from "../../redux/features/setting/settingApi";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetPrivacyQuery();
  // console.log(data.data[0]?.description);

  return (
    <div className="min-h-[70vh] flex flex-col justify-between">
      <div className="space-y-4">
        <PageHeading
          title={"Privacy Policy"}
          disbaledBackBtn={true}
          className={"text-button"}
        />

        <div className="w-full bg-white rounded-2xl min-h-[60vh] p-5">
          {isLoading ? (
            <div className="h-[60vh] w-full flex justify-center items-center">
              <Spin size="large" />
            </div>
          ) : (
            // <div
            //   className="no-tailwind"
            //   // dangerouslySetInnerHTML={{ __html: data?.data?.description }}
            //   dangerouslySetInnerHTML={{ __html: data?.data[0]?.description }}
            // />
            <h3>Static privacy policy</h3>
          )}
          {/* <h3> Static Privacy Policy </h3> */}
        </div>

        <div className="flex justify-end pt-5">
          <Button
            onClick={() => navigate("edit")}
            size="large"
            htmlType="submit"
            type="primary"
            className="px-8 w-[250px]"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
