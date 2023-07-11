import { useContext } from "react";
import { AuthContext } from "../App";
import styled from "styled-components";

export default function UserHome({ data }) {
  console.log("UserHome Component");

  const { onLogin, onLogout } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const Title = styled.h1`
    font-size: 3.5rem;
    text-align: center;
    color: #cd4f32;
  `;

  console.log("data", data);

  return (
    <>
      <Title className="home">USER HOME</Title>
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
