# SuperFlix App

Using React, this build is for the client-side of an application called superFlix based on its existing server-side code (REST API and database).

The entire application is built using the MERN (MongoDB, Express, React, and Node.js) stack. The database is a list of Marvel movies and series, and the end result will be an app that can display the movies in chronological order and give information about each of them as well as their directors, and includes the ability for users to login and save their favorite movies.

The purpose of this repository is to create the client interface which users will use when making requests to and receiving responses from the server.

## [SuperFlix App] (https://superflixheroes.netlify.app)

## Essential Views and Features

- Main View

  - Returns a list of ALL movies to the user (each listed with an image, title, and description.)
  - Sorting and Filtering
  - Ability to select a movie for more details

- Single Movie View

  - Returns data (description, series, director, image) about a single movie to the user
  - Allows users to add a movie to their list of favorites

- Login View

  - Allows users to log in with a username and password

- Registration View

  - Allows new users to register (username, password, email, birthday)

- Series View

  - Returns data about a series, with a name and description
  - Displays example movies

- Director View

  - Returns data about a director (name, bio, birth year, death year)
  - Displays example movies

- Profile view

  - Allows users to update their user info (username, password, email, date of birth)
  - Allows existing users to deregister
  - Display favorite movies
  - Allows users to remove a movie from their list of favorites

## Technical Requirements

-The app must be a single-page application (SPA)
-The app must use state routing to navigate between views and shre URLs
-The app must give users the option to filter movies
-The app must give users the option to sort movies
-The app must initially use Parcel as its build tool
-The app must be written using the React library and in ES2015+
-The app must be written with React Redux (hence respecting the Flux pattern)
-The app must use Bootstrap as a UI library for styling and responsiveness
-The app must contain a mix os class components and function components
-The app may be hosted online

## App Views

<img src="/img/SuperflixLoginView.png" alt="screenchot of login view of superFlix" width="100%">
<img src="/img/superflixMovieView.png" alt="screenchot of movie view of superFlix" width="100%">
<img src="/img/superFlixProfileView.png" alt="screenchot of profile view of superFlix" width="100%">
