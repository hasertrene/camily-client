import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import EditEvent from "./EditEvent";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../store/events/actions";

export default function Event(props) {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const member = props.member;
  const activity = props.activity;
  const colour = member ? member.colour : "#555555";

  const handleDelete = (id) => {
    window.confirm(`Are you sure you want to delete: ${props.title}?`)
      ? dispatch(deleteEvent(id))
      : console.log("Toch niet");
  };

  useEffect(() => {}, [dispatch]);

  return (
    <Card.Body style={{ backgroundColor: `${colour}55` }}>
      {" "}
      <Row>
        <Col>
          <span
            style={{
              border: `2px solid ${colour}`,
              borderRadius: "20px",
              padding: "8px",
            }}>
            {props.date.split("-")[2]}
          </span>{" "}
        </Col>
        <Col className='eventClick' onClick={() => setModalShow(true)}>
          <strong>{props.title}</strong>
        </Col>{" "}
        <Col className='eventClick' onClick={() => setModalShow(true)}>
          <em>{props.time ? props.time : `All-day`}</em>
        </Col>{" "}
        <Col className='eventClick' onClick={() => setModalShow(true)}>
          {activity ? activity.type : ""}
        </Col>{" "}
        <Col className='eventClick' onClick={() => setModalShow(true)}>
          <strong>{member ? member.firstName : "Everybody"}</strong>
        </Col>{" "}
        <Col>
          <ButtonGroup>
            <Button variant='info' onClick={() => handleDelete(props.id)}>
              Delete
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <EditEvent
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={props}
      />
    </Card.Body>
  );
}
