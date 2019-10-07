import React from 'react'

const Blog = ({ blog }) => {
  return (
    <li className='noteblog'>
      {blog.title} {blog.author}
    </li>
  )
}

export default Blog