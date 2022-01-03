import axios from '../util/apiClient'

const base = 'api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(base)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(base, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${base}/${id}`, newObject)
  return response.data
}

const createComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${base}/${id}/comments`, comment, config)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${base}/${id}`, config)
  return response.data
}

const getOne = id => {
  const request = axios.get(`${base}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, setToken, update, deleteBlog, getOne, createComment }