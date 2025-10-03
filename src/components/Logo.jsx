import React from 'react'
import logoImage from '../assets/blogapp.jpg'

function Logo({width = '100px'}) {
  return (
    <img src={logoImage} alt="Logo" style={{ width }} />
  )
}

export default Logo