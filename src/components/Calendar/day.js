import React, { useState } from "react";
import { format } from "date-fns";
import {} from "react-bootstrap";
import "../../styles/style.scss";

export default function Day(props) {
  const today = format(new Date(), "d/MM/yyyy");
  const day = props.day + "/" + props.month + "/" + props.year;
  const [details, showDetails] = useState(false);

  let color;
  switch (props.dayOfTheWeek) {
    case 0:
      color = "#dbdbdb";
      break;
    case 1:
      color = "#84d4d4";
      break;
    case 2:
      color = "#f8fab8";
      break;
    case 3:
      color = "#f8dc88";
      break;
    case 4:
      color = "#a0f088";
      break;
    case 5:
      color = "#f76a8c";
      break;
    case 6:
      color = "#dbdbdb";
      break;
    default:
      color = "white";
  }
  return (
    <div
      className='cell'
      style={
        today === day
          ? {
              backgroundColor: "#d9534f",
              transition: "all 0.2s ease",
              border: "2px solid black",
            }
          : { backgroundColor: color }
      }
      onMouseEnter={() => showDetails(true)}
      onMouseLeave={() => showDetails(false)}>
      {props.day}
      <span className='weekno'>{details && `Week ${props.weekNumber}`}</span>
      <div className='calEvents'>
        {props.events.map(
          (event) =>
            event.date === day && (
              <div key={event.id}>
                <span
                  style={{
                    color: `${event.member && event.member.colour}`,
                  }}>
                  &#9632;
                </span>
                <span className='eventTitle'>
                  {details && ` ${event.title}`}
                </span>
              </div>
            )
        )}
      </div>
    </div>
  );
}
