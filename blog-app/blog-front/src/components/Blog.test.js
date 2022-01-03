import React from 'react'
import { render, fireEvent, screen } from '../test_utils'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Refactoring',
    author: 'Martin Fowler',
    url: 'https://refactoring.com/',
    likes: 50,
    user: {
      username: 'mattiMe',
      name: 'Matti Meikäläinen'
    }
  }
  const user = {
    username: 'mattiMe',
    name: 'Matti Meikäläinen'
  }

  beforeEach(() => {
    render(
      <Blog loggedIn={user} />,
      { initialState: { blog: {
          title: 'Refactoring',
          author: 'Martin Fowler',
          url: 'https://refactoring.com/',
          likes: 50,
          user: {
            username: 'mattiMe',
            name: 'Matti Meikäläinen'
          }
        }}
     },
      
    )
  })


  test('at start title and author are displayed', async () => {
    expect(screen.getByTestId('blog-data')).toHaveTextContent('Refactoring, made by Martin Fowler')
  })

  test('after clicking like button likes are increased', () => {
    fireEvent.click(screen.getByTestId('like'))
    expect(screen).toHaveTextContent('51')
  })
})