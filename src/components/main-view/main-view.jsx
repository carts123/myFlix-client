import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: null
    };
  }

  getMovies(token) {
    axios.get('https://mycfdb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }


  onRegister(register) {
    this.setState({
      register
    });
  }


  render() {
    const { movies, user } = this.state;


    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <React.Fragment>
          <div className='main-view'>
            <header>
              <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#genres">Genres</Nav.Link>
                  <Nav.Link href="#directors">Directors</Nav.Link>
                </Nav>
              </Navbar>
            </header>
            <Row className="main-view justify-content-md-center">
              {selectedMovie
                ? (
                  <Col md={8}>
                    <MovieView movie={selectedMovie} onBackClick={movie => this.onMovieClick(null)} />
                  </Col>
                )
                : movies.map(movie => (
                  <Col md={3} key={movie._id}>
                    <MovieCard movie={movie} onClick={movie => this.onMovieClick(movie)} />
                  </Col>
                ))
              }
            </Row>
          </div>
        </React.Fragment>
        <div className="main-view">
          <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m} />)} />
          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <GenreView director={movies.find(m => m.Genre.Name === match.params.name).Genre} />
          }
          } />
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }
          } />
        </div>
      </Router>
    );
  }
}