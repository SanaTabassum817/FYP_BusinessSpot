import React, { useState } from 'react'
import validator from 'validator'
import { useParams, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { NavLink } from 'react-router-dom'
import Header from './Header'

const ChangePassword = (props) => {

  const { userId, resetPasswordToken } = useParams()
  const navigate = useNavigate()

  const error = {
    password: "",
    cPassword: "",
    errorMsg: ""
  }
  const userInfo = {
    password: "",
    cPassword: ""
  }
  const [user, setUser] = useState(userInfo)
  const [msg, setMsg] = useState(error)

  const onChangeEventHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const onSubmitEventHandler = async (event) => {
    event.preventDefault()
    console.log(user);
    // -----------Clientside user validation-------------
    let isError = false;

    if (validator.isStrongPassword(user.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }) > 0) {
      error.password = ""
    } else {
      error.password = "Please enter 8 digit strong Password"
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
        //  console.log("prev: ",error);
        return ({ ...error })
      })
    }
    else {
      //-----------Calling backend api---------------
      try {
        const response = await fetch(`http://localhost:8000/users/${userId}/changePassword/${resetPasswordToken}`, {
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
          setMsg(error)
          props.showAlert("Password has been changed Successfully","success");
          navigate(`/login?msg=${jsonResponse.msg}`)
        } else {
          error.errorMsg = jsonResponse.error
          setMsg(error)
          props.showAlert(jsonResponse.error,"danger");
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
        <div className="d1resetpass" >
    <div className='quote'>
            <h4 className='quote'>Welcome</h4>
            <span > We exist to make entrepreneurship easier.</span>
          </div>
      </div>
        <div className="d2" >
        <div className="card">
            <div className="card-body py-5 px-md-5">
              <form onSubmit={onSubmitEventHandler}>
                <header className='card-heading'>Reset Password</header>
               <div className="form-outline mb-3">
 <input className="form-control form-control-lg " type="password" name='password' placeholder='Enter 8 digit password' id='form3Example3' onChange={onChangeEventHandler} />
                  <label className="form-label" htmlFor="form3Example3"> <i className="fas fa-lock"></i> &nbsp; Password</label>
                  <div>  <span className="error" id='errorPassword'>{msg.password}</span></div>
                </div>

                <div className="form-outline mb-3">
  <input className="form-control form-control-lg" type="password" name='cPassword' placeholder='Enter confirm password' id='form3Example3' onChange={onChangeEventHandler} />
                  <label className="form-label" htmlFor="form3Example3"> <i className="fas fa-lock"></i> &nbsp; Confirm Password</label>
                  <div>  <span className="error" id='errorCPassword'>{msg.cPassword}</span></div>
                </div>

                <div className="text-center text-lg-start  pt-2">
                  <button type="submit" className="btn btn-primary btn-lg "
                    style={{ PaddingLeft: "2.5rem", PaddingRight: "2.5rem" }}
                  >Change Password</button>

                </div>

                <div className="d-flex justify-content-between align-items-center">
 <p className="medium fw-bold mt-2 pt-1 mb-0">Back to login? <NavLink to="/login"
                    className="link-danger"> &nbsp; Login</NavLink></p>
                </div>

                {/* {
                  msg.errorMsg !== "" ?
                    (<span className='error'>{msg.errorMsg}</span>) : null
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

    </>
  )
}

export default ChangePassword