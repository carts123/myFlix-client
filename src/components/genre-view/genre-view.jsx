import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';

import './genre-view.scss';

import {
  Container,
  Card,
  ListGroup,
  Button,
} from 'react-bootstrap';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre, movies } = this.props;

    if (!genre) return null;

    return (
      <div className='genre-view'>
        <Container>
          <Card className='genre-details-card'>
            <Card.Title className='genre-name'>{genre.Genre.Name}</Card.Title>
            <Card.Text className='genre-description'>{genre.Genre.Description}</Card.Text>
          </Card>
          <Card className='mb-3 mr-2 h-100' style={{ width: '16rem' }}>
            <Card.Body>
              <Card.Title>Other {genre.Genre.Name} Movies:</Card.Title>
              <ListGroup>
                <div className='genre-view-movies-flex'>
                  {movies.map((movie) => {
                    if (movie.Genre.Name === genre.Genre.Name) {
                      return (<MovieCard key={movie._id} movie={movie} />)
                    }
                  })}
                </div>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card.Footer>
            <Link to={`/`}>
              <Button className='returnButton' variant='dark'>Return to Movie List</Button>
            </Link>
          </Card.Footer>
        </Container>
      </div>
    );
  }
}

GenreView.propTypes = {
  movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    })
  })
};