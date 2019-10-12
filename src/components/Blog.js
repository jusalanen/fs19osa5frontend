import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDet, setShowDet] = useState(false)

  const toggle = () => {
    setShowDet(!showDet)
  }

  const showOrNot = { display: showDet ? '' : 'none' }
  
  return (
    <div className='blog' border >
      <div onClick={() => toggle()}>
      {blog.title} by {blog.author}
      </div>
      <div style ={showOrNot}>
        <a href={blog.url}>{blog.url}</a><br></br>
        likes {blog.likes} <button>like</button><br></br>
        added by {blog.user.name}<br></br>
      </div>      
    </div>
  )
}

export default Blog