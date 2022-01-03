import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

const CreateBlogForm = ({ handleAddBlog, title, author, url }) => (
  <Form onSubmit={handleAddBlog}>
    <Form.Group>
      <Form.Label>Title:</Form.Label>
      <Form.Control  {...title} reset='' id='title' />
      <Form.Label>Author:</Form.Label>
      <Form.Control {...author} reset='' id='author' />
      <Form.Label>Url:</Form.Label>
      <Form.Control {...url} reset='' id='url' />
      <Button variant='success' type="submit" id='add-button' >Add</Button>
    </Form.Group>
  </Form>
)
CreateBlogForm.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
}
export default CreateBlogForm