import React from 'react'
import { useSelector } from 'react-redux'
import '../index.css'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const showNotification = () => {
    if (notification.notification === '') {
      return true
    }
    return false
  }
  if (notification.message === 'error') {
    return (
      showNotification() ? null :
        <div className="error">
          {notification.notification}
        </div>
    )
  } else if (notification.message === 'message') {
    return (
      showNotification() ? null :
        <div className="added">
          {notification.notification}
        </div>
    )
  }
  return null
}

export default Notification