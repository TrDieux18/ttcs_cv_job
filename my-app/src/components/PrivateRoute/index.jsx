import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isUser = useSelector((state) => state.user.user);

  return <>{isUser ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default PrivateRoute;
