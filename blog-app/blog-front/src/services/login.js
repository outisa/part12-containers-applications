import axios from '../util/apiClient'
const base =  'api/login'

const login = async credentials => {
  console.log(credentials)
  const response = await axios.post(base, credentials)
  return response.data
}

export default { login }