import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const mutateCreateUser = useMutation({
  mutationFn: (formData) => {
    console.log("mutateCreateUser()");
    return axios.post("http://localhost:5050/auth/register", formData);
  },
});

const mutateLogin = useMutation({
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

export { mutateCreateUser, mutateLogin };
