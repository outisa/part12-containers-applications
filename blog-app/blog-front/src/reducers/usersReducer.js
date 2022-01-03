import userService from '../services/users'
import { setNotification } from '../reducers/notificationReducer'

export const createUser = (fullname, username, password) => {
  return async dispatch => {
    try {
      const userObject = {
        name: fullname.value,
        username: username.value,
        password: password.value
      }
      const newUser = await userService.create(userObject)
      fullname.reset()
      username.reset()
      password.reset()
      dispatch({
        type: 'NEW_USER',
        data: newUser
      })
    } catch (error) {
      dispatch(setNotification(error.data, 5, 'error'))
    }
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    console.log(users)
    const sortedUsers = users.sort((a, b) => b.blogs.length - a.blogs.length)
    console.log(sortedUsers)
    dispatch({
      type: 'INIT_USERS',
      data: sortedUsers
    })
  }
}
const usersReducer = (state=[], action) => {
  switch (action.type) {
  case 'NEW_USER':
    return [...state, action.data]
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export default usersReducer