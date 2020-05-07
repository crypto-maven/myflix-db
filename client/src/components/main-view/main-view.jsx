import React from "react";
import axios from "axios";

import { Button, Navbar, Nav } from "react-bootstrap";

import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateProfile } from "../update-profile/update-profile";

export class MainView extends React.Component {
	constructor() {
		super();

		this.state = {
			movies: [],
			user: null,
		};
	}

	getMovies(token) {
		axios
			.get("https://myflix-db.herokuapp.com/movies", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.setState({
					movies: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	componentDidMount() {
		let accessToken = localStorage.getItem("token");
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem("user"),
			});
			this.getMovies(accessToken);
		}
	}

	onLoggedIn(authData) {
		console.log(authData);
		this.setState({ user: authData.user.Username });

		localStorage.setItem("token", authData.token);
		localStorage.setItem("user", authData.user.Username);
		this.getMovies(authData.token);
	}

	onLogout() {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		this.setState({
			user: null,
		});
		window.open("/", "_self");
	}

	render() {
		const { movies, user } = this.state;

		if (!movies) return <div className="main-view" />;

		return (
			<Router>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand as={Link} to="/">
						<h1>My Flix</h1>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link as={Link} to="/">
								<h3>Home</h3>
							</Nav.Link>
							<Nav.Link as={Link} to="/user">
								<h3>Profile</h3>
							</Nav.Link>
							<Button variant="link" onClick={() => this.onLogout()}>
								<b>Log Out</b>
							</Button>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<br></br>
				<br></br>
				<br></br>
				<div className="main-view">
					<Route
						exact
						path="/"
						render={() => {
							if (!user)
								return (
									<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
								);
							return movies.map((m) => <MovieCard key={m._id} movie={m} />);
						}}
					/>

					<Route path="/register" render={() => <RegistrationView />} />

					<Route
						path="/movies/:movieId"
						render={({ match }) => (
							<MovieView
								movie={movies.find((m) => m._id === match.params.movieId)}
							/>
						)}
					/>
					<Route
						path="/movies/director/:name"
						render={({ match }) => {
							if (!movies) return <div className="main-view" />;
							return (
								<DirectorView
									director={
										movies.find((m) => m.Director.Name === match.params.name)
											.Director
									}
								/>
							);
						}}
					/>
					<Route
						path="/movies/genres/:name"
						render={({ match }) => {
							if (!movies) return <div className="main-view" />;
							return (
								<GenreView
									genre={
										movies.find((m) => m.Genre.Name === match.params.name).Genre
									}
								/>
							);
						}}
					/>

					<Route
						exact
						path="/user"
						render={() => <ProfileView movies={movies} />}
					/>

					<Route path="/user/update" render={() => <UpdateProfile />} />
				</div>
			</Router>
		);
	}
}
