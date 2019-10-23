import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
jest.mock('./services/blogs')
import { render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

describe('<App />', () => {
  test('only login form is rendered if no logged user', async () => {
    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('h2')
    )

    expect(component.container).toHaveTextContent(
      'log in to blog application'
    )

    expect(component.container).not.toHaveTextContent(
      'Blogs'
    )

    const blog = component.container.querySelector('Blog')
    expect(blog).toBe(null)
  })
})

