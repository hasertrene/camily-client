import React, { useState } from "react";
import EventDetails from "../EventDetails";

export default function CalenderEvent(props) {
  const [modalShow, setModalShow] = useState(false);
  const event = props.event;

  return (
    <div key={event.id}>
      <span
        style={{
          color: `${event.member && event.member.colour}`,
        }}>
        &#9632;
      </span>
      <span className='eventTitle' onClick={() => setModalShow(true)}>
        {props.details && <span className='eventLink'>{event.title}</span>}
      </span>
      <EventDetails
        remove='true'
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={event}
        user={props.user}
      />
    </div>
  );
}
