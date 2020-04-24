import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { patchMember } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";

import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import "../../styles/style.scss";

export default function EventDetails(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const member = props.member;

  const [parent, setParent] = useState(member.parent);
  const [firstName, setFirstName] = useState(member.firstName);
  const [birthday, setBirthday] = useState(member.birthday);
  const [colour, setColour] = useState(member.colour);
  const [gender, setGender] = useState(member.gender);

  let input = {
    ...member,
    id: member.id,
    firstName: firstName,
    birthday: birthday,
    gender: gender,
    colour: colour,
    parent: parent,
  };

  console.log(input);

  const editMember = () => {
    dispatch(patchMember(input));
    props.onHide();
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
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              size='lg'
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label sm='2'>Birthday</Form.Label>{" "}
            <Form.Control
              type='date'
              name='birthday'
              defaultValue={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label sm='2'>Colour</Form.Label>{" "}
            <Form.Control
              type='color'
              name='colour'
              defaultValue={colour}
              onChange={(e) => setColour(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm='2'>
              <Form.Label>Parent?</Form.Label>
            </Col>
            <Col sm='2'>
              <Button
                variant={parent ? "info" : "info-outline"}
                onClick={() => setParent(!parent)}>
                Yes
              </Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col>
              <Form.Label sm='2'>Gender</Form.Label>{" "}
            </Col>
            <Col sm='10'>
              <Form.Control
                defaultValue={gender}
                as='select'
                name='gender'
                onChange={(e) => setGender(e.target.value)}>
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
