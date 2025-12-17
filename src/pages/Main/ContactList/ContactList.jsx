import { Button, Card, Pagination, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetContactsQuery } from "../../../redux/features/contact/contactApi";

const { Text, Paragraph } = Typography;

export default function ContactList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data } = useGetContactsQuery({ page });
  console.log(data);

  const contactData = data?.data?.allContact || [];
  const totalItems = data?.data?.pagination?.totalData || 0;

  const handlePaginationChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto mt-8">
        <h3 className="text-primary text-2xl font-bold mb-4">Contact List</h3>
        <div className=" grid grid-cols-1 xl:grid-cols-2 gap-4">
          {contactData?.map((contact) => (
            <Card
              key={contact._id}
              className="mb-4 bg-secondary"
              bodyStyle={{ padding: "16px" }}
              hoverable
            >
              <div className="flex justify-between font-semibold text-base mb-2">
                <Text>User name : {contact.name}</Text>
                <Text>Email : {contact.email}</Text>
              </div>
              <Paragraph
                className="text-sm mb-4"
                ellipsis={{ rows: 2, expandable: false, symbol: "see more" }}
              >
                {contact.description}
              </Paragraph>
              <Button
                type="primary"
                onClick={() => navigate(`/contact-list/${contact._id}`)}
              >
                Details
              </Button>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex justify-center p-4">
        <Pagination
          current={page}
          total={totalItems}
          pageSize={10}
          onChange={handlePaginationChange}
          showQuickJumper
          showSizeChanger={false}
        />
      </div>
    </>
  );
}
