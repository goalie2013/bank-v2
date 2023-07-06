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
        throw new Error("Network Error");
      }
      const data = response.json;
      // return data
      // const { data } = axiosAuthUserTokens({ token });
      console.log("queryFn data", data);
      return data;
    },
  });
};

export default useAuthFetch;
