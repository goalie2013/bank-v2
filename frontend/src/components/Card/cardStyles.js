import Card from "react-bootstrap/Card";
import styled from "styled-components";

// const StyledCard = styled(Card)`
//   width: "25rem",
//   margin-top: "2.5rem",
//   box-shadow: "0 3rem 5rem rgba(0, 0, 0, 0.2)",
//   border-radius: "20px",
// `;
//   background: props.bgColor,

/* const cardWrapperStyles = {
  // backgroundColor: props.bgColor,
  background: props.bgColor,
  width: "25rem",
  marginTop: "2.5rem",
  boxShadow: "0 3rem 5rem rgba(0, 0, 0, 0.2)",
  borderRadius: "20px",
}; */

const CardHeader = styled.div`
  text-align: center;
  background: ${(props) => props.theme.main};
  color: ${(props) => props.theme === props.theme.secondary};
  bordertopleftradius: 20px;
  bordertoprightradius: 20px;
  font-size: 1.75rem;
  padding: 1rem;
  overflowwrap: break-word;
`;

const CardStatusText = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.3);
`;

export { CardHeader, CardStatusText };
