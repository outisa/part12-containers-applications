const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const bcrypt = require('bcrypt')

let loggedInToken = '';
beforeEach(async () => {
  await Blog.deleteMany({})
  
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('salasanainen', 10) 
  const user = new User({ username: 'sepase', name: 'Otto Normalverbraucher', passwordHash})
  await user.save()
  const newBlog = {
    title: 'delete this blog',
    author: 'Mary Daniels',
    url: 'www.google.com',
    likes: '22'
  }
  const response = await api
  .post('/api/login')
  .send({
    username: 'sepase',
    password: 'salasanainen'
  })

  loggedInToken = response.body.token;

  await api
  .post('/api/blogs')
  .set('Authorization', `bearer ${loggedInToken}`)      
  .send(newBlog)
  await Promise.all(promiseArray)      
})


describe('blog format', () => {
  test('blog information is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body.length).toBe(helper.initialBlogs.length +1)
  })

  test('blog id is written as id instead of _id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body.map(blog => blog.id)
    console.log(blog)
    expect(blog).toBeDefined()
  })
})

describe('addition of a blog', () => {
  test('a valid blog can be saved', async () => {
    const newBlog = {
      title: 'This is new',
      author: 'Mary Daniels',
      url: 'www.thisisnew.com',
      likes: '13'
    }
    
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loggedInToken}`)      
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 2)  

    const blogTitles = blogsAtEnd.map(blog => blog.title)
    expect(blogTitles).toContain('This is new')
  })

  test('a valid blog cannot be saved with invalid authorization', async () => {
    const newBlog = {
      title: 'This is new',
      author: 'Mary Daniels',
      url: 'www.thisisnew.com',
      likes: '13'
    }
    
    await api
      .post('/api/blogs')  
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)  

  })

  test('with empty likes value is to be 0', async () => {
    const newBlog = {
      title: 'This is new',
      author: 'Mary Daniels',
      url: 'www.thisisnew.com',
      likes: ''
    }
    await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loggedInToken}`)      
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 2)  
    const blogLikes = blogsAtEnd.filter(blog => blog.title === 'This is new')
    expect(blogLikes[0].likes).toBe(0)
  })

  test('empty url on title or url, expect 400', async () => {
    const newBlog = {
      title: '',
      author: 'Mary Daniels',
      url: '',
      likes: '22'
    }

    await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loggedInToken}`)      
    .send(newBlog)
    .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)  
  })
})

describe('deleting a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart.filter((blog) => blog.title === 'delete this blog')
    const toDelete = blogToDelete[0]
    console.log(toDelete.id)
    await api
      .delete(`/api/blogs/${toDelete.id}`)
      .set('Authorization', `bearer ${loggedInToken}`)        
      .expect(204)
    
    const blogsEnd = await helper.blogsInDb()
    console.log('täällä')
    expect(blogsEnd.length).toBe(helper.initialBlogs.length)
    const titles = blogsEnd.map(blog => blog.title )
    expect(titles).not.toContain(toDelete.title)
  })

})

describe('likes can be updated', () => {
  test('update likes', async () => {
    const blogsAtBegin = await helper.blogsInDb()
    const blogToUpdate = blogsAtBegin[1]
    blogToUpdate.likes = 900

    await api 
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const updated = blogsAtEnd.filter(blog => blog.title === blogToUpdate.title)
    expect(updated[0].likes).toBe(900) 
  })

})

describe('User related tests', () => {
  test('creation of a user succees', async () => {
    const userAtStart = await helper.usersInDb({})
    console.log(userAtStart.length)
    const newUser = {
      username: 'maijameija',
      name: 'Maija Meikäläinen',
      password: 'sallainen',
    }

    await api
     .post('/api/users')
     .send(newUser)
     .expect(200)
     .expect('Content-Type', /application\/json/)

    const userAtEnd = await helper.usersInDb({})
    expect(userAtEnd.length).toBe(userAtStart.length + 1)

    const userlist = userAtEnd.map(user => user.username)
    expect(userlist).toContain(newUser.username)
  })

  test('if password is missing, creation fails', async () => {
    const newUser = {
      username: 'maijameija',
      name: 'Maija Meikäläinen',
      password: '',
    }

    const usersAtStart = await helper.usersInDb({})

    await api
     .post('/api/users')
     .send(newUser)
     .expect(400)
     .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb({})

    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('fields for username or name are empty, creation fails', async () => {
    const newUser = {
      username: '',
      name: '',
      password: '3q3r',
    }
  
    const usersAtStart = await helper.usersInDb({})
  
    await api
     .post('/api/users')
     .send(newUser)
     .expect(400)
     .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb({})
  
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  
  })

  test('usename not unique, creation fails', async () => {
    const newUser = { 
      username: 'sepase',
      name: 'Normalverbraucher', 
      password: 'salanainen'
    }
  
    const usersAtStart = await helper.usersInDb({})
  
    const result = await api
     .post('/api/users')
     .send(newUser)
     .expect(400)
     .expect('Content-Type', /application\/json/)
  
    expect(result.body.error).toContain('`username` to be unique')
    const usersAtEnd = await helper.usersInDb({})
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  
  })
 
})



afterAll(() => {
  mongoose.connection.close()
})