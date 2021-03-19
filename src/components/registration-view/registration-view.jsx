import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('https://mycfdb.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // '_self' is necessary so the page will open in the current tab
        alert('You may now log in');
      })
      .catch(e => {
        console.log('error registering the user')
      });
  };

  return (
    <Form>
      <Form.Row>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
          <Form.Control.Feedback type="invalid">Please enter a valid username with at least 5 alphanumeric characters.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter Email Address" />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
          <Form.Control.Feedback type="invalid">Username contains non alphanumeric characters - not allowed.</Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control type="date" onChange={e => setBirthday(e.target.value)} placeholder="Enter Birthday" />
          <Form.Control.Feedback type="invalid">Please enter a valid birthday.</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Button block variant="primary" type="submit" onClick={handleRegister}>Register</Button>
      <br></br>
      <Link to={`/login`}>
        <Button className="registration-button" variant="dark">
          Back to Login
							</Button>
      </Link>
    </Form>

  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string,
  }),
};