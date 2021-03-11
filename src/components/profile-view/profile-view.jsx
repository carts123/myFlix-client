import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom'

import './profile-view.scss';

import {
  Form,
  Button,
  Container,
  Card,
  Tab,
  Tabs
} from 'react-bootstrap'

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    (this.Username = null), (this.Password = null), (this.Email = null), (this.Birthday = null);
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  //get user
  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://mycfdb.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRemoveFavorite(e, movie) {
    e.preventDefault();

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https://mycfdb.herokuapp.com/users/${username}/Movies/${movie}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert('Movie removed from favourites');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios({
      method: 'put',
      url: `https://mycfdb.herokuapp.com/users/${username}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      },
    })
      .then((response) => {
        alert('Saved Changes');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', this.state.Username);
        window.open(`/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  handleDeregister(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .delete(`https://mycfdb.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted');
        window.open(`/`, '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const username = localStorage.getItem('user');
    const { movies } = this.props;

    return (
      <Container className='profile-view'>
        <Tabs defaultActiveKey='profile' className='profile-tabs'>
          <Tab className='tab-item' eventKey='profile' title='Profile'>
            <Card className='profile-card'>
              <Card.Title className='profile-title'>{username}'s Favourite Movies</Card.Title>
              {FavoriteMovies.length === 0 && <div className='card-content'>You have no favourite movies yet!</div>}

              <div className='favourites-container'>
                {FavoriteMovies.length > 0 &&
                  movies.map((movie) => {
                    if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                      return (
                        <div key={movie._id}>
                          <Card className='favourites-item card-content' style={{ width: '16rem' }}>
                            <Card.Img variant="top" src={movie.ImagePath} key={movie.ImagePath} />
                            <Card.Title className='movie-card-title'>{movie.Title}</Card.Title>
                            <Card.Subtitle className='text-muted fav-subtitle'>{movie.Year}</Card.Subtitle>
                            <Card.Body className='movie-card-body'>
                              <Button size='sm' className='view-movie' variant='light' as={Link} to={`/movies/${movie._id}`} target='_self'>
                                View Movie
                                </Button>
                              <Button size='sm' className='remove-favourite' variant='danger' onClick={(e) => this.handleRemoveFavorite(e, movie._id)}>
                                Remove
							                	</Button>
                            </Card.Body>
                          </Card>
                        </div>
                      );
                    }
                  })}
              </div>
            </Card>
          </Tab>

          <Tab className='tab-item' eventKey='update' title='Update'>
            <Card className='update-card'>
              <h1 className="profile-title">Update Profile</h1>
              <Card.Body>
                <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthday)}>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label className="form-label">Username</Form.Label>
                    <Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} pattern="[a-zA-Z0-9]{6,}" />
                    <Form.Control.Feedback type="invalid">Please enter a valid username with at least 5 alphanumeric characters.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="form-label">
                      Password<span className="required">*</span>
                    </Form.Label>
                    <Form.Control type="password" placeholder="Current or New Password" onChange={(e) => this.setPassword(e.target.value)} pattern=".{6,}" required />
                    <Form.Control.Feedback type="invalid">Please enter a valid password.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="form-label">Email</Form.Label>
                    <Form.Control type="email" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)} />
                    <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formBasicBirthday">
                    <Form.Label className="form-label">Birthday</Form.Label>
                    <Form.Control type="date" placeholder="Change Birthday" onChange={(e) => this.setBirthday(e.target.value)} />
                    <Form.Control.Feedback type="invalid">Please enter a valid birthday.</Form.Control.Feedback>
                  </Form.Group>
                  <Button className="update profile-button" type="submit" block>
                    Update
									</Button>
                </Form>
              </Card.Body>
            </Card>
          </Tab>

          <Tab className="tab-item" eventKey="delete" title="Delete Profile">
            <Card className="update-card">
              <h1 className="profile-title">Delete Your Profile</h1>
              <Card.Body>
                <Button className="profile-button delete-button" variant='danger' block onClick={(e) => this.handleDeregister(e)}>
                  Click Here If You're Sure You Want To Delete Your Profile
								</Button>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavouriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};