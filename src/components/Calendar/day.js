import React, { useState } from "react";
import { format } from "date-fns";
import {} from "react-bootstrap";
import "../../styles/style.scss";

export default function Day(props) {
  const [details, setDetails] = useState(false);
  const today = format(new Date(), "d/MM/yyyy");
  const day = props.day + "/" + props.month + "/" + props.year;
  console.log("TODAY", today, day);
  return (
    <td
      onMouseEnter={() => setDetails(true)}
      onMouseLeave={() => setDetails(false)}
      style={
        props.day === null
          ? {
              opacity: "0",
            }
          : {}
      }>
      {/* {details && events ?
       SHOWDETAILS
       : ""} */}
      <div
        className='cell'
        style={
          today === day
            ? {
                backgroundColor: "#d9534f",
                transition: "all 0.2s ease",
              }
            : props.dayOfTheWeek == 6 || props.dayOfTheWeek == 0
            ? { color: "#999" }
            : {}
        }>
        {props.day}
        {props.events.map((event) => event.date === day && "kut")}
      </div>
    </td>
  );
}
