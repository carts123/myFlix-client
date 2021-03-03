import React from 'react';
import PropTypes from 'prop-types';

import './genre-view.scss';

import {
  Container,
  Card,
} from 'react-bootstrap';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (
      <div className="genre-view">
        <Container>
          <Card className="genre-details-card">
            <Card.Title className="genre-name">{genre.Name}</Card.Title>
            <Card.Text className="genre-description">{genre.Description}</Card.Text>
          </Card>
        </Container>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};