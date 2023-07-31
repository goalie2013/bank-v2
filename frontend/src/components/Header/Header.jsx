import { useContext } from "react";
import NavBarLoggedOut from "./NavBarLoggedOut";
import NavBarLoggedIn from "./NavBarLoggedIn";
import { AuthContext } from "../../App";
import { useCheckUserAuth } from "../../pages/AppHome/hook";

export default function Header() {
  console.count("HEADER");

  // NOTE: using Context over axios hook to reduce amount of API calls to server
  const { isLoggedIn } = useContext(AuthContext);
  // const data = useCheckUserAuth();
  // return data && data.data ? <NavBarLoggedIn /> : <NavBarLoggedOut />;

  return isLoggedIn ? <NavBarLoggedIn /> : <NavBarLoggedOut />;
}
