import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, CardGroup, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login-view.scss";
import config from "../../config";

export function LoginView(props) {
  console.log("loginprops=", props);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  useEffect(() => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    if (user && token) {
      getUserData(user, token);
      getMovies(token);
    }
  }, []);

  // validate user inputs
  const validate = () => {
    let isReq = true;

    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be at least 2 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPassword("Password must be at least 6 characters long");
      isReq = false;
    }

    return isReq;
  };

  const getMovies = (token) => {
    axios
      .get(`${config.API_URL}movies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //Assign the result to the state
        props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getUserData = (username, token) => {
    axios
      .get(`${config.API_URL}users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        console.log(props);
        props.setUser(data);
        // getMovies(data?.token)
      });
  };
  const handleSubmit = (e) => {
    e?.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios
        .post(`${config.API_URL}login`, {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          console.log(props);
          localStorage.setItem("user", data.user.Username);
          localStorage.setItem("token", data.token);
          props.setUser(data.user);
          getMovies(data?.token);
        });
    }
  };

  return (
    <Row>
      <Col>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>Login to SuperFlix</Card.Title>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter your username"
                  />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>

                <Button variant="success" onClick={() => handleSubmit()}>
                  Log In
                </Button>
                <Link to="/register">
                  <Button variant="secondary">Register now</Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  );
}
