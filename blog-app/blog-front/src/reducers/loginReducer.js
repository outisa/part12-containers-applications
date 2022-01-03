import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const login = (usernameLogin, passwordLogin) => {
  return async dispatch => {
    const username = usernameLogin.value
    const password = passwordLogin.value
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      usernameLogin.reset()
      passwordLogin.reset()
      blogService.setToken(user.token)

      dispatch({
        type: 'LOGGED_IN',
        data: user
      })
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('Wrong username or password!', 5, 'error'))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setNotification('You are succesfully logged out', 5, 'message'))
    dispatch({
      type: 'LOGGED_OUT',
      data: null
    })
  }
}
export const checkAuthentication = () => {
  let user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
  const initialState = user ?  user : null
  if (user) {
    blogService.setToken(user.token)
  }
  return async dispatch => {
    dispatch({
      type: 'LOGGED_IN',
      data: initialState
    })
  }
}

const authentication = (state = null, action) => {
  switch (action.type) {
  case 'LOGGED_IN':
    return  action.data
  case 'FAILURE' :
    return action.data
  case 'LOGGED_OUT':
    return action.data
  default:
    return state
  }
}

export default authentication