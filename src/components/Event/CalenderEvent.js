import React, { useState } from "react";
import EditEvent from "./EditEvent.js";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function CalenderEvent(props) {
  const [modalShow, setModalShow] = useState(false);
  const event = props.event;

  return (
    <div key={event.id}>
      <OverlayTrigger
        placement='left'
        overlay={
          <Tooltip id='tooltip-left'>
            {props.details && <span className='eventLink'>{event.title}</span>}
          </Tooltip>
        }>
        <span
          onClick={() => setModalShow(true)}
          className='block'
          style={{
            backgroundColor: `${event.member && event.member.colour}`,
          }}>
          {/* {props.details && <span className='eventLink'>{event.title}</span>} */}
        </span>
      </OverlayTrigger>
      <EditEvent
        remove='true'
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={event}
        user={props.user}
      />
    </div>
  );
}
