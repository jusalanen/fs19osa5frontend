import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [ blogs, setBlogs ] = useState([]) 
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [user, setUser] = useState(null)
  const [ message, setMessage ] = useState(null)


  const hook = () => {
    console.log('effect')
    blogService
      .getAll()
      .then( initBlogs => {
        console.log('promise fulfilled')
        console.log(initBlogs)
        setBlogs(initBlogs)
      })
  }
  
  useEffect(hook, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setMessage(user.name + ' logged in')
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} />

        <form onSubmit={handleLogin}>
          <div>
            username <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
  
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={message} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  
}

export default App;
