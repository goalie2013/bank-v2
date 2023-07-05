import { Navigate } from "react-router-dom";
import useAuthFetch from "../queries";
import { useQueryClient } from "@tanstack/react-query";

//TODO: Get JWT token to check auth
const ProtectedRoute = ({ children }) => {
  // const { token } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  console.log("ProtectedRoute");
  console.log("token:", token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  // const queryClient = useQueryClient();
  // const { status, data, error, isFetching } = useAuthFetch({ token });
  // console.log("status:", status, "data", data, "error", error);

  return children;
};

export default ProtectedRoute;
