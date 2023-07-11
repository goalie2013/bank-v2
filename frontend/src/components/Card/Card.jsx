import Card from "react-bootstrap/Card";
import { COLORS } from "../themes";
import { StyledCard, CardHeader, cardStatusTextStyles } from "./cardStyles";

// Dynamic Styles
export default function CustomCard(props) {
  // Separate Card Header & Body so doesn't have to be the same color
  function classes() {
    const bg = props.bgColor ? " bg-" + props.bgColor : " ";
    const txt = props.txtColor ? " text-" + props.txtColor : " text-black";
    // console.log("bg", bg);
    return "card custom-card mb-3 rounded " + bg + txt;
  }

  const classesAlert = (str) => {
    return str === COLORS.transactionComplete
      ? "alert alert-success"
      : "alert alert-danger";
  };

  return (
    <StyledCard className="{classes()} kk imageborder">
      <CardHeader>{props.header}</CardHeader>

      <Card.Body>
        {/* Title */}
        {props.title && (
          <h5 className="card-title" style={{ fontWeight: "800" }}>
            {props.title}
          </h5>
        )}

        {/* Text */}
        {/* {props.text && (
          <p className="card-text" style={{ fontWeight: "700" }}>
            {props.text}
          </p>
        )} */}

        {/* Body */}
        {props.body}

        {/* Status Text */}
        {props.statusText && (
          <div
            className={classesAlert(props.statusColor)}
            role="alert"
            style={{ cardStatusTextStyles }}
          >
            {props.statusText}
          </div>
        )}
      </Card.Body>
    </StyledCard>
  );
}
