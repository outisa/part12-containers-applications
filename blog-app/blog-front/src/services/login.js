import axios from '../util/apiClient'
const base =  'api/login'

const login = async credentials => {
  const response = await axios.post(base, credentials)
  return response.data
}

export default { login }