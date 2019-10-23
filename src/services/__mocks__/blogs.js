const blogs = [
  {
    id: '123a456b789c',
    title: 'Test blog',
    author: 'Tester Author',
    url: 'localhost:something/testing',
    likes: 0,
    user: {
      username: 'tester',
      name: 'Donald Test',
      token: 'abc987d123e654f'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }