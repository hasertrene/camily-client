import React, { useState, useEffect } from "react";
import { selectEventDetails } from "../../store/eventDetails/selectors";
import { useSelector, useDispatch } from "react-redux";
import {
  updateEvent,
  postEvent,
  fetchEventById,
} from "../../store/eventDetails/actions";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import "../../styles/style.scss";

export default function EventDetails(props) {
  const event = props.event;
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Edit event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='exampleForm.ControlInput1'>
            <Form.Control type='text' value={event.title} size='lg' />
          </Form.Group>
          <Form.Group controlId='exampleForm.ControlTextarea1'>
            <Form.Control as='textarea' rows='3' value={event.description} />
          </Form.Group>
          <Form.Group>
            <Form.Control type='date' value={event.date} />
          </Form.Group>
          <Form.Group>
            <Form.Control type='time' value={event.time} />
          </Form.Group>
          <Form.Group as={Row} controlId='exampleForm.ControlSelect1'>
            <Form.Label column sm='2'>
              Activity type
            </Form.Label>
            <Col sm='10'>
              <Form.Control as='select'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId='exampleForm.ControlSelect1'>
            <Form.Label column sm='2'>
              Family member
            </Form.Label>{" "}
            <Col sm='10'>
              <Form.Control as='select'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='info' onClick={() => updateEvent()}>
          Save changes...
        </Button>
        <Button variant='info' onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
