import React from "react";
import { Card, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { format } from "date-fns";
import EventDetails from "../EventDetails/index";

export default function Event(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const member = props.member;
  const activity = props.activity;
  const colour = member ? member.colour : "#555555";

  const handleDelete = (id) => {
    window.confirm(`Are you sure you want to delete: ${props.title}?`)
      ? console.log(id)
      : console.log("Toch niet");
  };

  return (
    <Card.Body style={{ backgroundColor: `${colour}77` }}>
      {" "}
      <Row>
        <Col>
          <span
            style={{
              border: `2px solid ${colour}`,
              borderRadius: "20px",
              padding: "8px",
            }}>
            {props.date.slice(0, 2)}
          </span>{" "}
        </Col>
        <Col>
          <strong>{props.title}</strong>
        </Col>{" "}
        <Col>
          <em>{props.time ? props.time : `Whole day`}</em>
        </Col>{" "}
        <Col>{activity ? activity.type : ""}</Col>{" "}
        <Col>
          <strong>{member ? member.firstName : "Everybody"}</strong>
        </Col>{" "}
        <Col>
          <ButtonGroup>
            <Button variant='info' onClick={() => setModalShow(true)}>
              Edit
            </Button>
            <Button variant='info' onClick={() => handleDelete(props.id)}>
              Delete
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <EventDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={props}
      />
    </Card.Body>
  );
}
