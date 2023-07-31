import { useState } from "react";
import LoginForm from "../../components/Form/SignInForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { NetworkError } from "../../errors";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { PageWrapper } from "../styles";

export default function Login() {
  console.count("LOGIN");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formObj = { name, setName, email, setEmail, password, setPassword };

  const mutation = useMutation({
    // NOTE: formData is the data/arguments from .mutate()
    mutationFn: (formData) => {
      console.log("mutateLogInUser()");
      return axios.post("http://localhost:5050/auth/login", formData);
    },
    onSuccess: (data) => {
      console.log("onSuccess data", data);
      return <Navigate to="trial" replace />;
    },
    onError: (error) => {
      // NOTE: 'error' is custom error (ie NetworkError, TokenValidationError)
      console.warn("LOGIN error is", error);
      // setErrorMsg(error.message);
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ name, email, password });
  };

  return (
    <PageWrapper>
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

            <LoginForm {...formObj} />

            <SubmitButton handleClick={handleSubmit}>Log In</SubmitButton>
          </>
        )}
      </div>
    </PageWrapper>
  );
}
