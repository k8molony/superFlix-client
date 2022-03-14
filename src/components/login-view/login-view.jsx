import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Container, Card, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;

    if(!username){
      setUsernameErr('Username Required');
      isReq = false;
    }else if(username.length < 2){
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Password Required');
      isReq = false;
    }else if(password.length < 6){
      setPassword('Password must be at least 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://superflix-db.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user');
        alert('Something wasn\'t entered right');
      });
    }
  };

  return (
    // <Container className="profile-view" align="center">
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
                        onChange={e => setUsername(e.target.value)} 
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
                      onChange={e => setPassword(e.target.value)} 
                      required
                      placeholder="Enter your password"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>

                  <Button variant="success" type="submit" 
                    onClick={handleSubmit}>
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
    //</Container>
  );
}

//prop-types
//Give warnings in browser if data does not match required shape
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};