import React from 'react'

const Todo = ({todo, refreshTodos}) => {
  const returnToTodoView = () => {
    refreshTodos()
  }
  return(
    <>
      <h1>Selected todo</h1>
      <h2>{todo.text}</h2>
      {todo.done ? <p>Is completed</p>:<p>Not Completed</p>}
      <p>Push the button, if you want to see all of the todos.</p>
      <button onClick={() => returnToTodoView()}>Show all todos</button>  
    </>
  )
}
export default Todo