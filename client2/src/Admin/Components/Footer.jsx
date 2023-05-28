import React from 'react'
import { NavLink } from 'react-router-dom'
const Footer = () => {
  return (

      <div  className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-3 px-3 px-xl-5 bg-primary inner-footer">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2022. All rights reserved.
        </div>
        <div>
          <NavLink to="#!" className="text-white me-4 ml-2 mr-2">
            <i className="fab fa-facebook-f"></i>
          </NavLink>
          <NavLink to="#!" className="text-white me-4 ml-2 mr-2">
            <i className="fab fa-twitter"></i>
          </NavLink>
          <NavLink to="#!" className="text-white me-4 ml-2 mr-2">
            <i className="fab fa-google"></i>
          </NavLink>
          <NavLink to="#!" className="text-white  me-4 ml-2 mr-2">
            <i className="fab fa-linkedin-in"></i>
          </NavLink>
        </div>
      </div>
  )
}

export default Footer
