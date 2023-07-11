import Card from "react-bootstrap/Card";
import styled from "styled-components";

const StyledCard = styled(Card)`
  background: props.bgColor,
  width: "25rem",
  marginTop: "2.5rem",
  boxShadow: "0 3rem 5rem rgba(0, 0, 0, 0.2)",
  borderRadius: "20px",
`;

/* const cardWrapperStyles = {
  // backgroundColor: props.bgColor,
  background: props.bgColor,
  width: "25rem",
  marginTop: "2.5rem",
  boxShadow: "0 3rem 5rem rgba(0, 0, 0, 0.2)",
  borderRadius: "20px",
}; */

const CardHeader = styled.div`
  textAlign: "center",
  color: COLORS.lighterTheme,
  background: props.bgHeaderColor,
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  fontSize: "1.75rem",
  padding: "1rem",
  overflowWrap: "break-word",
`;

const CardStatusText = styled.div`
  color: props.statusColor,
  marginTop: "0.5rem",
  textAlign: "center",
  boxShadow: "0 0.25rem 1rem rgba(0, 0, 0, 0.3)",
`;

export { StyledCard, CardHeader, CardStatusText };
