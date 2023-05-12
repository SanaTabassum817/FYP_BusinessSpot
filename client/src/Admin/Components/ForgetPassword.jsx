import React, { useState } from 'react'
import validator from 'validator'
import { NavLink } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import "../../Shared/styles/forgetPassword.css"

const ForgetPassword = (props) => {
  const error = {
    email: "",
    errorMsg: "",
    successMsg: ""
  }
  const userInfo = {
    email: ""
  }
  const [user, setUser] = useState(userInfo)
  const [msg, setMsg] = useState(error)

  const onChangeEventHandler = (event) => {
    setUser({ [event.target.name]: event.target.value })
  }

  const onSubmitEventHandler = async (event) => {
    event.preventDefault()
    if (user.email.length === 0) {
      error.email = "Please enter a valid email address"
      setMsg((prevValue) => {
        return ({
          ...error
        })
      })
      console.log(msg);
    }
    else {
      if (!validator.isEmail(user.email)) {
        error.email = "Please enter a valid email address"
        setMsg((prevValue) => {
          return ({
            ...error
          })
        })
      } else {
        error.email = ""
        //calling backend api 
        const response = await fetch("http://localhost:8000/forgetPassword", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        const jsonResponse = await response.json()
        console.log(jsonResponse);
        if (jsonResponse.msg) {
          error.errorMsg = ""
          error.successMsg = jsonResponse.msg
          setMsg(error)
          props.showAlert( jsonResponse.msg, "success")
        } else {
          error.errorMsg = jsonResponse.error
          error.successMsg = ""
          setMsg(error)
          props.showAlert(jsonResponse.error, "danger")
        }
      }
    }


  }

  return (
    <>
      <Header alert={props.alert} />
      <div className='content-warapper'>
      <div className="d2" >
        <div className="card">
          <div className="card-body py-5 px-md-5">
            <form onSubmit={onSubmitEventHandler}>
              <header className='card-heading'>Forget Password</header>
              <div className="form-outline mb-3">
                <input className="form-control form-control-lg" type="text" name='email' placeholder='Enter a valid email' id='form3Example4' onChange={onChangeEventHandler} />
                <label className="form-label" htmlFor="form3Example4"> <i className="fas fa-envelope"></i>&nbsp; Email Address</label>
                <div> <span className="error" id='erroremail'>{msg.email}</span></div>
              </div>

              <div className="text-center text-lg-start  pt-2">
                <button type="submit" className="btn btn-primary btn-lg "
                  style={{ PaddingLeft: "2.5rem", PaddingRight: "2.5rem" }}
                >Send Email</button>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <p className="medium fw-bold mt-2 pt-1 mb-0"> Back to login? <NavLink to="/login"
                  className="link-danger">&nbsp; Login</NavLink></p>
              </div>
            </form>
          </div>
        </div>
        
      </div>
      <div className="d1forget" >
        <div className='quote'>
          <h4 className='quote'>Welcome</h4>
          <span > We exist to make entrepreneurship easier.</span>
        </div>
      </div>
      <Footer />
      </div>
    </>
  )
}

export default ForgetPassword