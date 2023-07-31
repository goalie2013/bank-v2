import { useContext } from "react";
import Card from "react-bootstrap/Card";
import { CardHeader, CardStatusText } from "./cardStyles";
import { ThemeContext } from "../../App";

export default function CustomCard(props) {
  const { colors } = useContext(ThemeContext);

  // const cc = {
  //   textAlign: "center",
  //   background: colors.darkerTheme,
  //   color: colors.lighterTheme,
  //   borderTopLeftRadius: "20px",
  //   borderTopRightRadius: "20px",
  //   fontSize: "1.75rem",
  //   padding: "1rem",
  //   overflowWrap: "break-word",
  // };

  // Dynamic Styling
  // Separate Card Header & Body so doesn't have to be the same color
  function classes() {
    console.log("Card classes()");
    const bg = props.bgColor ? "bg-" + props.bgColor + " " : "";
    const txt = props.txtColor ? "text-" + props.txtColor : "text-black";
    console.log("bg", bg);
    return "mb-3 " + bg + txt;
  }

  const classesAlert = (str) => {
    console.log("classesAlert ColorProvider:", colors);

    return str === colors.transactionComplete
      ? "alert alert-success"
      : "alert alert-danger";
  };

  return (
    <Card
      // className="bg-light"
      className={classes()}
      style={{
        // background: props.bgColor,
        borderRadius: "20px",
        boxShadow: "0 3rem 5rem rgba(0, 0, 0, 0.2)",
        marginTop: "2.5rem",
        width: "25rem",
      }}
    >
      <CardHeader>{props.header}</CardHeader>
      {/* <div style={cc}>{props.header}</div> */}

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
          <CardStatusText
            className={classesAlert(props.statusColor)}
            role="alert"
            // style={{ cardStatusTextStyles }}
          >
            {props.statusText}
          </CardStatusText>
        )}
      </Card.Body>
    </Card>
  );
}
