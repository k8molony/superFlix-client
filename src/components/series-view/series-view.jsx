import React from "react";
import PropTypes from "prop-types";
import "./series-view.scss";
import { Container, Card, Button, Row } from "react-bootstrap";

export class SeriesView extends React.Component {
  render() {
    const { series, onBackClick, movies } = this.props;

    return (
      <Container fluid>
        <Card>
          <Card.Body>
            <Card.Title>Series</Card.Title>
            <Card.Text>
              <span className="label">Name:</span>
              <span className="value">{series.Name}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Description:</span>
              <span className="value">{series.Description}</span>
            </Card.Text>

            <Button
              variant="dark"
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
          </Card.Body>
        </Card>
        <Row>
          {movies.map((movie) => (
            <Card className="favorite-movie card-content" key={movie._id}>
              <Card.Img
                className="fav-poster"
                variant="top"
                src={movie.ImagePath}
              />
              <Card.Body style={{ backgroundColor: "#90adc6" }}>
                <Card.Title className="movie_title">{movie.Title}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    );
  }
}

SeriesView.proptypes = {
  series: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
