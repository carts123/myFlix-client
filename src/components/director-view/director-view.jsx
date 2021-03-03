import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';

import './director-view.scss';

import {
  Row,
  Container,
  Card,
  ListGroup,
} from 'react-bootstrap';


export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, movies } = this.props;

    if (!director) return null;

    return (
      <div className='director-view'>
        <Container>
          <Row>
            <Card className='director-details-card'>
              <Card.Title className='director-name'>{director.Name}</Card.Title>
              <Card.Text className='director-bio director-details'>{director.Bio}</Card.Text>
              <ListGroup variant='flush' className='card-content'>
                <ListGroup.Item className='director-yob director-details'>
                  <span className='label'>Born:</span>
                  <br />
                  {director.Birth}
                  <br />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Row>
          <Card className='director-moreMovies' border='info'>
            <Card.Body>
              <Card.Title>Movies by {director.Name}:</Card.Title>
              <ListGroup className='director-MovieCard'>
                <div className='director-view-movies-flex'>
                  {movies.map((movie) => {
                    if (movie.Director.Name === director.Name) {
                      return (<MovieCard key={movie._id} movie={m} />)
                    }
                  })}
                </div>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card.Footer>
            <Link to={'/'}>
              <Button className='returnButton' variant='dark'>Return to Movie List</Button>
            </Link>
          </Card.Footer>
        </Container>
      </div>
    );
  }
}

DirectorView.propTypes = {
  movie: PropTypes.shape({
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    })
  })
};