import { Button, Spin, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBlogDetailsQuery } from "../../../redux/features/blog/blogApi";

const { Title, Paragraph } = Typography;

const baseImageUrl = import.meta.env.VITE_IMAGE_URL;

export default function BlogDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, isError } = useGetBlogDetailsQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <Button
          type="link"
          onClick={() => navigate(-1)}
          className="mb-4 text-primary"
        >
          &lt; Back
        </Button>
        <p className="text-red-600">Failed to load blog details.</p>
      </div>
    );
  }

  const { blogTitle, description, banner } = data.data;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <Button
        type="link"
        onClick={() => navigate(-1)}
        className="mb-4 text-primary"
      >
        &lt; Back
      </Button>

      <img
        src={baseImageUrl + banner}
        alt={blogTitle}
        className="rounded-md w-full max-h-72 object-cover mb-6"
      />

      <h3 className="text-primary text-2xl font-semibold mb-4">{blogTitle}</h3>

      <p
        className="mb-6 text-base"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
