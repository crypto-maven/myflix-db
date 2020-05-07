import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import axios from "axios";

export function RegistrationView(props) {
	const [email, setemail] = useState("");
	const [dob, setdob] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = (e) => {
		e.preventDefault();
		axios
			.post("https://myflix-db.herokuapp.com/users", {
				Username: username,
				Password: password,
				Email: email,
				Birthday: dob,
			})
			.then((response) => {
				const data = response.data;
				console.log(data);
				window.open("/", "_self");
			})
			.catch((e) => {
				console.log("error registering the user");
			});
	};

	return (
		<Container className="registrationContainer">
			<h1>Register User</h1>
			<br />
			<br />
			<Form>
				<Form.Group controlId="formBasicUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Username"
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

				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setemail(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicDob">
					<Form.Label>Date of Birth</Form.Label>
					<Form.Control
						type="date"
						placeholder="01/01/1985"
						value={dob}
						onChange={(e) => setdob(e.target.value)}
					/>
				</Form.Group>

				<Button variant="primary" type="submit" onClick={handleRegister}>
					Register
				</Button>
			</Form>
		</Container>
	);
}
