import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuthFetchUser } from "../queries";
import { useQueryClient } from "@tanstack/react-query";
import { TokenValidationError } from "../errors";
import { AuthContext } from "../App";

const ProtectedRouteProps = ({ renderItem }) => {
  console.count("ProtectedRouteProps");

  const { onLogout } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  console.log("token", token);

  if (!token) {
    console.warn("NO TOKEN! Returning to Home...");

    return onLogout();
  }

  // Check for token authentication
  // const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useAuthFetchUser(token);
  console.log("status:", status, "data", data);

  if (status === "error") {
    console.error("ProtectedRouteProps Error:", error.message);
    // return <span>Error: {error.message}</span>;
    // TODO: Update return component; Erase token? Sign user out?
    if (error instanceof TokenValidationError)
      console.log("Error Type: Token Validation Error");
    // onLogout()

    return onLogout();
  }

  if (status === "loading") {
    console.log("LOADING...");
    // return <Loading />
    return <h3>Loading</h3>;
  }

  return renderItem(data);
};

export default ProtectedRouteProps;
