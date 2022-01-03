import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const CreateUserForm = ({ create, fullname, username, password }) => {
  return (
    <div>
      <h1>Sign up</h1>
      <Form onSubmit={create}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control {...fullname} reset='' id="name"/>
          <Form.Label>Username:</Form.Label>
          <Form.Control {...username} reset='' id="username"/>
          <Form.Label>Password:</Form.Label>
          <Form.Control {...password} reset='' id="password"/>
          <Button variant='success' type="submit" id="create-button">sign up</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
CreateUserForm.propTypes = {
  create: PropTypes.func.isRequired,
  fullname: PropTypes.object.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
}
export default CreateUserForm