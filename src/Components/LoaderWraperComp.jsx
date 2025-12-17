/* eslint-disable react/prop-types */
import { Empty } from "antd";
import { RotatingLines } from "react-loader-spinner";
import { cn } from "../lib/utils";

const LoaderWraperComp = ({
  isLoading,
  isError,
  className,
  loader,
  dataEmpty = false,
  children,
}) => {
  // Simplify conditional rendering for better readability
  if (isLoading || isError || dataEmpty) {
    let content;

    if (isLoading) {
      content = loader || (
        <RotatingLines
          visible={true}
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          height="60"
          width="60"
          color="#222f6b"
          radius="12.5"
          wrapperClass="grid-wrapper"
          wrapperStyle={{}}
        />
      );
    } else if (isError) {
      content = (
        <h1 className="text-red-400">
          {isError.message || "Something went wrong!"}
        </h1>
      );
    } else if (dataEmpty) {
      content = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    return (
      <div
        className={cn(
          `h-[50vh] w-full flex flex-col justify-center items-center`,
          className
        )}
      >
        {content}
      </div>
    );
  }

  return children;
};

export default LoaderWraperComp;
