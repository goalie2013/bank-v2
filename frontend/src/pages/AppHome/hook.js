import { useAuthFetchUser } from "../../queries";

const useCheckUserAuth = () => {
  console.log("useCheckUserAuth()");

  const token = localStorage.getItem("token");

  if (!token) {
    // setHasToken(false);
    return { authenticated: false };
  }

  const { data, status, error, isFetching } = useAuthFetchUser(token);
  console.log("status:", status, "isFetching", isFetching);
  const d = {};

  data ? (d["data"] = data) : (d["data"] = null);

  status === "error" ? (d["error"] = error) : (d["error"] = null);

  if (status === "loading") console.warn("HOME Loading...");

  if (isFetching) {
    console.log("useCheckUserAuth isFetching");
    d["isFetching"] = isFetching;
  } else {
    d["isFetching"] = null;
  }

  //   setData(data);
  //   setIsFetching(isFetching);
  return d;
};

export { useCheckUserAuth };
