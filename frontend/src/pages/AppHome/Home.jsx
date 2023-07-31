import { useState, useEffect } from "react";
import styled from "styled-components";
// import { GoogleLogin } from "react-google-login";
import LogoutButton from "../../components/Buttons/LogoutButton";
import { Navigate, useOutletContext } from "react-router";
import { useCheckUserAuth } from "./hook";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../styles";

//TODO: change useEffect to useContext like in Header.jsx
//TODO: (Fake) Counter showing how much money has been transacted in app

export default function Home() {
  console.count("HOME");
  const navigate = useNavigate();

  // const [hasToken, setHasToken] = useState(true);
  // const [data, setData] = useState(true);
  // const [isFetching, setIsFetching] = useState("");
  const token = localStorage.getItem("token");
  const Title = styled.h1`
    font-size: 3rem;
    text-align: center;
    color: #bf4f32;
    border: 5px solid blue;
  `;

  // const { data, isFetching, status } = useOutletContext();
  // console.log("HOME data", data);

  // useEffect(() => {
  //   console.log("HOME useEffect");
  //   if (!token) {
  //     setHasToken(false);
  //   } else {
  //     const { data, status, error, isFetching } = useAuthFetchUser({ token });
  //     console.log("status:", status, "isFetching", isFetching);

  //     if (status === "error")
  //       console.error("HOME Error:", error, error.message);

  //     if (status === "loading") console.warn("HOME Loading...");

  //     if (isFetching) console.log("HOME isFetching");

  //     setData(data);
  //     setIsFetching(isFetching);
  //   }
  // }, [token]);

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
  // console.count("data");

  const data = useCheckUserAuth();
  console.log("data", data);
  data && data.data ? navigate("/user") : null;

  return (
    <PageWrapper>
      {data &&
        (data.data ? (
          <>
            <Title>HOME</Title>
            <LogoutButton />
            <h3>Token: {token}</h3>
          </>
        ) : data.isFetching ? (
          <h1>Refreshing...</h1>
        ) : (
          <>
            <h2>Not Logged In</h2>
            <ul>
              <li>
                offers convenience and accessibility as you can access your
                account information and perform transactions from anywhere at
                any time.
              </li>
              <li>
                you can quickly and easily transfer funds to other accounts, pay
                bills, and manage your finances with just a few clicks
              </li>
              <li>
                Finally, our app is intuitive and user-friendly, making it easy
                to navigate and understand even for those who are not
                tech-savvy. Overall, our banking app is a reliable and efficient
                tool for managing your finances.
              </li>
            </ul>
          </>
        ))}
    </PageWrapper>
  );
}
