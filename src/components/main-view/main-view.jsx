import React from 'react';
import axios from 'axios';

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


  componentDidMount() {
    axios.get('https://mycfdb.herokuapp.com/movies')
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

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user
    });
  }


  onRegister(register) {
    this.setState({
      register
    });
  }


  render() {
    const { movies, user, selectedMovie, register } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    /* Register */
    if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)} />;


    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
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
    );
  }
}