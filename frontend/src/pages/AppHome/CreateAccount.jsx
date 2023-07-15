import { useState, useContext } from "react";
import CreateUserForm from "../../components/Form/SignInForm";
//import { mutateCreateUser } from "../mutations";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { NetworkError } from "../../errors";
import { AuthContext } from "../../App";

export default function CreateAccount() {
  console.count("CREATE_ACCOUNT");

  const { onLogin } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const mutation = useMutation({
    mutationFn: (formData) => {
      console.log("mutateCreateUser()");
      return axios.post("http://localhost:5050/auth/register", formData);
    },
    onSuccess: (data) => {
      console.log("onSuccess data", data);
      // localStorage.setItem("token", data.data.accessToken);
      // localStorage.setItem("refreshToken", data.data.refreshToken);
      // setData(data.data);
      // return <Navigate to="user" replace />;
      onLogin(data.data.accessToken, data.data.refreshToken);
    },
    onError: (error) => {
      // 'error' property is custom error (ie NetworkError, TokenValidationError)
      setErrorMsg(error.message);
    },
  });

  // Add a response interceptor
  axios.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response;
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      console.log("AXIOS response error", error.code);
      if (error.code === "ERR_NETWORK") {
        throw new NetworkError("MY Network Error");
      }
      return Promise.reject(error);
    }
  );

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   mutation.mutate(new FormData(event.target));
  // };

  console.count("data", data);
  console.log("data", data);

  return (
    <>
      <h1>Create Account</h1>
      <div>
        {mutation.isLoading ? (
          <h3>"Creating User..."</h3>
        ) : mutation.isSuccess ? (
          <>
            <div>Success!</div>
            <div>{data ? data.message : null}</div>
            {/* <Navigate to="/user" replace />; */}
          </>
        ) : (
          <>
            {mutation.isError ? (
              <>
                {mutation.error instanceof NetworkError ? "EUREKA" : null}
                <div>Error: {errorMsg}</div>
                {/* <div>Error: {errorMsg}</div> */}
              </>
            ) : null}

            <CreateUserForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
            <button
              onClick={() => {
                mutation.mutate({ name, email, password });
              }}
            >
              Create User
            </button>
          </>
        )}
      </div>
    </>
  );
}
