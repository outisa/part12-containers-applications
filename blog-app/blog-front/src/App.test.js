import React from 'react'
import { waitForElement } from '@testing-library/react'
import { render } from './test_utils'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    render(
      <App />,
      { state: { loggedIn: {} } },
    )
  
    await waitForElement(
      () => screen.getByText('sign in')
    )
    expect(screen).toHaveTextContent(
      'Login'
    )
    expect(screen).toHaveTextContent(
      'Username:'
    )
    expect(screen).toHaveTextContent(
      'Password:'
    )
    expect(screen).toHaveTextContent(
      'login'
    )
    expect(screen).toHaveTextContent(
      'cancel'
    )
  })
  test('if no user logged, blogs are not rendered', async () => {
    const user = {
      username: 'mattiMe',
      token: '12349876',
      name: 'Matti Meikäläinen'
    }

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
 
    await waitForElement(
      () => container.querySelector('.togglableContent')
    )

    const blogs = container.querySelectorAll('.togglableContent')

    expect(blogs.length).toBe(3)
    expect(component.container).toHaveTextContent(
      'Refactoring'
    )
    expect(component.container).toHaveTextContent(
      'Software Testing Guide'
    )
    expect(component.container).toHaveTextContent(
      'Microservices Guide'
    )
  })
})