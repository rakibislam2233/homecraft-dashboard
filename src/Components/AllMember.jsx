import { Avatar, Button, Card, Grid, Spin } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCommunityByIdQuery } from "../redux/features/community/communityApi";

const { useBreakpoint } = Grid;

export default function AllMember() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetCommunityByIdQuery(id);
  const members = data?.data?.members || [];
  const screens = useBreakpoint();
  const baseImageUrl = import.meta.env.VITE_IMAGE_URL;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-6">
        <Button
          type="text"
          onClick={() => navigate(-1)}
          icon={
            <span className="text-lg">
              {" "}
              <FaArrowLeft />{" "}
            </span>
          }
          className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full"
        />
        <h2 className="text-2xl font-bold">All Members ({members.length})</h2>
      </div>

      <div
        className={`grid ${screens.md ? "grid-cols-2" : "grid-cols-1"} gap-4`}
      >
        <>
          {members.length === 0 ? (
            <>
              <h3 className="text-2xl font-semibold text-red-600">
                {" "}
                No members Found!{" "}
              </h3>
            </>
          ) : (
            <>
              {members.map((member) => (
                <Card
                  key={member.id}
                  className="hover:shadow-lg transition-shadow duration-200"
                  bodyStyle={{ padding: "16px" }}
                >
                  <div className="flex items-center gap-4">
                    <Avatar
                      size={64}
                      src={member.image ? baseImageUrl + member.image : null}
                      className="bg-primary"
                    >
                      {!member.image && member.name?.charAt(0).toUpperCase()}
                    </Avatar>

                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{member.email}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          )}
        </>
      </div>
    </div>
  );
}
