import React, { useEffect } from 'react'
import {
  Switch, Route, Link,
  Redirect, useHistory,
} from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import CreateUserForm from './components/CreateUserForm'
import Notification from './components/Notification'
import Blogs from './Blogs'
import Blog from './components/Blog'
import Users from './Users'
import User from './components/User'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogsReducer'
import { logout, login, checkAuthentication } from './reducers/loginReducer'
import { initializeUsers, createUser } from './reducers/usersReducer'

const App = () => {
  const history= useHistory()
  const author = useField('text')
  const title = useField('text')
  const url = useField('url')
  const usernameLogin = useField('text')
  const passwordLogin = useField('password')
  const fullname = useField('text')
  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.loggedIn)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkAuthentication())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])


  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(usernameLogin, passwordLogin))
  }

  const handleLogout = (event) => {
    event.preventDefault()
    history.push('/login')
    dispatch(logout())
  }

  const create = (event) => {
    event.preventDefault()
    history.push('/login')
    dispatch(createUser(fullname, username, password))
  }
  const loginForm = () => (
    <Togglable buttonLabel="sign in">
      <LoginForm
        handleLogin={handleLogin}
        username= {usernameLogin}
        password={passwordLogin}
      />
    </Togglable>
  )

  const createUserForm = () => (
    <Togglable buttonLabel="sign up">
      <CreateUserForm
        create={create}
        fullname={fullname}
        username= {username}
        password={password}
      />
    </Togglable>
  )
  const blogForRef = React.createRef()
  const createBlogForm = () => (
    <Togglable buttonLabel="Add a new Blog" ref={blogForRef}>
      <CreateBlogForm
        handleAddBlog={handleAddBlog}
        title={title}
        author={author}
        url={url}
      />
    </Togglable>
  )

  const handleAddBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog(author, title, url))
    blogForRef.current.toggleVisibility()
  }

  return (
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              {loggedIn
                ?  <Link to="/blogs">blogs</Link>
                : null
              }
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {loggedIn
                ? <Link to="/users">users</Link>
                :  null
              }

            </Nav.Link>
            <Nav.Link href="#" as="span">
              {loggedIn
                ? <em><p>{loggedIn.name} logged in</p></em>
                : <Link to="/login">login</Link>
              }
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {loggedIn
                ? null
                : <Link to="/signup">sign up</Link>
              }
            </Nav.Link>
            <Nav.Item>
              {loggedIn
                ? <Button type='submit'  onClick={handleLogout} id='logout-button'>logout</Button>
                : null
              }
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Notification />
      {loggedIn === null ?
        <div>
          <Switch>
            <Route path='/login'>
              {loggedIn ?
                <Redirect to="/users" />:
                <div>
                  {loginForm()}
                </div>
              }
            </Route>
            <Route path='/signup'>
              <div>
                {createUserForm()}
              </div>
            </Route>
          </Switch>
        </div>   :
        <div >
          <h1>Blog app</h1>
          <Switch>
            <Route path='/users/:id' >
              <User />
            </Route>
            <Route path='/blogs/:id'>
              <Blog loggedIn={loggedIn} />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/blogs'>
              <div >
                <h2>Add new blog</h2>
                {createBlogForm()}
                <Blogs />
              </div>
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App