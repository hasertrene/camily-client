import React, { useState } from "react";
import EditEvent from "./EditEvent.js";
import {} from "react-bootstrap";

export default function CalenderEvent(props) {
  const [modalShow, setModalShow] = useState(false);
  const event = props.event;

  return (
    <div key={event.id}>
      <span onClick={() => setModalShow(true)} className='eventLink'>
        <span
          style={{
            color: `${event.member && event.member.colour}`,
          }}
          className='block'>
          &#9608;{" "}
        </span>
        {props.details
          ? event.activity.type === "Birthday"
            ? `Bday of ${event.title}`
            : event.title
          : ""}
      </span>
      <EditEvent
        remove='true'
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={event}
        user={props.user}
        date={props.date}
      />
    </div>
  );
}
