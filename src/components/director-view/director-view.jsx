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
  Button,
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
              <Card.Title className='director-name'>{director.Director.Name}</Card.Title>
              <Card.Text className='director-bio director-details'>{director.Director.Bio}</Card.Text>
              <ListGroup variant='flush' className='card-content'>
                <ListGroup.Item className='director-yob director-details'>
                  <span className='label'>Born:</span>
                  <br />
                  {director.Director.Birth}
                  <br />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Row>
          <Card className='mb-3 mr-2 h-100' style={{ width: '16rem' }}>
            <Card.Body>
              <Card.Title>Some {director.Director.Name} movies:</Card.Title>
              <ListGroup className='director-MovieCard'>
                <div className='director-view-movies-flex'>
                  {movies.map((movie) => {
                    if (movie.Director.Name === director.Director.Name) {
                      return (<MovieCard key={movie._id} movie={movie} />)
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
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    })
  })
};