import React, { useState } from 'react';
import './form.scss';

import { Link } from 'react-router-dom';

import UserType from './UserType';

const Form = ({register, user, changeUserType, setUser, passwordsMatch}) => {

  return (
    <div id="form">
      <h1 className="title">Register</h1>
      <hr />
      {/* User Type */}
      <UserType user={user} changeUserType={changeUserType}/>

      {user.userType !== "" && (
        <form className="register-form" onSubmit={register}>
          {user.userType === "Employer" && (
            <div className="field">
              <label className="label is-small">Company Name</label>
              <p className="control has-icons-left">

                <input className="input is-dark" type="text" placeholder="Name of the company" onChange={(e) => setUser({ ...user, companyName: e.target.value })} />

                <span className="icon is-small is-left my-1">
                  <i className="far fa-building"></i>
                </span>
              </p>
            </div>
          )}

          {/* Fullname */}
          <div className="field my-2">
            <label className="label is-small">Full name</label>
            <p className="control">

              <input className="input is-dark" type="text" placeholder="Full name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            </p>
          </div>

          {/* Location */}
          <div className="field">
            <label className="label is-small">Your location</label>
            <p className="control has-icons-left">
              <span className="select is-fullwidth">
                <select name="location" id="location"
                  onChange={(e) => setUser({ ...user, location: e.target.value })}>
                  <option value={null}>Select a location</option>
                  <option value="UK">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="EU">Europe</option>
                  <option value="CA">Canada</option>
                </select>
              </span>
              <span className="icon is-small is-left">
                <i className="fas fa-globe"></i>
              </span>
            </p>
          </div>

          {/* Email */}
          <div className="field">
            <label className="label is-small">Email</label>
            <p className="control has-icons-left">
              <input
                className="input is-dark"
                type="email"
                placeholder="Your email address"
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value })
                }
              />
              <span className="icon is-small is-left my-1">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
          </div>

          {!passwordsMatch &&
            <p className="passwordsError">Passwords do not match</p>
          }

          {/* Password */}
          <div className="field my-3">
            <label className="label is-small">Password</label>
            <p className="control has-icons-left">
              <input
                className={passwordsMatch ? "input" : "input passwordsError"}
                type="password"
                placeholder="Your password"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
              />
              <span className="icon is-small is-left my-1">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>

          {/* Confirm Password */}
          <div className="field my-3">
            <label className="label is-small">Confirm Password</label>
            <p clclassNameass="control has-icons-left">
              <input
                className={passwordsMatch ? "input" : "input passwordsError"}
                type="password"
                placeholder="Confirm your password"
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
              />
              <span className="icon is-small is-left my-1">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>

          {/* Register Now*/}

          <div className="field">
            <p className="control">
              <button
                className="button is-dark register-button"
                type="submit"
              >
                Register an account
            </button>
            </p>
          </div>
          <p className="subtitle" id="register-instead">
            Already have an account?
          <Link className="has-text-dark has-text-dark" to="/login">
              login instead. <i className="fas fa-hand-point-right"></i>
            </Link>
          </p>

        </form>
      )}

    </div>
  )
}

export default Form;