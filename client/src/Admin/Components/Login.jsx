import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import validator from 'validator'
import Footer from './Footer';
import Header from './Header';
const Login = (props) => {
  const userInfo = {
    email: "",
    password: ""
  }

  const error = {
    email: "",
    password: "",
    errorMsg: "",
    successMsg: ""
  }

  const [user, setUser] = useState(userInfo)
  const [msg, setMsg] = useState(error)
  const navigate = useNavigate()

  const onChangeEventHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const onSubmitEventHandler = async (event) => {
    event.preventDefault()

    // -----------Client side user validation-------------
    let isError = false;
    if (user.email.length === 0) {
      error.email = "Please enter a valid email address"
      isError = true
    } else {
      if (!validator.isEmail(user.email)) {
        error.email = "Please enter a valid email address"
        isError = true
      } else {
        error.email = ""
      }
    }
    if (validator.isStrongPassword(user.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }) > 0) {
      error.password = ""
    } else {
      error.password = "Please enter 8 digit strong password"
      isError = true
    }
    if (isError) {
      setMsg((prevValue) => {
        return ({
          ...error,  //using spread opearator
        })
      })
     
    }
    // if no error occurs then call backend api
    else {
      //-----------Calling backend api---------------
      const response = await fetch("http://localhost:8000/login", {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
      });
      const jsonResponse = await response.json()
      console.log(jsonResponse);
      if (jsonResponse._id) {
        error.errorMsg = ""
        setMsg(error);
        props.handleLogin();
        navigate('/')
        
      } else {
        error.errorMsg = jsonResponse.error
        error.successMsg = ""
        setMsg(error)
       // console.log("msg: ",msg);
        props.showAlert(jsonResponse.error, "danger");
      }
    }
  }

  return (

    <>
      <Header alert={props.alert} />

      <div className="d2" >
        <div className="card">
          <div className="card-body py-5 px-md-5">
            <form onSubmit={onSubmitEventHandler}>
              <header className='card-heading mb-1'>Login</header>
              <div className="form-outline mb-3 dinput">
                <input className="form-control form-control-lg" type="email" name='email' placeholder='Enter a valid email' id='form3Example4' onChange={onChangeEventHandler} />
                <label className="form-label" htmlFor="form3Example4"> <i className="fas fa-envelope"></i>&nbsp; Email Address</label>
                <div> <span className="link-danger" id='erroremail'>{msg.email}</span></div>
              </div>

              <div className="form-outline mb-3 dinput">
                <input className="form-control form-control-lg " type="password" name='password' placeholder='Enter 8 digit password' id='form3Example3' onChange={onChangeEventHandler} />
                
                <label className="form-label" htmlFor="form3Example3"> <i className="fas fa-lock"></i> &nbsp; Password</label>
                <div>  <span className="link-danger" id='errorPassword'>{msg.password}</span></div>
              </div>
              <div className="text-center text-lg-start  pt-2">
                <button type="submit" className="btn btn-primary btn-lg "
                  style={{ PaddingLeft: "2.5rem", PaddingRight: "2.5rem" }}
                >Login</button>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="medium fw-bold mt-2 pt-1 mb-0">Forget Password? <NavLink to="/forgetPassword"
                  className="link-danger"> &nbsp; Forget Password</NavLink></p>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <p className="medium fw-bold mt-2 pt-1 mb-0"> Don't have an account? <NavLink to="/signup"
                  className="link-danger">&nbsp; Signup</NavLink></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d1login" >
        <div className='quote'>
          <h4 className='quote'>Welcome</h4>
          <span > We exist to make entrepreneurship easier.</span>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login