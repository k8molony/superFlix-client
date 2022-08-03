import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import './navbar-view.scss';

export function NavbarView({user}) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (user?.token) {
      return true
    } else {
      return false;
    }
  };

  return (
    <Container fluid>
      <Navbar sticky="top" expand="lg" variant="dark" className="mainNavbar">
        <Navbar.Brand className="navbar-logo" href="/">
          <img
            src="https://superflix-db.herokuapp.com/img/SuperFlixLogo.svg"
            width="150"
            height="75"
            className="d-inline-block align-top"
            alt="SuperFlix logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav" className="mainNavbar">
          {/* <Nav className="ml-auto">
            {isAuth() && user && (
              <Nav.Link href="/profile">{user.user}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={() => {
                onLoggedOut()
              }}>Logout</Button>
            )}
            {!isAuth() && (
              <Nav.Link href="/">Login</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href="/register">Register</Nav.Link>
            )}
          </Nav> */}
          <Nav className="ml-auto mainNavbar">
            {isAuth() && (
              <Nav.Link href="/profile">{user?.user?.Username}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={() => {
                onLoggedOut()
              }}>Logout</Button>
            )}
            {!isAuth() && (
              <Nav.Link href="/">Login</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href="/register">Register</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}