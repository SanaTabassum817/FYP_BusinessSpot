import React from 'react'
import Alert from './Alert'
const Header = (props) => {
   
  return (
    <div><h2 className='logoText'>Business <span className='logo'>Spot</span> </h2>
    <p className='tagline'>Vision to Grow Better</p>
    <Alert alert={props.alert} />
  </div>
  )
}

export default Header
