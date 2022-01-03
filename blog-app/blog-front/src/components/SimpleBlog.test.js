import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog= {
    title: 'Refactoring',
    author: 'Martin Fowler',
    likes: 50
  }

  const component = render(
    <SimpleBlog blog={blog}/>
  )
  expect(component.container).toHaveTextContent(
    'Refactoring Martin Fowlerblog has 50 likeslike'
  )
})

test('after clicking like-button twice, handler is called twice', () => {
  const blog= {
    title: 'Refactoring',
    author: 'Martin Fowler',
    likes: 50
  }
  const mockHandler = jest.fn()
  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})