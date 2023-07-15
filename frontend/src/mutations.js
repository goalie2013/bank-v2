import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const mutateCreateUser = useMutation({
  mutationFn: (formData) => {
    console.log("mutateCreateUser()");
    return axios.post("http://localhost:5050/auth/register", formData);
  },
});

export { mutateCreateUser };
