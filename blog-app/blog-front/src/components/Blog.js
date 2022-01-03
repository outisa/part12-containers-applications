import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { like, remove } from '../reducers/blogsReducer'
import { initializeBlog, addComment } from '../reducers/blogReducer'
import { useParams, useHistory } from 'react-router-dom'
import { useField } from '../hooks'
import { Button } from 'react-bootstrap'

const Blog = ({ loggedIn }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => state.blog)
  const blogs = useSelector(state => state.blogs)
  const content = useField('')

  useEffect(() => {
    dispatch(initializeBlog(id))
  },[dispatch, id])

  const handleLikes = () => {
    dispatch(like(blogs, blog))
    dispatch(setNotification(`"${blog.title}" has been liked by you`, 5, 'message'))
  }

  const handleRemove = () => {
    console.log(blog)
    const confirmed = window.confirm(`Are you sure, you want to delete ${blog.title} by ${blog.author}`)
    if (confirmed) {
      dispatch(remove(blogs, blog))
      dispatch(setNotification(`"${blog.title}" has been removed successfully`, 5, 'message'))
      history.push('/blogs')
    }
  }

  const handleAdd = (event) => {
    event.preventDefault()
    dispatch(addComment(id, content))
  }


  if (blog === null) {
    return null
  }

  const usersBlog = blog.user.username === loggedIn.username
  return (
    <div id='blogTable'>
      <div >
        <h2 data-testid="blog-data">{blog.title}, made by {blog.author}</h2>
      </div>
      <div >
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        <p>likes: {blog.likes} </p>
        <Button variant='info' onClick={handleLikes} id='like-button' data-testid="like">like</Button>
        <p>Added by {blog.user.name}</p>
        {usersBlog ?
          <Button variant='danger' onClick={handleRemove} id='remove-button' >remove blog</Button> :
          null}
        <h4>Comments</h4>
        <br/>
        <div>
          <input {...content} reset='' />
          <Button variant='info' type="submit" onClick={handleAdd}>add comment</Button>
        </div>
        {blog.comments.length === 0 ?
          <div>
            <p>no comments yet</p>
          </div>:
          <div>
            <ul>
              {blog.comments.map(comment =>
                <li key={comment.id}>{comment.content}</li>
              )}
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Blog