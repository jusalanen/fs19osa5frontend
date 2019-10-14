import React from 'react'
import PropTypes from 'prop-types'


const BlogForm = props => {
  const addBlog = props.addBlog
  const title = props.title
  const setTitle = props.setTitle
  const author = props.author
  const setAuthor = props.setAuthor
  const url = props.url
  const setUrl = props.setUrl

  return (
    <div>
      <h3>Add a new blog</h3>
      <form onSubmit={addBlog}>
          <div>
            title <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author <input
              type="author"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url <input
              type="url"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">submit</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  setAuthor: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired
}

export default BlogForm