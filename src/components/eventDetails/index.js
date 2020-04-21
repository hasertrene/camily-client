import React, { useState, useEffect } from "react";
import { selectEventDetails } from "../../store/eventDetails/selectors";
import { useSelector, useDispatch } from "react-redux";
import { selectActs } from "../../store/events/selectors";
import { selectUser } from "../../store/user/selectors";
import {
  updateEvent,
  postEvent,
  fetchEventById,
} from "../../store/eventDetails/actions";

import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import "../../styles/style.scss";

export default function EventDetails(props) {
  const user = useSelector(selectUser);
  const acts = useSelector(selectActs);
  const dispatch = useDispatch();
  const event = props.event;
  const [time, setTime] = useState(event.time);
  const [wholeDay, setWholeDay] = useState(time);
  const [member, setMember] = useState(event.memberId);
  const [input, setInput] = useState({
    title: event.title,
    description: event.description,
    date: event.date.split("/").reverse().join("-"),
    time: event.time,
    activityId: event.activityId,
    memberId: event.memberId,
  });

  const initialState = () => {};

  const inputHandler = (e) => {
    e.persist();
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
    console.log(input);
  };

  const submitChanges = () => {
    wholeDay && setInput({ ...input, time: null });
    setInput({ ...input, date: input.date.split("-").reverse().join("/") });
    console.log(event.id, input);
    dispatch(updateEvent(event.id, input));
    return true;
  };

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
          <Form.Group>
            <Form.Control
              type='text'
              name='title'
              value={input.title}
              onChange={inputHandler}
              size='lg'
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as='textarea'
              rows='3'
              name='description'
              value={input.description}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='date'
              name='date'
              value={input.date}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm='2'>
              <Form.Label>Whole day</Form.Label>
            </Col>
            <Col sm='2'>
              <Form.Control
                type='checkbox'
                checked={!wholeDay}
                onChange={() => setWholeDay(!wholeDay)}
              />
            </Col>
            {wholeDay && (
              <Col sm='4'>
                <Form.Control
                  type='time'
                  name='time'
                  value={time}
                  onChange={inputHandler}
                />
              </Col>
            )}
          </Form.Group>
          <Form.Group as={Row}>
            <Col>
              <Form.Label sm='2'>Activity type</Form.Label>{" "}
            </Col>
            <Col sm='10'>
              <Form.Control
                as='select'
                defaultValue={event.activityId}
                name='activityId'
                onChange={inputHandler}>
                <option value='null'></option>
                {acts &&
                  acts.map((act) => (
                    <option key={act.id} value={act.id}>
                      {act.type}
                    </option>
                  ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col>
              <Form.Label sm='2'>For whom?</Form.Label>{" "}
            </Col>
            <Col sm='10'>
              <Form.Control
                as='select'
                defaultValue={event.memberId}
                name='memberId'
                onChange={inputHandler}>
                <option value='null'>Everybody</option>
                {user.members &&
                  user.members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.firstName}
                    </option>
                  ))}
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='info' onClick={() => submitChanges()}>
          Save changes...
        </Button>
        <Button variant='info' onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
