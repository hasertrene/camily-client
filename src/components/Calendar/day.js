import React, { useState } from "react";
import { format } from "date-fns";
import CalendarEvent from "../Event/CalenderEvent.js";
import AddEvent from "../Event/AddEvent.js";

export default function Day(props) {
  const today = format(new Date(), "yyyy-MM-dd");
  const day = props.date;
  const [details, showDetails] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const clickHandler = (e) => {
    console.log(e.target.tagName);
    if (e.target.className === "cell") {
      setModalShow(true);
    }
    if (e.target.className === "eventLink") {
      return;
    }
  };

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
      onClick={(e) => clickHandler(e)}
      onMouseEnter={() => showDetails(true)}
      onMouseLeave={() => showDetails(false)}>
      {format(new Date(props.date), "d")}
      <div className='calEvents'>
        {props.events.map(
          (event) =>
            event.date === day && (
              <CalendarEvent
                key={event.id}
                event={event}
                details={details}
                user={props.user}
              />
            )
        )}
        {/* <span onClick={() => setModalShow(true)} className='cell-btn'>
          +
        </span> */}
      </div>
      <AddEvent show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}
