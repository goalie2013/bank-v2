import { useContext } from "react";
import { AuthContext } from "../../App";
import { LogoutBtn } from "./ButtonStyles";

export default function LogoutButton() {
  const { onLogout } = useContext(AuthContext);
  return (
    <LogoutBtn type="button" onClick={onLogout}>
      Logout
    </LogoutBtn>
  );
}
