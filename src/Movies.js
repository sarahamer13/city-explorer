import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Movies = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.images_url}`;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.overview}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Average Votes: {movie.average_votes}</ListGroup.Item>
        <ListGroup.Item>Total Votes: {movie.total_votes}</ListGroup.Item>
        <ListGroup.Item>Popularity: {movie.popularity}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Released on: {movie.released_on}</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Movies;
