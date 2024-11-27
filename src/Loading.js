import { Audio } from 'react-loader-spinner'
import React from 'react'

function Loading() {
  return (
    
    <div className="loading-container">
    <Audio
      height="80"
      width="80"
      radius="9"
      color="green"
      ariaLabel="loading"
      wrapperStyle
      wrapperClass
    />
    <h2 className="loading-text">Loading, please wait...</h2>
  </div>
  )
}

export default Loading