import { useContext } from "react";
import { AuthContext } from "../App";
import styled from "styled-components";
import { GoogleLogin } from "react-google-login";

export default function Home() {
  const { onLogin, onLogout } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const Title = styled.h1`
    font-size: 3rem;
    text-align: center;
    color: #bf4f32;
  `;

  // const responseGoogle = (response) => {
  //   const idToken = response.tokenObj.id_token;
  //   // Send the ID token to the server for verification
  //   axios
  //     .post("/api/login/google", { idToken })
  //     .then((response) => {
  //       // Handle the response: Navigate to ...
  //     })
  //     .catch((error) => {
  //       // Handle the error
  //     });
  // };

  return (
    <>
      <Title className="home">HOME</Title>
      {!token ? (
        <>
          <button type="button" onClick={onLogin}>
            Login
          </button>
          {/* <GoogleLogin
            clientId="your-google-client-id"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          /> */}
        </>
      ) : (
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      )}
      <h3>Token: {token}</h3>
    </>
  );
}
