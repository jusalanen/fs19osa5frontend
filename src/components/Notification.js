import React from 'react'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }
  if (props.type === 'success') {
    return (
      <div className="notification">
        { props.message }
      </div>
    )
  }
  return (
    <div className="error">
      { props.message }
    </div>
  )
}

export default Notification 