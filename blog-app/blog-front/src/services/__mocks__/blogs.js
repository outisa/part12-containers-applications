const blogs = [
  {
    id: '5e0b9f82f7a8e91435e37714',
    title: 'Refactoring',
    author: 'Martin Fowler',
    url: 'https://refactoring.com/',
    likes: 50,
    user: {
      username: 'mattiMe',
      name: 'Matti Meikäläinen'
    }
  },
  {
    id: '5e0b9f82f7a8e91435e38882',
    title: 'Microservices Guide',
    author: 'Martin Fowler',
    url: 'https://martinfowler.com/microservices/',
    likes: 7,
    user: {
      username: 'mattiMe',
      name: 'Matti Meikäläinen'
    }
  },
  {
    id: '5e0b9f82f7a8e91892u24292',
    title: 'Software Testing Guide',
    author: 'Martin Fowler',
    url: 'https://martinfowler.com/testing/',
    likes: 9,
    user: {
      username: 'maijaMe',
      name: 'Maija Meikäläinen'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}
const user = {
  username: 'mattiMe',
  token: '12349876',
  name: 'Matti Meikäläinen'
}

const setToken = () => {
  return Promise.resolve(user.token)
}

export default { getAll, setToken }