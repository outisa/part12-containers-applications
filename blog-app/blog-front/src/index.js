
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore,  applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import { BrowserRouter as Router } from 'react-router-dom'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  loggedIn: loginReducer,
  users: usersReducer,
  user: userReducer,
  blog: blogReducer,

})
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)