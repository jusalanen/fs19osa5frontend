import React from 'react'

const Blog = ({ blog }) => {
  return (
    <li className='blog'>
      {blog.title} by {blog.author}
    </li>
  )
}

export default Blog