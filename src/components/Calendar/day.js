import React from "react";
import { format } from "date-fns";
import {} from "react-bootstrap";

export default function Day(props) {
  const today = format(new Date(), "d/M/yyyy");
  const day = props.day + "/" + props.month + "/" + props.year;
  return (
    <td
      style={
        today === day
          ? {
              backgroundColor: "rgba(255, 0, 0, 0.8)",
              transition: "all ease-in-out 100ms",
            }
          : props.day === null
          ? {
              backgroundColor: "#fff",
              boxShadow: "0px 0px 0px #fff",
              transform: "scale3d(1, 1, 1)",
            }
          : {}
      }>
      {props.day}
    </td>
  );
}
