import React from "react";
import { Card } from "react-bootstrap";

export default function Event(props) {
  return <Card.Body>{props.title}</Card.Body>;
}
