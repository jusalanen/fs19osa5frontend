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
      console.log(window.localStorage)
  }
  
  useEffect(hook, [])

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      console.log(loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setMessage(`${user.name} logged in`)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log(user)
      console.log(window.localStorage)
      blogService.setToken(user.token)
      setUser(user)
      setMessage(`${user.name} logged in`)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.clear()
    setMessage(null)
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

      <table><tbody><tr><td width='200'><Notification message={message} /></td>
      <td width='50'><button onClick = { () => {
        logOut()}}>logout</button></td></tr></tbody></table>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  
}

export default App;
