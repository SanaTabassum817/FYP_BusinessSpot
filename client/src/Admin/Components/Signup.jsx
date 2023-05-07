// import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import validator from 'validator'
import Footer from './Footer'
import Header from './Header'

const Signup = (props) => {


  const userInfo = {
    name: "",
    email: "",
    password: "",
    cPassword: ""
  }

  const error = {
    name: "",
    email: "",
    password: "",
    cPassword: "",
    errorMsg: "",
    successMsg: ""
  }


  const [user, setUser] = useState(userInfo)
  const [msg, setMsg] = useState(error)
  const onChangeEventHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const onSubmitEventHandler = async (event) => {
    event.preventDefault()

    // -----------Clientside user validation-------------
    let isError = false;

    if (user.name.length === 0) {
      error.name = "Please enter a valid name!"
      isError = true
    } else {
      error.name = ""
    }
    if (user.email.length === 0) {
      error.email = "Please enter a valid email address!"
      isError = true
    } else {
      if (!validator.isEmail(user.email)) {
        error.email = "Please enter a valid email address!"
        isError = true
      } else {
        error.email = ""
      }
    }
    if (validator.isStrongPassword(user.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }) > 0) {
      error.password = ""
    } else {
      error.password = "Please enter 8 digit strong password!"
      isError = true
    }
    if (user.cPassword === user.password) {
      error.cPassword = ""
    } else {
      error.cPassword = "Passwords did not match"
      isError = true
    }
    if (isError) {
      setMsg((prevValue) => {
        console.log("prev: ", error);
        return ({
          ...error,  //using spread opearator
        })
      })
    }
    // if no error occurs then call backend api
    else {
      //-----------Calling backend api---------------
      try {
        const response = await fetch("http://localhost:8000/signup", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        const jsonResponse = await response.json()
        console.log(jsonResponse);
        if (jsonResponse.error) {
          error.errorMsg = jsonResponse.error
          error.successMsg = ""
          setMsg(error)
          props.showAlert(jsonResponse.error, "danger");
          //console.log(msg);
        } else {
          error.errorMsg = ""
          error.successMsg = jsonResponse.msg
          setMsg(error)
          //console.log("msg",msg);
          await props.showAlert(jsonResponse.msg, "success");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>

      {/* <div className="d"> */}
      <Header alert={props.alert} />

      <div className="d1signup" >
        <div className='quote'>
          <h4 className='quote'>Welcome</h4>
          <span > We exist to make entrepreneurship easier.</span>
        </div>
      </div>
      <div className="d2" >
        <div className="card">
          <div className="card-body py-5 px-md-5">
            <form onSubmit={onSubmitEventHandler}>
              <header className='card-heading mb-1'>Create new account</header>

              <div className="form-outline mb-2 dinput">
                <input className="form-control " type="text" name="name" placeholder='Enter your full name' id='form3Example3' onChange={onChangeEventHandler} />
                <label className="form-label" htmlFor="form3Example3"> <i className="fas fa-user"></i> &nbsp; Full Name</label>
                <span className="link-danger" id='errorName'>{msg.name}</span>
              </div>

              <div className="form-outline mb-2 dinput">
                <input className="form-control " type="email" name='email' placeholder='Enter a valid email' id='form3Example4' onChange={onChangeEventHandler} />
                <label className="form-label" htmlFor="form3Example4"> <i className="fas fa-envelope"></i>&nbsp; Email Address</label>
                <span className="link-danger" id='erroremail'>{msg.email}</span>
              </div>

              <div className="form-outline mb-2 dinput">
                <input className="form-control  " type="password" name='password' placeholder='Enter 8 digit password' id='form3Example3' onChange={onChangeEventHandler} />
                <label className="form-label" htmlFor="form3Example3"> <i className="fas fa-lock"></i> &nbsp; Password</label>
                <span className="link-danger" id='errorPassword'>{msg.password}</span>
              </div>

              <div className="form-outline mb-2 dinput ">
                <input className="form-control " type="password" name='cPassword' placeholder='Enter confirm password' id='form3Example3' onChange={onChangeEventHandler} />
                <label className="form-label" htmlFor="form3Example3"> <i className="fas fa-lock"></i> &nbsp; Confirm Password</label>
                <span className="link-danger" id='errorCPassword'>{msg.cPassword} </span>
              </div>

              <div className="text-center text-lg-start  pt-2">
                <button type="submit" className="btn btn-primary btn-lg "
                  style={{ PaddingLeft: "2.5rem", PaddingRight: "2.5rem" }}
                >Signup</button>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <p className="medium fw-bold mt-2 pt-1 mb-0">Already have an account? <NavLink to="/login"
                  className="link-danger">Login</NavLink></p>
              </div>
              {/* 
                {
                  msg.errorMsg !== "" ?(<span className='error'>{msg.errorMsg}</span>) : null
                }
                {
                  msg.successMsg !== "" ?
                    (<span className='success'>{msg.successMsg}</span>) : null
                } */}

            </form>
          </div>
        </div>

        {/* </div> */}


      </div>


      <Footer />




    </>)
}


export default Signup