import React from "react";
import './director-view.scss';
import { Container, Card, Button, Row } from 'react-bootstrap';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick, movies } = this.props;

    return (
      <Container fluid>
        <Card>
          <Card.Body>
            <Card.Title> Director</Card.Title>
            <Card.Text>
              <span className="label">Name: </span>
              <span className="value">{director.Name}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Bio: </span>
              <span className="value">{director.Bio}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Birth: </span>
              <span className="value">{director.Birth}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Death: </span>
              <span className="value">{director.Death}</span>
            </Card.Text>

            <Button variant="dark" onClick={() => {onBackClick(); }}>Back</Button>
          </Card.Body>
        </Card>
        <Row>
          {movies.map(movie => (
            <Card className="favorite-movie card-content" key={movie._id} >
              <Card.Img className="fav-poster" variant="top" src={movie.ImagePath} />
              <Card.Body style={{ backgroundColor: "#90adc6" }}>
                <Card.Title className="movie_title">
                  {movie.Title}
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    );
  }
}