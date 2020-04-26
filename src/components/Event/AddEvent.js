import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectActs } from "../../store/events/selectors";
import { selectUser } from "../../store/user/selectors";
import { fetchEvents } from "../../store/events/actions";
import { postEvent } from "../../store/events/actions";

import { Modal, Button, Form, Col, Row } from "react-bootstrap";

export default function AddEvent(props) {
  const user = useSelector(selectUser);
  const acts = useSelector(selectActs);
  const dispatch = useDispatch();
  const [input, setInput] = useState({ date: props.date });
  const [wholeDay, setWholeDay] = useState(input.time);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const setTimeNull = () => {
    setWholeDay(!wholeDay);
    setInput({ ...input, time: null });
  };

  const addEvent = () => {
    dispatch(postEvent(input));
    props.onHide();
    setInput({ date: props.date });
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Add event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type='text'
              name='title'
              // value={input.title}
              onChange={inputHandler}
              size='lg'
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as='textarea'
              rows='3'
              name='description'
              // value={input.description}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='date'
              name='date'
              value={props.date ? props.date : input.date}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm='2'>
              <Form.Label>All-day</Form.Label>
            </Col>
            <Col sm='2'>
              <Form.Control
                type='checkbox'
                name='check'
                checked={!wholeDay}
                onChange={setTimeNull}
              />
            </Col>
            {wholeDay && (
              <Col sm='4'>
                <Form.Control
                  type='time'
                  name='time'
                  value={
                    input.time
                      ? input.time
                      : setInput({ ...input, time: "11:11" })
                  }
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
                name='activityId'
                onChange={inputHandler}>
                <option value={null}></option>
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
              <Form.Control as='select' name='memberId' onChange={inputHandler}>
                {user.members &&
                  user.members.map((member) => (
                    <option
                      key={member.id}
                      value={member.id}
                      defaultValue={
                        member.firstName === "Everybody" ? true : false
                      }>
                      {member.firstName}
                    </option>
                  ))}
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='info' type='submit' onClick={() => addEvent()}>
          Add event
        </Button>
        <Button variant='info' onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
