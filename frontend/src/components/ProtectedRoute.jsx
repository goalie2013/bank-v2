import { Navigate } from "react-router-dom";
import { useAuthFetchUser } from "../queries";
import { useQueryClient } from "@tanstack/react-query";

//TODO: Get JWT token to check auth
const ProtectedRoute = ({ children }) => {
  console.log("ProtectedRoute");

  const token = localStorage.getItem("token");
  console.log("token", token);

  if (!token) {
    console.warn("NO TOKEN! Returning to Home...");
    return <Navigate to="/" replace />;
  }

  // const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useAuthFetchUser({ token });
  console.log("status:", status, "data", data);

  if (status === "error") console.error("error", error.message);

  return children;
};

export default ProtectedRoute;
