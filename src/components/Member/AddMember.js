import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postMember } from "../../store/user/actions";

import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import "../../styles/style.scss";

export default function EventDetails(props) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    firstName: "",
    birthday: "",
    colour: "#b500ba",
    parent: "",
    gender: "Female",
  });

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const addMember = () => {
    dispatch(postMember(input));
    props.onHide();
    setInput({
      firstName: "",
      birthday: "",
      colour: "#b500ba",
      parent: "",
      gender: "Female",
    });
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Add family member
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label sm='2'>First name</Form.Label>{" "}
            <Form.Control
              type='text'
              name='firstName'
              onChange={inputHandler}
              size='lg'
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label sm='2'>Birthday</Form.Label>{" "}
            <Form.Control
              type='date'
              name='birthday'
              onChange={inputHandler}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label sm='2'>Colour</Form.Label>{" "}
            <Form.Control
              type='color'
              name='colour'
              defaultValue='#b500ba'
              onChange={inputHandler}
              required
            />
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm='2'>
              <Form.Label>Parent?</Form.Label>
            </Col>
            <Col sm='2'>
              <Form.Check
                type='radio'
                name='parent'
                label='Yes'
                value='true'
                onChange={inputHandler}
              />
              <Form.Check
                type='radio'
                label='Nope'
                name='parent'
                value='false'
                onChange={inputHandler}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col>
              <Form.Label sm='2'>Gender</Form.Label>{" "}
            </Col>
            <Col sm='10'>
              <Form.Control
                defaultValue='Female'
                as='select'
                name='gender'
                onChange={inputHandler}>
                <option value='Female'>Female</option>
                <option value='Male'>Male</option>
                <option value='Other'>Other</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='info' type='submit' onClick={() => addMember()}>
          Add family member
        </Button>
        <Button variant='info' onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
