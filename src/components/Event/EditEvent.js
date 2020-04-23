import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectActs } from "../../store/events/selectors";
import { selectUser } from "../../store/user/selectors";
import { useHistory } from "react-router-dom";
import {
  updateEvent,
  deleteEvent,
  fetchEvents,
} from "../../store/events/actions";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import "../../styles/style.scss";

export default function EditEvent(props) {
  const user = useSelector(selectUser);
  const acts = useSelector(selectActs);
  const history = useHistory();
  const dispatch = useDispatch();
  const event = props.event;
  const [input, setInput] = useState({
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time,
    activityId: event.activityId,
    memberId: event.memberId,
  });
  const [wholeDay, setWholeDay] = useState(input.time);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [history.location.key, dispatch]);

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const setTimeNull = () => {
    setWholeDay(!wholeDay);
    setInput({ ...input, time: null });
  };

  const submitChanges = () => {
    dispatch(updateEvent(event.id, input));
    props.onHide();
    history.push(history.location.pathname);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(`Are you sure you want to delete: ${props.title}?`) ===
      true
    ) {
      dispatch(deleteEvent(id));
      props.onHide();
    } else {
      console.log("Canceled");
    }
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
                defaultValue={event.activityId}
                name='activityId'
                onChange={inputHandler}>
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
                <option value={null}>Everybody</option>
                {user.members.map((member) => (
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
        <Button variant='info' type='submit' onClick={() => submitChanges()}>
          Save changes...
        </Button>
        {props.remove && (
          <Button
            variant='info'
            style={{ align: "left" }}
            onClick={() => handleDelete(event.id)}>
            Delete
          </Button>
        )}
        <Button variant='info' onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
