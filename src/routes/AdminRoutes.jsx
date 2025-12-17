import { Spin } from "antd";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div
        className={`h-screen w-full flex flex-col justify-center items-center`}
      >
        <Spin size="large" className="flex justify-center items-center" />
        <p className="mt-5 font-mono text-gray-500 text-center">
          Please Wait <br /> ....
        </p>
      </div>
    );
  }

  if (user?.role === "admin") {
    return children;
  }
  return <Navigate state={location.pathname} to="/auth" />;
};
AdminRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoutes;
