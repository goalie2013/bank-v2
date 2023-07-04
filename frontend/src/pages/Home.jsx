import { useContext } from "react";
import { AuthContext } from "../App";

export default function Home() {
  const { onLogin, onLogout } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  return (
    <>
      <h1>HOME</h1>
      {!token ? (
        <button type="button" onClick={onLogin}>
          Login
        </button>
      ) : (
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      )}
      <h3>Token: {token}</h3>
    </>
  );
}
