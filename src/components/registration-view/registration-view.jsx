import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props on registered user(username) */
    props.onRegister(true, username);
  };

  return (
    <div className="registration-view">
      <h2>Sign up for a free SuperFlix account:</h2>

      <form className="registration-form">

        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>

        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>

        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>

        <label>
          Birthday:
          <input type="birthday" value={email} onChange={e => setBirthday(e.target.value)} />
        </label>

        <button type="submit" onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );
}

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired
};

