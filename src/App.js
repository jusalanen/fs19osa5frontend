import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [ blogs, setBlogs ] = useState([]) 
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [user, setUser] = useState(null)
  const [ message, setMessage ] = useState(null)
  const [ messageType, setMessagetype ] = useState(null)
  const [ newTitle, setNewtitle ] = useState('')
  const [ newAuthor, setNewauthor ] = useState('')
  const [ newUrl, setNewurl ] = useState('')
  const [blogformVisible, setBlogformVisible] = useState(false)

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

  const addBlog = async (event) => {
    event.preventDefault()
    if (newTitle === '' || newUrl === '') {
        setMessage('title or url missing')
        setTimeout(() => {
        setMessage(null)
      }, 5000)
      return
    }
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    const savedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(savedBlog))

    setMessage('Added blog ' + newTitle + ' by ' + newAuthor)
    setMessagetype('success')
    setTimeout(() => {
      setMessage(null)
      setMessagetype(null)
    }, 5000) 
    setNewtitle('')
    setNewauthor('')
    setNewurl('')
    setBlogformVisible(false)
  }

  const hideWhenVisible = { display: blogformVisible ? 'none' : '' }
  const showWhenVisible = { display: blogformVisible ? '' : 'none' }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} />
        <LoginForm handleLogin = {handleLogin}
                username = {username}
                setUsername = {setUsername}
                password = {password}
                setPassword = {setPassword} />  
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} type={messageType}/>
      <table><tbody><tr><td><p>{user.name} logged in </p></td>
      <td width='50'><button onClick = { () => {
        logOut()}}>logout</button></td></tr></tbody></table>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogformVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
      <BlogForm addBlog = {addBlog}
                title = {newTitle}
                setTitle = {setNewtitle}
                author = {newAuthor}
                setAuthor = {setNewauthor}
                url = {newUrl}
                setUrl = {setNewurl} />                
      <button onClick={() => setBlogformVisible(false)}>cancel</button></div><br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  
}

export default App;
