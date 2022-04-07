import React, { useEffect, useState } from 'react';
import './register.scss';
import '../Login/loader.css';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../actions/userActions";

// Components
import Form from './Form/Form'

const Register = () => {

  const [user, setUser] = useState({
    name: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: ""
  });


  const [nameError, setNameError] = useState(false)
  const [locationError, setLocationError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)

  const chooseUserType = (e, uType) => {
    e.preventDefault();
    setUser({
      name: "",
      location: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: uType
    });
  }

  const registerHandler = (e) => {
    e.preventDefault();
    if (user.name.length < 5 || user.name == "") {
      setNameError(true);
    } else {
      setNameError(false);
      if (user.email.length < 5 || user.email == "") {
        setEmailError(true);
      } else {
        setEmailError(false);
        if (user.password == "" || user.password.length < 5) {
          setPasswordError(true);
        } else {
          setPasswordError(false)
          if (user.confirmPassword == "" || user.confirmPassword.length < 5 || user.confirmPassword !== user.password) {
            setConfirmPasswordError(false);
          } else {
            setConfirmPasswordError(true);
            if(user.location == "") {
              setLocationError(true);
            } else {
              setLocationError(false);
              dispatch(registerUser(user));
              history.push("/login")
            }
          }
          ;
        }
      }
    }
  }

  const history = useHistory();
  const dispatch = useDispatch();

  // Gets the userRegister state from redux & stores it as userInfo
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    // If a user is already logged in, redirect to the profile page
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);




  return (
    <div className="columns register-page">
      <div className="column is-6 login-form-col">
        <Link to="/" className="go-home">
          Go Home
    </Link>
        <h1 className="login-form-title">Welcome to Live Hire</h1>
        <p className="login-form-subtitle">Welcome! please enter your details to create an account</p>
        <form className="form my-5" onSubmit={registerHandler}>
          <label class="label user-type-text">Are you an employer or looking for a job?</label>
          <div class="field is-grouped">
            <div class="control user-type-control">
              <button
                class={user.userType == "user" ? "button is-dark is-active" : "button is-dark is-outlined is-not-active"}
                onClick={(e) => chooseUserType(e, "user")}>
                <span>Job seeker</span>
                {user.userType == "user" && (
                  <span class="icon">
                    <i class="far fa-dot-circle"></i>
                  </span>
                )}
              </button>
            </div>
            <div class="control user-type-control">
              <button class={user.userType == "employer" ? "button is-dark is-active" : "button is-dark is-outlined is-not-active"}
                onClick={(e) => chooseUserType(e, "employer")}>              <span>Employer</span>
                {user.userType == "employer" && (
                  <span class="icon">
                    <i class="far fa-dot-circle"></i>
                  </span>
                )}</button>
            </div>
          </div>
          {user.userType !== "" && (
            <>

              <div class="field">
                <label class="label">Name</label>
                {nameError && (
                  <p className="error-text has-text-danger">
                    Name error
                </p>
                )}
                <div class="control">
                  <input
                    class={nameError ? "input is-danger" : "input"}
                    type="text"
                    placeholder="Enter your full name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })} />
                </div>
              </div>
              {/*
              TODO: ADD LOCATION ERROR STATE
              TODO: ADD LOCATION ERROR TO REGISTER HANDLER FUNCTION
            */}
              <div class="field">
                <label class="label">Location</label>
                {locationError && (
                  <p className="error-text has-text-danger">
                    Location error
                </p>
                )}
                <div class="control">
                  <div class={locationError ? "select is-danger" : "select"}>
                    <select value={user.location}
                      onChange={(e) => setUser({ ...user, location: e.target.value })}>
                      <option value="">
                        Select a location
                    </option>
                      <option value="UK">
                        United Kingdom
                    </option>
                      <option value="USA">
                        United States
                    </option>
                      <option value="EU">
                        Europe
                    </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                {emailError && (
                  <p className="error-text has-text-danger">
                    Email error
                </p>
                )}
                <div class="control">
                  <input
                    class={emailError ? "input is-danger" : "input"}
                    type="email"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
              </div>
              <div class="field is-grouped">
                <div class="control password-control">
                  <label class="label">Password</label>
                  {passwordError && (
                    <p className="error-text has-text-danger">
                      Password error
                  </p>
                  )}
                  <input
                    class={passwordError ? "input is-danger" : "input"}
                    type="password"
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                <div class="control password-control">
                  <label class="label">Confirm Password</label>
                  {confirmPasswordError && (
                    <p className="error-text has-text-danger">
                      Confirm password error
                  </p>
                  )}
                  <input
                    class={confirmPasswordError ? "input is-danger" : "input"}
                    type="password"
                    placeholder="Confirm your password"
                    value={user.confirmPassword}
                    onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
                </div>
              </div>
              {/*            
            // TODO: CHANGE THIS TO COMPANY NAME
            // TODO: CREATE THE COMPANYNAMERROR STATE
            */}
              {user.userType == "employer" && (
                <div class="field">
                  <label class="label">Company Name</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Enter your company name"
                      value={user.companyName}
                      onChange={(e) => setUser({ ...user, companyName: e.target.value })} />
                  </div>
                </div>
              )}

              <div class="field my-3">
                <div class="control">
                  <button className="button login-button is-fullwidth"
                    type="submit">
                    {loading ? (
                      <span>
                        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                      </span>
                    ) : (
                        <span>Register</span>
                      )}
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="sign-up-text has-text-centered">
            Have an account? <Link to="/login">Login to your account</Link>
          </div>
        </form>
      </div>
      <div className="column image-col">
        <div className="frosted-card">
          <h1 className="frosted-card-title">
            "We have been using Live Hire to kickstart all of our roles and we can not imagine hiring without it."
        </h1>
        </div>
      </div>
    </div>
  )
}

export default Register;