import { useQuery } from "@tanstack/react-query";
import { axiosAuthUserTokens } from "./helper/axioshelper";

const useAuthFetch = (token) => {
  return useQuery({
    queryKey: ["user-auth"],
    queryFn: async () => {
      const response = await axios.get("/api/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Error Authorizing Token");
      }
      const data = response.json;
      // const { data } = axiosAuthUserTokens({ token });
      console.log("queryFn data", data);
      return data;
    },
  });
};

const useLogin = (username, password) => {
  return useQuery({
    queryKey: ["user-login"],
    queryFn: async () => {
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
    },
  });
};

export default useAuthFetch;
