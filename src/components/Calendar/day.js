import React, { useState } from "react";
import { format } from "date-fns";
import {} from "react-bootstrap";
import "../../styles/style.scss";

export default function Day(props) {
  const [details, setDetails] = useState(false);
  const today = format(new Date(), "d/M/yyyy");
  const day = props.day + "/" + props.month + "/" + props.year;
  return (
    <td
      onMouseEnter={() => setDetails(true)}
      onMouseLeave={() => setDetails(false)}
      style={
        props.dayOfTheWeek == 6 || props.dayOfTheWeek == 0
          ? { color: "#999" }
          : today === day
          ? {
              backgroundColor: "#d9534f",
              transition: "all 0.2s ease",
            }
          : props.day === null
          ? {
              opacity: "0",
            }
          : {}
      }>
      {/* {details && events ?
       SHOWDETAILS
       : ""} */}
      {props.day}
    </td>
  );
}
