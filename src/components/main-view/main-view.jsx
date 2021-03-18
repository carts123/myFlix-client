import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

import {
  Navbar,
  Nav,
  CardDeck,
} from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    };
    this.onLoggedOut = this.onLoggedOut.bind(this);
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

  // Get all movies
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

  onLoggedOut() {
    this.setState({
      user: null,
    });

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('logout successful');

  }

  render() {
    let { movies, user } = this.state;


    //if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    if (!movies) return <div className='main-view' />;


    return (
      <Router>
        <div className='main-view'>
          <header>
            <Navbar bg='dark' variant='dark' expand='lg'>
              <Navbar.Brand>
                <Link to='/'>MyFlix</Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                  <Nav.Link className='navLinkHome' as={Link} to={`/`} target='_self'>Home</Nav.Link>
                  <Nav.Link className='navLink' as={Link} to={`/users/${user}`} target='_self'>Profile</Nav.Link>
                  <Nav.Link className='navLink' as={Link} to={`/login`} target='_self' onClick={this.onLoggedOut}>Log Out</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>

          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <CardDeck> {movies.map(m => <MovieCard key={m._id} movie={m} />)} </CardDeck>
          }
          } />
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="/genres/:name" render={({ match }) => {
            if (!movies.length) return <div className="main-view" />;
            return <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name)} movies={movies} />
          }
          } />
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies.length) return <div className="main-view" />;
            return <DirectorView director={movies.find((m) => m.Director.Name === match.params.name)} movies={movies} />
          }
          } />
          <Route path="/users/:username" render={() => {
            if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            if (movies.length === 0) return;
            return <ProfileView movies={movies} />;
          }}
          />
          <Route path="/login" render={() => {
          }}
          />
        </div>
      </Router>
    );
  }
}

MainView.propTypes = {
  movie: PropTypes.arrayOf({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }),
  user: PropTypes.string,
};