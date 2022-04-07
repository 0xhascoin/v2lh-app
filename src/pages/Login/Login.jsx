import React, { useState, useEffect } from 'react';
import './login.scss';
import './loader.css';

import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/userActions";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // Get the Currently Logged In User in the UserInfo state
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

   const [user, setUser] = useState({
    email: "",
    password: "" 
  });

  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const loginHandler = (e) => {
    e.preventDefault();
    if (user.email.length < 5 || user.email == "") {
      setEmailError(true);
    } else {
      setEmailError(false);
      if(user.password == "" || user.password.length < 5) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
        // setSignedIn(true);
        dispatch(loginUser(user));
        history.push("/");
;      }
    }
  }


  useEffect(() => {
    // If they are already logged in then redirect to the profile page.
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  return (
  <div className="columns login-page">
    <div className="column is-6 login-form-col">
    <Link to="/" className="go-home">
      Go Home
    </Link>
      <h1 className="login-form-title">Welcome back</h1>
      <p className="login-form-subtitle">Welcome back, please enter your details</p>
      <form className="form my-5" onSubmit={loginHandler}>
        <div className="field">
          <label className="label">Email</label>
          {emailError && (
            <p className="error-text has-text-danger">
              Email error
            </p>
          )}
          <div className="control">
            <input 
            className={emailError ? "input is-danger" : "input"} 
            type="email" 
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})} />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          {passwordError && (
            <p className="error-text has-text-danger">
              Password error
            </p>
          )}
          <div className="control">
            <input 
            className={passwordError ? "input is-danger" : "input"} 
            type="password" 
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})} />
          </div>
        </div>
        <a className="forgot-password">
          Forgot password
        </a>
        <div className="field my-3">
          <div className="control">
            <button className="button login-button is-fullwidth"
            type="submit">
            {loading ? (
              <span>
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
              </span>
            ) : (
              <span>Sign In</span>
            )}
            </button>
          </div>
        </div>
        <div className="field my-3">
          <div className="control">
            <button className="button google-button is-fullwidth">
              <span className="icon">
                <i className="fab fa-google"></i>
              </span>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
        <div className="sign-up-text has-text-centered">
        Do not have an account? <Link to="/register">Sign up for free</Link>
        </div>
      </form>
    </div>
    <div className="column image-col">
    </div>
    </div>
  )
}

export default Login;