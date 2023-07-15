import { useState } from "react";
import LoginForm from "../../components/Form/SignInForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { NetworkError } from "../../errors";

export default function Login() {
  console.log("LOGIN");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: (formData) => {
      console.log("mutateLogInUser()");
      return axios.post("http://localhost:5050/auth/login", formData);
    },
    onSuccess: (data) => {
      console.log("onSuccess data", data);
      return <Navigate to="trial" replace />;
    },
    onError: (error) => {
      // 'error' is custom error (ie NetworkError, TokenValidationError)
      console.warn("LOGIN error is", error);
      // setErrorMsg(error.message);
    },
  });

  return (
    <>
      <h1>LOGIN</h1>
      <div>
        {mutation.isLoading ? (
          <h3>"Logging In User..."</h3>
        ) : (
          <>
            {mutation.isError ? (
              <>
                {mutation.error instanceof NetworkError ? "EUREKA" : null}
                <div>Error: {mutation.error.message}</div>
                {/* <div>Error: {errorMsg}</div> */}
              </>
            ) : null}

            <LoginForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
            <button
              onClick={() => {
                mutation.mutate({ username: name, email, password });
              }}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </>
  );
}
