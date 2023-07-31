import { styled } from "styled-components";
import Button from "react-bootstrap/esm/Button";

const Btn = styled(Button)`
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.main};
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  margin: 1em;
  padding: 0.6em 1.2em;
  border: 1px solid ${(props) => props.theme.secondary};
  border-radius: 8px;
  box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.5);
  transition: border-color 0.25s;
`;

const LoginBtn = styled(Btn)`
  font-weight: 800;
`;
const LogoutBtn = styled(LoginBtn)``;

const SubmitBtn = styled(Btn)`
  place-items: center;
  margin-top: 1.5rem;
`;

//TODO:Update theme & color for disabled btn
const DisabledSubmitBtn = styled(SubmitBtn)`
  background-color: ${(props) => props.theme.main};
  color: ${(props) => props.theme.secondary};
  border-color: #e1e2e2;
`;
//   background-color: ${colors.disabledBtnColor},
//   color: ${colors.lighterTheme},

export { DisabledSubmitBtn, SubmitBtn, LoginBtn, LogoutBtn };
