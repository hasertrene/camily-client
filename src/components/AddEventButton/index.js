import React, { useState } from "react";
import "./style.scss";
import AddEvent from "../Event/AddEvent.js";

export default function AddEventButton(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <span className='addbutton'>
      <img
        onClick={() => setModalShow(true)}
        src='/images/add.png'
        alt='addEvent'
      />
      <AddEvent
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={props}
      />
    </span>
  );
}
