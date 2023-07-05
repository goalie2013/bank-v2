import { useContext } from "react";
import { AuthContext } from "../App";
import styled from "styled-components";

export default function Home() {
  const { onLogin, onLogout } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const Title = styled.h1`
    font-size: 3rem;
    text-align: center;
    color: #bf4f32;
  `;
  return (
    <>
      <Title className="home">HOME</Title>
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
