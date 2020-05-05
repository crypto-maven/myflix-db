import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const register = "true";

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://myflix16.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });
  };

  return (
    <Container className="loginContainer">
      <h1>Welcome to My Flix</h1>
      <br></br>
      <br></br>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button id="loginButton" onClick={handleSubmit}>
          Log in
        </Button>
        <Link to={`/register`}>
          <Button variant="link" className="registerButton" type="submit">
            Sign Up
          </Button>
        </Link>
      </Form>
    </Container>
  );
}

/*LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};*/
