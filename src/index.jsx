import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component
class SuperFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <MainView />
      </Provider>
    );
  }
}

// Finds  the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(SuperFlixApplication), container);
