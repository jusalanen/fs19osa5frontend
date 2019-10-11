import React from 'react'

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
          <button type="submit">add blog</button>
      </form>
    </div>
  )
}

export default BlogForm