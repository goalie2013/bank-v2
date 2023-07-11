import { Navigate } from "react-router-dom";
import useAuthFetch from "../queries";
import { useQueryClient } from "@tanstack/react-query";

const ProtectedRouteProps = ({ renderItem }) => {
  console.log("ProtectedRouteProps");

  const token = localStorage.getItem("token");
  console.log("token", token);

  if (!token) {
    console.warn("NO TOKEN! Returning to Home...");
    return <Navigate to="/" replace />;
    // onLogout()
  }

  // const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useAuthFetch({ token });
  console.log("status:", status, "data", data, "error", error.message);

  if (status === "error") {
    console.error("Error:", error.message);
    // return <span>Error: {error.message}</span>;
    return <Navigate to="/" replace />;
    // TODO: Update return component; Erase token? Sign user out?
  }

  if (status === "loading") {
    console.log("LOADING...");
    // return <Loading />
    return <h3>Loading</h3>;
  }

  // const isStatus = status;

  return renderItem(data);
};

export default ProtectedRouteProps;
