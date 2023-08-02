import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const activeLinkStyles = {
  color: "#161616",
  fontWeight: "bold",
  textDecoration: "underline",
  textTransform: "uppercase",
  padding: "2em 5em",
};

export const Header = styled.header`
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LogoLink = styled(Link)`
  color: black;
  margin-right: auto;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 25px;
`;
