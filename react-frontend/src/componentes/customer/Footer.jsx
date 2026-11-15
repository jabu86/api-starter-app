import React, { useState } from 'react'

function Footer() {
    const date = new Date; 
  return (
    <div className="row border justify-content-center shadow footer">&copy; Bhala {`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`}</div>
  )
}

export default Footer