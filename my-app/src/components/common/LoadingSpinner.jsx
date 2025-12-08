import { Spin } from "antd";

const LoadingSpinner = ({ size = "large", tip, fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size={size} tip={tip} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-12">
      <Spin size={size} tip={tip} />
    </div>
  );
};

export default LoadingSpinner;
