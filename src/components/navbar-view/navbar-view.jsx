import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./navbar-view.scss";

export function NavbarView({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (user) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Navbar fixed="top" expand="lg" variant="dark" className="mainNavbar">
      <Navbar.Brand className="navbar-logo" to="/" as={Link}>
        <img
          src="../img/superFlixLogo.png"
          width="150"
          height="75"
          className="d-inline-block align-top"
          alt="SuperFlix logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="mainNavbar">
        <div className="ml-auto mainNavbar">
          {isAuth() && <Link to="/profile">{user.Username}</Link>}
          {isAuth() && (
            <Button
              variant="link"
              onClick={() => {
                onLoggedOut();
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
