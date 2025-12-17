import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import { useGetAboutQuery } from "../../redux/features/setting/settingApi";

// --- New Function to Unescape HTML Entities ---
// const unescapeHtml = (html) => {
//   if (!html) return "";
//   const doc = new DOMParser().parseFromString(html, "text/html");
//   return doc.documentElement.textContent;
// };
// ----------------------------------------------

const About = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAboutQuery();

  // const unescapedHtml = unescapeHtml(data?.data?.aboutUs);

  return (
    <div className="min-h-[70vh] flex flex-col justify-between">
      <div className="space-y-4">
        <PageHeading
          title={"About Us"}
          disbaledBackBtn={true}
          className={"text-button"}
        />

        <div className="w-full bg-white rounded-2xl min-h-[60vh] p-5">
          {isLoading ? (
            <div className="h-[60vh] w-full flex justify-center items-center">
              <Spin size="large" />
            </div>
          ) : (
            <div
              className="no-tailwind"
              // Use the unescaped HTML here
              dangerouslySetInnerHTML={{ __html: data?.data?.aboutUs }}
            />
          )}
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

export default About;
