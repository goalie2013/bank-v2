import { useContext } from "react";
import styled from "styled-components";
// import { GoogleLogin } from "react-google-login";
import { AuthContext } from "../App";
import useAuthFetch from "../queries";

function Login() {
  const { onLogin } = useContext(AuthContext);
  return (
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
  );
}

function Logout() {
  const { onLogout } = useContext(AuthContext);
  return (
    <button type="button" onClick={onLogout}>
      Logout
    </button>
  );
}
export default function Home() {
  console.log("HOME");

  const token = localStorage.getItem("token");
  const Title = styled.h1`
    font-size: 3rem;
    text-align: center;
    color: #bf4f32;
  `;

  if (!token) return <Login />;

  const { data, status, error, isFetching } = useAuthFetch({ token });
  console.log("status:", status, "isFetching", isFetching);

  if (status === "error") console.error("HOME Error:", error);

  if (status === "loading") console.warn("HOME Loading...");

  if (isFetching) console.log("HOME isFetching");

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
  //       console.error('Error:', error.message)
  //     });
  // };
  console.count("data", data);

  return (
    <>
      {data ? (
        <>
          <Title className="home">HOME</Title>
          <Logout />
          <h3>Token: {token}</h3>
        </>
      ) : isFetching || status === "loading" ? (
        <h1>Refreshing...</h1>
      ) : (
        <h2>Not Logged In</h2>
      )}
    </>
  );
}
