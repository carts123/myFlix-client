import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import { Col, Row } from 'react-bootstrap';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movie, visibilityFilter } = props;
  let filteredMovies = movie;

  if (visibilityFilter !== '') {
    filteredMovies = movie.filter(m => m.Title.toLocaleLowerCase().includes(visibilityFilter.toLocaleLowerCase()));
  }

  if (!movie) return <div className="main-view" />;

  return (
    <Row className='movieCard-row'>
      {filteredMovies.map((m, index) => (
        <Col key={index} className='movieCard-col' lg='3' md='4' sm='6' xs='10'>
          <MovieCard key={m._id} movie={m} />
        </Col>
      ))}
    </Row>
  );
}

export default connect(mapStateToProps)(MoviesList);