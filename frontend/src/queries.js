import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosAuthUserTokens } from "./helper/axioshelper";

const useAuthFetch = (token) => {
  console.log("useAuthFetch()");

  return useQuery({
    queryKey: ["user-auth"],
    queryFn: async () => tokenAuthVerify(token),
    onError: (error) => {
      console.log("EROROROOROR", error);
      //console.error(error.response, error.message);
      // return error;
    },
  });
};

const useLogin = (username, password) => {
  return useQuery({
    queryKey: ["user-login"],
    queryFn: async () => fetchLogin(),
  });
};

const tokenAuthVerify = async (token) => {
  {
    try {
      const response = await axios.get("http://localhost:5050/api/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Error Authorizing Token");
      }
      const data = response.json;
      // const { data } = axiosAuthUserTokens({ token });
      console.log("queryFn data", data);
      return data;
    } catch (error) {
      console.error("tokenAuthVerify Error");
      throw new Error("Error Authorizing Token");
    }
  }
};

const fetchLogin = async () => {
  {
    const response = await axios.post("/auth/login", {
      body: { username, password },
    });
    if (!response.ok) {
      throw new Error("Error Authorizing Token");
    }
    const data = response.json;
    // const { data } = axiosAuthUserTokens({ token });
    console.log("queryFn data", data);
    return data;
  }
};
export default useAuthFetch;
