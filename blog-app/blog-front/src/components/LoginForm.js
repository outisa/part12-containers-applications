import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin, username, password }) => {
  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control {...username} reset='' id="username"/>
          <Form.Label>Password:</Form.Label>
          <Form.Control {...password} reset='' id="password"/>
          <Button variant='success' type="submit" id="login-button">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
}
export default LoginForm