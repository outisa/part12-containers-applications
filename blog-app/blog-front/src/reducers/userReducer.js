import userService from '../services/users'
import { setNotification } from '../reducers/notificationReducer'

export const initializeUser = id => {
  return async dispatch => {
    try {
      const user = await userService.getOne(id)
      dispatch({
        type: 'WANTED_USER',
        data: user
      })
    } catch (error) {
      dispatch(setNotification(error.data, 5, 'error'))
    }
  }
}

const userReducer = (state=null, action) => {
  switch (action.type) {
  case 'WANTED_USER':
    return action.data
  default:
    return state
  }
}

export default userReducer