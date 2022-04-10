import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./profile-view.scss";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      modalState: false,
      formState: {
        Username: null,
        Password: null,
        Email: null,
        Birthday: null,
      },
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios
      .get(`https://superflix-db.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: "",
          Email: "",
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
          formState: {
            Username: "",
            Password: "",
            Email: "",
            Birthday: "",
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Allow user to edit or update profile
  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://superflix-db.herokuapp.com/users/${Username}`,
        {
          Username: this.state.formState.Username,
          Password: this.state.formState.Password,
          Email: this.state.formState.Email,
          Birthday: this.state.formState.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem("user", this.state.Username);
        alert("Profile updated");
        window.open("/profile", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Delete a movie from FavoriteMovies list
  onRemoveFavorite = (e, movie) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://superflix-db.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Show the modal to confirm you want to delete a user profile
  showModal() {
    this.setState({ modalState: true });
  }

  // Close the modal that confirms you want to delete a user profile
  closeModal() {
    this.setState({ modalState: false });
  }

  //Deregister
  onDeleteUser() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://superflix-db.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.setState({
      formState: {
        ...this.state.formState,
        Username: value,
      },
    });
  }

  setPassword(value) {
    this.setState({
      formState: {
        ...this.state.formState,
        Password: value,
      },
    });
  }

  setEmail(value) {
    this.setState({
      formState: {
        ...this.state.formState,
        Email: value,
      },
    });
  }

  setBirthday(value) {
    this.setState({
      formState: {
        ...this.state.formState,
        Birthday: value,
      },
    });
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { FavoriteMovies, Username, Email, Birthday, Password, formState } =
      this.state;

    if (!Username) {
      return <p>Something went wrong...</p>;
    }

    return (
      <Container className="profile-view" align="center">
        {/* Modal specification which will display when attempting to delete a user */}
        <Modal show={this.state.modalState} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              Are you sure you want to delete your user profile?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Once a user profile has been deleted, there is no way to restore it.
            Are you sure you wish to continue?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.onDeleteUser}>
              Delete Profile
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col>
            <Card className="show-profile">
              <Card.Body>
                <Card.Title className="text-center">
                  Profile of {Username}
                </Card.Title>
                <Card.Text>
                  <span className="profile_heading">Email: </span>
                  {Email}{" "}
                </Card.Text>
                {Birthday && (
                  <Card.Text>
                    <span className="profile_heading">Birthday: </span>
                    {Intl.DateTimeFormat().format(new Date(Birthday))}{" "}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
            <Card className="update-profile">
              <Card.Body>
                <Card.Title>Profile</Card.Title>
                <Form
                  className="update-form"
                  onSubmit={(e) =>
                    this.editUser(
                      e,
                      this.Username,
                      this.Password,
                      this.Email,
                      this.Birthday
                    )
                  }
                >
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      placeholder="New Username"
                      value={formState.Username}
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      value={formState.Password}
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      placeholder="Enter Email"
                      value={formState.Email}
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birthday"
                      value={formState.Birthday}
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <div className="mt-3">
                    <Button
                      variant="warning"
                      type="submit"
                      onClick={this.editUser}
                    >
                      Update User
                    </Button>
                    <Button
                      className="ml-3"
                      variant="secondary"
                      onClick={() => this.showModal()}
                    >
                      Delete User
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <h4>{Username}'s Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Body>
              {FavoriteMovies.length === 0 && (
                <div className="text-center">No Favorite Movies</div>
              )}
              <Row className="favorite-container">
                {FavoriteMovies.length > 0 &&
                  movies.map((movie) => {
                    if (
                      movie._id ===
                      FavoriteMovies.find((fav) => fav === movie._id)
                    ) {
                      return (
                        <Card
                          className="favorite-movie card-content"
                          key={movie._id}
                        >
                          <Card.Img
                            className="fav-poster"
                            variant="top"
                            src={movie.ImagePath}
                          />
                          <Card.Body style={{ backgroundColor: "black" }}>
                            <Card.Title className="movie_title">
                              {movie.Title}
                            </Card.Title>
                            <Button
                              size="sm"
                              variant="danger"
                              value={movie._id}
                              onClick={(e) => this.onRemoveFavorite(e, movie)}
                            >
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      );
                    }
                  })}
              </Row>
            </Card.Body>
          </Col>
        </Row>
        <div className="backButton">
          <Button
            variant="dark"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </div>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
