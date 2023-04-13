import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../actions/actions";
import config from "../../config";

export class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    //Create state variables that will be used to add/remove a movie from a users favorite list
    this.state = {
      FavoriteMovies: [],
      userDetails: [],
      isFavorite: this.props.user.FavoriteMovies.includes(this.props.movie._id),
    };
  }

  // add a movie to FavoriteMovies list
  addFavorite = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .post(
        `${config.API_URL}/users/${Username}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        this.setState({ isFavorite: true });

        let tempUser = { ...this.props.user };
        tempUser.FavoriteMovies.push(this.props.movie._id);
        console.log(tempUser);
        this.props.setUser(tempUser);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Delete a movie from FavoriteMovies list
  removeFavorite = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `${config.API_URL}users/${Username}/movies/${this.props.movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        //Set isFavorite state to false
        this.setState({ isFavorite: false });
        let tempUser = { ...this.props.user };
        tempUser.FavoriteMovies.splice(
          tempUser.FavoriteMovies.indexOf(this.props.movie._id),
          1
        );
        console.log(tempUser);
        this.props.setUser(tempUser);
        console.log("Movie removed", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie } = this.props;
    const { isFavorite } = this.state;
    const tempArray = this.props.FavoriteMovies;
    console.log("movie card props", this.props);

    return (
      <Card className="movie-card" bg="dark">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
          </div>
          <div style={{ marginTop: "12px" }}>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="light" size="sm">
                More info
              </Button>
            </Link>
            {isFavorite ? (
              <Button
                className="float-right"
                variant="outline-warning"
                size="sm"
                onClick={this.removeFavorite}
              >
                Remove from Favorites
              </Button>
            ) : (
              <Button
                className="float-right"
                variant="warning"
                size="sm"
                onClick={this.addFavorite}
              >
                Add to Favorites
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Series: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { movies, user } = state;
  return { movies, user };
};

export default connect(mapStateToProps, { setUser })(MovieCard);
