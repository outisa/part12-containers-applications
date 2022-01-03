// test-utils.js j
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore,  applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({ 
  notification: notificationReducer,
  blogs: blogsReducer,
  loggedIn: loginReducer,
  users: usersReducer,
  user: userReducer,
  blog: blogReducer,

})

function render(
  ui,
  {
    initialState = {},
    store = createStore(
      reducer,
      composeWithDevTools(
        applyMiddleware(thunk)
      )
    ),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}><Router>{children}</Router></Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }
