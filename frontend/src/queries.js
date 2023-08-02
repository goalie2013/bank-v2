import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TokenValidationError } from "./errors";
import ApiService from "./service";

// Check token authentication & return user data
//const useAuthFetchUser = (token, apiService = new ApiService()) => {
const useAuthFetchUser = (token) => {
  console.log("useAuthFetchUser()");

  return useQuery({
    queryKey: ["user-auth"],
    queryFn: async () => tokenAuthVerify(token),
    onError: (error) => {
      console.log("ERRRROOOR", error);
      //console.error(error.response, error.message);
      return error;
    },
  });
};

// const tokenAuthVerify = async (token, apiService) => {
const tokenAuthVerify = async (token) => {
  {
    try {
      // const response = await axios.get("http://localhost:5050/api/protected", {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      const response = ApiService.getProtectedRoute(token);
      console.log("RESPONSE", response);

      if (response.statusText !== "OK") {
        console.log("tokenAuthVerify response NOT OK", response);
        throw new TokenValidationError("Error Authorizingjjjj Token");
      }
      console.log("response", response);
      const data = response.data;
      return data;
    } catch (error) {
      throw new TokenValidationError("Error Authorizing Token");
    }
  }
};

export { useAuthFetchUser };
