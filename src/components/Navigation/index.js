import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem.js";
import LoggedOut from "./LoggedOut.js";
import { logOut } from "../../store/user/actions";
import "./style.scss";
import AddEventButton from "../AddEventButton/index.js";

export default function Navigation() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = user.token;

  return (
    <>
      <Navbar expand='lg' fixed='bottom' variant='dark' bg='info'>
        <Navbar.Brand as={NavLink} to='/'>
          <span className='logo'>Camily</span>
        </Navbar.Brand>
        {token && <AddEventButton />}{" "}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav style={{ width: "100%" }} fill>
            {token && <NavbarItem path='/' linkText='Calendar' />}
            {token && <NavbarItem path='/events' linkText='Events' />}
            {token ? (
              <>
                <NavbarItem path='/family' linkText='Family'>
                  {user.name}
                </NavbarItem>
                <Button variant='info' onClick={() => dispatch(logOut())}>
                  Logout
                </Button>
              </>
            ) : (
              <LoggedOut />
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
