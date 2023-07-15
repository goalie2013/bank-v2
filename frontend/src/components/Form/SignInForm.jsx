import { useState } from "react";
import Form from "react-bootstrap/Form";

export default function SignInForm(props) {
  console.log("SIGN_IN_FORM");

  const { name, setName, email, setEmail, password, setPassword } = props;

  const [status, setStatus] = useState("");

  return (
    <Form className="form" onSubmit={(e) => e.preventDefault()}>
      <Form.Group className="mb-4" controlId="formName">
        {/* <Form.Label>Name</Form.Label> */}
        <Form.Control
          style={{}}
          required
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => {
            setName(event.currentTarget.value);
            // setNameTxtColor("black");
            setStatus("");
          }}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formEmail">
        <Form.Control
          style={{}}
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
            // setEmailTxtColor("black");
            setStatus("");
          }}
        />
        <Form.Text>We'll never share your email with anyone else.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formPassword">
        <Form.Control
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
            // setPassTxtColor("gray");
            setStatus("");
          }}
        />
        <Form.Text style={{}}>Must be at least 8 characters long</Form.Text>
      </Form.Group>
    </Form>
  );
}
