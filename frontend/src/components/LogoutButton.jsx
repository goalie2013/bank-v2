import { useContext } from "react";
import { AuthContext } from "../App";

export default function LogoutButton() {
  const { onLogout } = useContext(AuthContext);
  return (
    <button type="button" onClick={onLogout}>
      Logout
    </button>
  );
}
