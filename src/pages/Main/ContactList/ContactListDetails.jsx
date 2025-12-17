import { Button, Card, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetContactDetailsQuery } from "../../../redux/features/contact/contactApi";

const { Text, Paragraph } = Typography;

export default function ContactListDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetContactDetailsQuery(id);

  const contact = data?.data;

  if (isLoading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  if (isError || !contact) {
    return <p className="text-center mt-8">Contact not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Button
        type="link"
        onClick={() => navigate(-1)}
        className="mb-4 text-primary flex items-center"
      >
        &lt; Contact Details
      </Button>

      <Card className="bg-blue-50 p-6" bordered={false}>
        <div className="flex justify-between font-semibold mb-6 text-base">
          <Text>Name: {contact.name}</Text>
          <Text>Email: {contact.email}</Text>
        </div>
        <Paragraph className="text-sm whitespace-pre-wrap">
          {contact.description}
        </Paragraph>
      </Card>
    </div>
  );
}
