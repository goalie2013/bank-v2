import { useState, useContext } from "react";
import CreateUserForm from "../../components/Form/SignInForm";
//import { mutateCreateUser } from "../mutations";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import { NetworkError } from "../../errors";
import { AuthContext } from "../../App";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { PageWrapper, BXX } from "../styles";
import LoginForm from "../../components/Form/LoginForm";
import ApiService from "../../service";

export default function CreateAccount({ apiService }) {
  console.count("CREATE_ACCOUNT");

  const { onLogin } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const formObj = { name, setName, email, setEmail, password, setPassword };

  const mutation = useMutation({
    mutationFn: (formData) => {
      console.log("mutateCreateUser()");
      // return axios.post("http://localhost:5050/auth/register", formData);
      return ApiService.registerUser(formData);
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
  const handleSubmit = () => {
    mutation.mutate({ name, email, password });
  };

  return (
    <PageWrapper>
      <h1 style={{ fontWeight: 900, marginBottom: "0.5rem" }}>
        Create Account
      </h1>
      <h5 style={{ marginTop: "1rem" }}>
        Already have an accout?{" "}
        <Link to="/login" className="link">
          Log In Here
        </Link>
      </h5>

      <BXX>
        {mutation.isLoading ? (
          <h3>"Creating User..."</h3>
        ) : mutation.isSuccess ? (
          <>
            <div>Success!</div>
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

            {/* <CreateUserForm {...formObj} /> */}
            <SubmitButton handleClick={handleSubmit}>
              Create Account
            </SubmitButton>
            <LoginForm {...formObj} />
          </>
        )}
      </BXX>
    </PageWrapper>
  );
}
