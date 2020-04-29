import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { patchMember } from "../../store/user/actions";

import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import "../../styles/style.scss";

export default function EventDetails(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const member = props.member;

  const [input, setInput] = useState({});

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const initialInput = {
      id: member.id,
      firstName: member.firstName,
      birthday: member.birthday,
      gender: member.gender,
      colour: member.colour,
      parent: member.parent,
    };
    setInput({
      ...input,
      ...initialInput,
      [name]: value,
    });
  };

  const editMember = () => {
    dispatch(patchMember(input));
    props.onHide();
    setInput({});
    history.push(history.location.pathname);
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Edit family member
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label sm='2'>First name</Form.Label>{" "}
            <Form.Control
              type='text'
              name='firstName'
              defaultValue={member.firstName}
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
              defaultValue={member.birthday}
              onChange={inputHandler}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label sm='2'>Colour</Form.Label>{" "}
            <Form.Control
              type='color'
              name='colour'
              defaultValue={member.colour}
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
                defaultChecked={member.parent ? true : false}
                onChange={inputHandler}
              />
              <Form.Check
                type='radio'
                label='Nope'
                name='parent'
                value='false'
                defaultChecked={member.parent ? false : true}
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
                defaultValue={member.gender}
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
        <Button variant='info' type='submit' onClick={() => editMember()}>
          Edit family member
        </Button>
        <Button variant='info' onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
