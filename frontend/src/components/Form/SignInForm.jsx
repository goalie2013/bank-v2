import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { styled } from "styled-components";
import CustomCard from "../Card/Card";
import Card from "react-bootstrap/Card";
import { ThemeContext } from "../../App";

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export function useFormInput(input, initialValue, initialStatus) {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState(initialStatus);

  function handleChange(e) {
    setValue(e.target.value);
    setStatus("");
  }

  const inputProps = {
    placeholder: input,
    value: value,
    onChange: handleChange,
  };

  return inputProps;
}

export default function SignInForm(props) {
  console.log("SIGN_IN_FORM");

  const { setName, setEmail, setPassword } = props;
  const { colors } = useContext(ThemeContext);
  const [status, setStatus] = useState("");

  const nameProps = useFormInput("Name", props.name, status);
  const emailProps = useFormInput("Email", props.email, status);

  console.log("email", props.email);

  return (
    <>
      <CustomCard
        bgHeaderColor={colors.darkerTheme}
        bgColor={colors.lighterTheme}
        header="Create Account"
        title="My Title"
        statusText={status}
        // statusColor={colors.modalHeader}
        body={
          <Card.Body>
            <FormStyled onSubmit={(e) => e.preventDefault()}>
              <Form.Group className="mb-4" controlId="formName">
                {/* <Form.Label>Name</Form.Label> */}
                <Form.Control
                  style={{ color: props.nameTxtColor }}
                  required
                  type="text"
                  {...nameProps}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Control
                  style={{ color: props.emailTxtColor }}
                  required
                  type="email"
                  placeholder="Email"
                  value={props.email}
                  onChange={(event) => {
                    setEmail(event.currentTarget.value);
                    // setEmailTxtColor("black");
                    setStatus("");
                  }}
                />
                <Form.Text>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  value={props.password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                    // setPassTxtColor("gray");
                    setStatus("");
                  }}
                />
                <Form.Text style={{ color: props.passTxtColor }}>
                  Must be at least 8 characters long
                </Form.Text>
              </Form.Group>
            </FormStyled>
          </Card.Body>
        }
      />
    </>
  );
}
