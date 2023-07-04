import { useContext } from "react";
import { AuthContext } from "../App";

export default function Trial() {
  // const { token } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  console.log("token", token);

  return (
    <>
      {!token ? (
        <h1>Not Allowed</h1>
      ) : (
        <>
          <h1>TRIAL PAGE</h1>
          <h3>Token: {token}</h3>
        </>
      )}
    </>
  );
}
