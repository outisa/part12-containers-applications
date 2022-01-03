import axios from '../util/apiClient'

const base = 'api/users'

const getAll = () => {
  const request = axios.get(base)
  return request.then(response => response.data)
}

const create = async newUser => {
  const response = await axios.post(base, newUser)
  return response.data
}

const getOne = id => {
  const request = axios.get(`${base}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, getOne }