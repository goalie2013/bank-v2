import { useAuthFetchUser } from "../../queries";

const useCheckUserAuth = () => {
  console.log("useCheckUserAuth()");

  const token = localStorage.getItem("token");

  if (!token) return { authenticated: false };

  const { data, status, error, isFetching } = useAuthFetchUser(token);
  console.log("status:", status, "isFetching", isFetching);

  const d = {};

  data ? (d["data"] = data) : (d["data"] = null);

  status === "error" ? (d["error"] = error) : (d["error"] = null);

  if (status === "loading") console.warn("HOME Loading...");

  isFetching ? (d["isFetching"] = isFetching) : (d["isFetching"] = null);

  //   setData(data);
  //   setIsFetching(isFetching);
  return d;
};

export { useCheckUserAuth };
