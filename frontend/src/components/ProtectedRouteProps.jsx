import { Navigate } from "react-router-dom";
import useAuthFetch from "../queries";
import { useQueryClient } from "@tanstack/react-query";

//TODO: Get JWT token to check auth
const ProtectedRouteProps = ({ renderItem }) => {
  console.log("ProtectedRouteProps");

  const token = localStorage.getItem("token");
  console.log("token", token);

  if (!token) {
    console.warn("NO TOKEN! Returning to Home...");
    return <Navigate to="/" replace />;
  }

  // const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useAuthFetch({ token });
  console.log("status:", status, "data", data, "error", error.message);

  if (status === "error") {
    console.error("Error:", error.message);
    // return <span>Error: {error.message}</span>;
    return <Navigate to="/" replace />;
    // TODO: Erase token? Sign user out?
  }

  const isStatus = status;

  return renderItem(isStatus, data);
};

export default ProtectedRouteProps;
