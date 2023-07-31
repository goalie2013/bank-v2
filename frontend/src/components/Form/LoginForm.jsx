import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import ColorProvider from "../../providers/ThemeProvider";
import Card from "react-bootstrap/Card";
import { ThemeContext } from "../../App";
import { FormBody } from "./formStyles";
import FormWrapper from "./FormWrapper";
import useFormInput from "./formHooks";
import { useForm } from "react-hook-form";

export default function LoginForm(props) {
  console.log("LOG_IN_FORM");
  const { setName, setEmail, setPassword } = props;

  //   const { colors, theme } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [status, setStatus] = useState("");

  const nameProps = useFormInput("Name", props.name, status);
  const emailProps = useFormInput("Email", props.email, status);

  console.log("name", name);

  return (
    <>
      {/* <ColorProvider theme={theme}> */}
      <FormWrapper>
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginBottom: "4em" }}>
            {/* <Form.Label>Name</Form.Label> */}
            <input
              type="text"
              required
              style={{
                background: "white",
                color: props.nameTxtColor || "black",
              }}
              {...nameProps}
            />
          </div>
        </form>
      </FormWrapper>
      {/* </ColorProvider> */}
    </>
  );
}
