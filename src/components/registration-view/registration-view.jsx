import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

import './registration-view.scss';

export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister('test');
  };

  return (
    <Form>
      <Form.Row>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formGridPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formGridBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
        </Form.Group>
      </Form.Row>

      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
  onRegister: PropTypes.func.isRequired,
};