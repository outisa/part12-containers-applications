describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Meikäläinen',
      username: 'mattime',
      password: 'tosiSalainen'
    }
    const user2 = {
      name: 'Maija Meikäläinen',
      username: 'maijame',
      password: 'salaisempi'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST',  'http://localhost:3003/api/users/', user2)
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000/login')
    cy.contains('sign in').click()
    cy.contains('Username:')
    cy.contains('Password:')

  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:3000/login')
      cy.contains('sign in').click()
      cy.get('#username').type('mattime')
      cy.get('#password').type('tosiSalainen')
      cy.get('#login-button').click()

      cy.contains('Matti Meikäläinen logged in')
    })
    it('fails with wrong credentials', function() {
      cy.visit('http://localhost:3000/login')
      cy.contains('sign in').click()
      cy.get('#username').type('mattime')
      cy.get('#password').type('tosisallainen')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mattime', password: 'tosiSalainen' })
      cy.visit('http://localhost:3000/blogs')
    })

    it('A blog can be created', function() {
      cy.contains('Add a new Blog').click()
      cy.get('#title').type('New Blog')
      cy.get('#author').type('Outi S.')
      cy.get('#url').type('http://www.example.com')
      cy.get('#add-button').click()

      cy.contains('New Blog, by Outi S.')
    })

    it('A blog can be liked', function() {
      cy.contains('Add a new Blog').click()
      cy.get('#title').type('New Blog')
      cy.get('#author').type('Outi S.')
      cy.get('#url').type('http://www.example.com')
      cy.get('#add-button').click()
   
      cy.contains('New Blog, by Outi S.').click()
      cy.get('#blogTable').should('contain', 'likes: 0')

      cy.get('#like-button').click()
      cy.get('#blogTable').should('contain', 'likes: 1')      
    })

    it('Blog can be removed', function() {
      cy.contains('Add a new Blog').click()
      cy.createBlog({ 
        title: 'New Blog',
        author: 'Outi S.',
        url: 'http://www.example.com' 
      })
      cy.contains('New Blog, by Outi S.').click()
      cy.get('#remove-button').click()
      
      cy.get('#blogs').should('not.contain', 'New Blog')
    })

    it('Blog can be removed only by its creator', function() {
      cy.contains('Add a new Blog').click()
      cy.createBlog({ 
        title: 'New Blog',
        author: 'Outi S.',
        url: 'http://www.example.com' 
      })
      cy.contains('New Blog, by Outi S.').click()    
      cy.get('#blogTable').should('contain','New Blog')
      cy.get('#remove-button').should('exist')   
      
      cy.get('#logout-button').click()
      cy.login({ username: 'maijame', password: 'salaisempi' })
     
      cy.contains('New Blog, by Outi S.').click()  
      cy.contains('New Blog').parent().find('#remove-button')
        .should('not.exist')         

    })

  })

  describe('List is shown correctly', function(){
    beforeEach(function() {
      cy.login({ username: 'mattime', password: 'tosiSalainen' })      
      cy.createBlog({
        title: 'First blog',
        author: 'The Creator',
        url: 'http://www.example.com',
        likes: 23       
      })
      cy.createBlog({
        title: 'Second blog',
        author: 'The Creator',
        url: 'http://www.example.com',
        likes: 2             
      })
      cy.createBlog({
        title: 'Third blog',
        author: 'The Creator',
        url: 'http://www.example.com',
        likes: 13   
      })
    })

    it('Blogs are sorted by likes most liked first', function() {
      cy.contains('First blog, by The Creator').click()
      cy.get('#like-button').click()
      cy.get('#like-button').click()
      cy.visit('http://localhost:3000/blogs')
      cy.contains('Third blog, by The Creator').click()
      cy.get('#like-button').click()
      
       
      cy.visit('http://localhost:3000/blogs')
      cy.get('#box').then(blogs => {
        console.log('number of blogs', blogs.length)
        console.log(blogs)
        cy.wrap(blogs[0]).contains('First blog, by The Creator')
        cy.wrap(blogs[2]).contains('Third blog, by The Creator')
        cy.wrap(blogs[4]).contains('Second blog, by The Creator')

      })
      
    })
    
  })
})