import React from "react";
import PropTypes from 'prop-types';
import { Row, Col, Button, Card, CardGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './movie-view.scss';

const mapStateToProps = state => {
  const { movies, user } = state;
  return { movies, user };
};

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
    //Create state variables that will be used to add/remove a movie from a users favorite list
    this.state = {
      FavoriteMovies: [],
      userDetails: []
    }
  }  

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row>
        <Col>
          <CardGroup>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" type="fluid" src= {movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>
                  <div className="movie-view_line description">
                    <span className="movie-view_line_label">Description: </span>
                    <span className="movie-view_line_value">{movie.Description}</span>
                  </div>

                  <div className="movie-series">
                    <span className="label">Series: </span>
                    <Link to={`/series/${movie.Series.Name}`}>
                      <Button variant="link">{movie.Series.Name}</Button>
                    </Link>
                  </div>

                  <div className="movie-director">
                    <span className="label">Director: </span>
                    <Link to={`/directors/${movie.Director.Name}`}>
                      <Button variant="link">{movie.Director.Name}</Button>
                    </Link>
                  </div>

                  <div>
                    <Button onClick={() => { onBackClick(null); }} variant="dark">Back</Button>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    ImagePath: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    Series: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      BirthYear: PropTypes.number,
      DeathYear: PropTypes.number
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired 
};

export default connect(mapStateToProps)(MovieView);
