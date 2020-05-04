import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { Form, Col, Button, Row } from "react-bootstrap";
import AddMember from "../../components/Member/AddMember.js";
import EditMember from "../../components/Member/EditMember.js";
import {
  getUserWithStoredToken,
  deleteMember,
  updateUser,
} from "../../store/user/actions";

export default function Family() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [member, setMember] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  const submitForm = () => {
    let submitEmail = email;
    let submitName = name;
    if (!email) {
      submitEmail = user.email;
    }
    if (!name) {
      submitName = user.name;
    }
    dispatch(updateUser(submitEmail, password, submitName));
  };
  const handleDelete = (member) => {
    window.confirm(`Are you sure you want to delete ${member.firstName}?`)
      ? dispatch(deleteMember(member.id))
      : console.log("Canceled");
  };
  const handleEdit = (member) => {
    setMember(member);
    setEditShow(true);
  };

  return (
    <Container className='main'>
      <Form as={Col} md={{ span: 6, offset: 3 }} className='mt-5'>
        <h1 className='mt-5 mb-5'>Update account</h1>
        <Form.Group controlId='formBasicName'>
          <Form.Label>Family name</Form.Label>
          <Form.Control
            defaultValue={user.name}
            onChange={(event) => setName(event.target.value)}
            type='text'
            required
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(event) => setEmail(event.target.value)}
            type='email'
            defaultValue={user.email}
            required
          />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type='password'
            placeholder='Password'
            required
          />
        </Form.Group>
        <Form.Group className='mt-5'>
          <Button variant='info' type='submit' onClick={submitForm}>
            Save changes...
          </Button>
        </Form.Group>
        <hr />
        <div
          style={{
            backgroundColor: "#00000011",
            padding: "4vh",
            borderRadius: "10px",
          }}>
          <h4>Family members</h4>
          <hr />
          {user.members
            .filter((member) => member.firstName !== "Everybody")
            .map((member) => (
              <Row key={member.id} style={{ margin: "5px 0" }}>
                <Col>
                  <span style={{ fontSize: "1.1rem" }}>{member.firstName}</span>
                </Col>
                <Col md={{ span: 1 }}>
                  <span
                    style={{
                      color: member.colour,
                    }}>
                    &#9632;
                  </span>
                </Col>
                <Col md={{ span: 1 }}>
                  <Button
                    variant='outline-info'
                    onClick={() => {
                      handleEdit(member);
                    }}>
                    Edit
                  </Button>
                </Col>{" "}
                <Col md={{ offset: 1 }}>
                  <Button
                    variant='outline-info'
                    onClick={() => handleDelete(member)}>
                    Delete
                  </Button>
                </Col>{" "}
              </Row>
            ))}
          <Row>
            <Col>
              <Button variant='info' onClick={() => setModalShow(true)}>
                Add family member
              </Button>
            </Col>
          </Row>
          <EditMember
            show={editShow}
            onHide={() => setEditShow(false)}
            member={member}
          />
          <AddMember
            show={modalShow}
            onHide={() => setModalShow(false)}></AddMember>
        </div>
      </Form>
    </Container>
  );
}
