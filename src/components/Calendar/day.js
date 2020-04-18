import React, { useState } from "react";
import { format } from "date-fns";
import {} from "react-bootstrap";
import "../../styles/style.scss";

export default function Day(props) {
  const today = format(new Date(), "d/MM/yyyy");
  const day = props.day + "/" + props.month + "/" + props.year;
  const [details, showDetails] = useState(false);

  const clickHandler = () => {
    console.log("klik");
  };

  return (
    <div
      className='cell'
      style={
        today === day
          ? {
              backgroundColor: "#d9534f",
              transition: "all 0.2s ease",
            }
          : props.dayOfTheWeek === 6 || props.dayOfTheWeek === 0
          ? { color: "#999" }
          : {}
      }
      onMouseEnter={() => showDetails(true)}
      onMouseLeave={() => showDetails(false)}>
      {props.day}
      <div className='calEvents'>
        {props.events.map(
          (event) =>
            event.date === day && (
              <div>
                <span
                  key={event.id}
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
