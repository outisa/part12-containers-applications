import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { initializeUsers } from './usersReducer'
import { initializeBlog } from './blogReducer'

export const createBlog = (author, title, url) => {
  return async dispatch => {
    try {
      const blogObject = {
        author: author.value,
        title: title.value,
        url: url.value,
      }
      const newBlog = await blogService.create(blogObject)
      dispatch(setNotification(`A new blog "${blogObject.title}" by "${blogObject.author}" has been added`, 5, 'message'))
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
      author.reset()
      title.reset()
      url.reset()
      dispatch(initializeUsers())
    } catch(exception) {
      console.log(exception)
      const content = ('Validation error! Title and url required.  Title must be at least 1 character long')
      dispatch(setNotification(content, 5, 'error'))
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)
    console.log(sortedBlogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: sortedBlogs
    })
  }
}

export const like = (blogs, blog) => {
  const newBlog = { ...blog, user: blog.user.id, likes: blog.likes +1 }
  return async dispatch => {
    const updatetBlog = await blogService.update(blog.id, newBlog)
    const updatetBlogs = blogs.map(b => b.id !== updatetBlog.id ? b : updatetBlog)
    updatetBlogs.sort((a, b) => b.likes -a.likes)
    dispatch(initializeBlog(updatetBlog.id))
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatetBlogs
    })
  }
}

export const remove = (blogs, blog) => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(blog.id)
      const blogList = blogs.filter(b => b.id !== blog.id)
      blogList.sort((a, b) => b.likes -a.likes)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blogList
      })
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('Blog is already removed or you are not allowed to remove this blog', 5, 'error'))
    }
  }
}
const blogReducer = (state=[], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'UPDATE_BLOG':
    return action.data
  case 'REMOVE_BLOG':
    return action.data
  default:
    return state
  }
}

export default blogReducer