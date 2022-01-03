export const setNotification = (content, time, message) => {
  const milliSeconds = 1000 * time
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content,
      message: message
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
        data: '',
        message: ''
      })
    }, milliSeconds)
  }
}

const NotificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    state = {
      notification: action.data,
      message: action.message
    }
    return state
  case 'HIDE_NOTIFICATION':
    state = action.data
    return state
  default:
    return state
  }
}

export default NotificationReducer