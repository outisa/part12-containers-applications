import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './index.css'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  console.log(blogs.length)
  if (blogs.length === 0) {
    return null
  }
  return(
    <div id='blogs'>
      <h3>Blogs</h3>
      {blogs.map(blog =>
        <div className='list' id='box' key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}, by {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default Blogs