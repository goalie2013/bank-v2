import { useQuery } from "@tanstack/react-query";
import { axiosAuthUserTokens } from "./helper/axioshelper";

const useAuthFetch = (token) => {
  return useQuery({
    queryKey: ["user-auth"],
    queryFn: async () => {
      //const {data} = await axios.get('https')
      // return data
      const { data } = axiosAuthUserTokens({ token });
      console.log("queryFn data", data);
      return data;
    },
  });
};

export default useAuthFetch;