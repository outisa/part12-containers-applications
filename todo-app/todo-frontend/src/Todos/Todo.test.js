import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Todo from './Todo'

test('renders todos text', () => {
  const todo = {
    text: 'Make world great again',
    done: false
  }
  const refreshTodos = () => {
    console.log("Hello todos")
  }
  const component = render (
    <Todo todo={todo} refreshTodos={refreshTodos}/>
  )
  expect(component.container).toHaveTextContent(
    'Make world great again'
  )
})