import React from "react";
import Button from "react-bootstrap/Button";
import { DisabledSubmitBtn, SubmitBtn } from "./ButtonStyles";

export default function SubmitButton(props) {
  return props.disabled ? (
    <DisabledSubmitBtn
      disabled
      variant="primary"
      className="submit-btn py-3 disabled"
      onClick={props.handleClick}
    >
      {props.children}
    </DisabledSubmitBtn>
  ) : (
    <SubmitBtn
      variant="primary"
      className="submit-btn py-3"
      onClick={props.handleClick}
      type="submit"
    >
      {props.children}
    </SubmitBtn>
  );
}
