import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

export const initializeBlog = id => {
  return async dispatch => {
    try {
      const blog = await blogService.getOne(id)
      dispatch({
        type: 'WANTED_BLOG',
        data: blog
      })
    } catch (error) {
      dispatch(setNotification(error.error, 5, 'error'))
    }
  }
}

export const addComment = (id, content) => {
  const comment = {
    content: content.value
  }
  return async dispatch => {
    try {
      const commentedBlog = await blogService.createComment(id, comment)
      content.reset()
      dispatch({
        type: 'COMMENTED_BLOG',
        data: commentedBlog
      })
    } catch (error) {
      console.log(error)
      dispatch(setNotification(error.error, 5, 'error'))
    }
  }
}

const blogReducer = (state=null, action) => {
  switch (action.type) {
  case 'WANTED_BLOG':
    return action.data
  case 'COMMENTED_BLOG':
    return action.data
  default:
    return state
  }
}

export default blogReducer