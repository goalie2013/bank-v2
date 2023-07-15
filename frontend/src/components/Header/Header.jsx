import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthFetchUser } from "../../queries";
import NavBarLoggedOut from "./NavBarLoggedOut";
import NavBarLoggedIn from "./NavBarLoggedIn";
import { AuthContext } from "../../App";
import { useCheckUserAuth } from "../../pages/AppHome/hook";

export default function Header() {
  console.count("HEADER");

  const { isLoggedIn } = useContext(AuthContext);
  const data = useCheckUserAuth();
  return data && data.data ? <NavBarLoggedIn /> : <NavBarLoggedOut />;
  // const token = localStorage.getItem("token");
  // console.log("token", token);

  // if (!token) {
  //   console.warn("HEADER: NO TOKEN!");

  //   const refreshToken = localStorage.getItem("refreshToken");
  //   refreshToken && localStorage.removeItem("refreshToken");
  //   return <NavBarLoggedOut />;
  // }

  // // const queryClient = useQueryClient();
  // const { status, data, error, isFetching } = useAuthFetchUser({ token });
  // console.log("status:", status, "data", data);

  // if (status === "error") {
  //   console.error("HEADER Error:", error.message);
  //   // return <span>Error: {error.message}</span>;
  //   // TODO: Update return component; Erase token? Sign user out?
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("refreshToken");
  //   return <NavBarLoggedOut />;
  // }

  // if (status === "loading") {
  //   console.log("LOADING...");
  //   // return <Loading />
  //   // return <h3>Loading</h3>;
  // }

  // return isLoggedIn ? <NavBarLoggedIn /> : <NavBarLoggedOut />;
  // <NavBarLoggedIn />
}
