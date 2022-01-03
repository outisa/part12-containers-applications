import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser } from '../reducers/userReducer'

const User = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(initializeUser(id))
  },[dispatch, id])

  if (!user) {
    return null
  }
  console.log(user.name)
  return(
    <div className='container'>
      <h3>{user.name}</h3>
      <h2>Added blogs</h2>
      {user.blogs.length === 0 ?
        <div>
          <p>no added blogs</p>
        </div>:
        <div>
          <ul>
            {user.blogs.map(blog =>
              <li key={blog.id}>
                {blog.title}
              </li>
            )}
          </ul>
        </div>}

    </div>
  )
}

export default User