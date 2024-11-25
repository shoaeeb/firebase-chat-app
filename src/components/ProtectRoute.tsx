import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "../store/user";

const ProtectRoute = () => {
  const user = useAuthUser((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoute;
