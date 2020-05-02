import React, { useState } from "react";
import EditEvent from "./EditEvent.js";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

export default function CalenderEvent(props) {
  const [modalShow, setModalShow] = useState(false);
  const event = props.event;
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div key={event.id}>
      <OverlayTrigger
        placement='left'
        delay={{ show: 300, hide: 250 }}
        overlay={
          <Tooltip id='tooltip-left'>
            {props.details && <span className='eventLink'>{event.title}</span>}
          </Tooltip>
        }>
        <div style={{ cursor: "pointer" }} onClick={() => setModalShow(true)}>
          <span
            className='block'
            style={
              event.member && event.member.firstName !== "Everybody"
                ? { backgroundColor: event.member.colour }
                : {}
            }>
            <span className='balloon'>
              {event.activity.type === "Birthday" ? "🎈" : ""}
            </span>
          </span>
          <span>{isTabletOrMobile && event.title}</span>
        </div>
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
