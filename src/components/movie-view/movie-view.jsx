import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  handleAddFavourite(e, movie) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios({
      method: 'post',
      url: `https://mycfdb.herokuapp.com/users/${username}/Movies/${movie._id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert(`${movie.Title} was succesfully added to your Favourites`);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className='movie-view'>
        <Card className='movie-view-card' border='dark' style={{ width: '60rem' }}>
          <Card.Img className='movie-poster' variant='top' src={movie.ImagePath} />
          <Card.Title className='label-title'>{movie.Title}</Card.Title>
          <Card.Body>
            <Card.Text className='label-body'>Description: {movie.Description}</Card.Text>
            <Card.Text className='label-body'>Director: {movie.Director.Name}</Card.Text>
            <Card.Text className='label-body'>Genre: {movie.Genre.Name}</Card.Text>
            <Button className="movie-view-button favourites-button" variant="dark" size="sm" value={movie._id} onClick={(e) => this.handleAddFavourite(e, movie)}>
              Add to Favourites
								</Button>
            <br></br>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant='light'>Director</Button>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant='light'>Genre</Button>
            </Link>
          </Card.Body>
        </Card>
        <Link to={'/'}> <Button variant="dark" className="mt-3" size="m">Back</Button>
        </Link>

      </div>


    );
  }
}

MovieView.propTypes = {
  Movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,

    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
  })
};