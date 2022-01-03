import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector(state => state.users)
  return(
    <>
      <h2>Users</h2>
      <Table bordered>
        <tbody>
          <tr>
            <td>
              Name
            </td>
            <td>
              Created blogs
            </td>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} >{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

export default Users