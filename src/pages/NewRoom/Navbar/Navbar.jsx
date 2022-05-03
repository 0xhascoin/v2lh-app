import React, { useState } from "react";
import "./navbar.scss";

import { FaMoon } from "react-icons/fa";
import { RiSunLine } from "react-icons/ri";
import { MdImportantDevices } from "react-icons/md";
import {
  AiOutlinePlayCircle,
  AiFillCaretUp,
  AiFillCaretDown,
} from "react-icons/ai";

const Navbar = ({ darkTheme, setDarkTheme }) => {
  const [userInfo, setUserInfo] = useState({
    name: "hasan",
    userType: "user",
  });
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Logout function
  const logoutHandler = () => {
    // dispatch(logout()); // Calls the Logout function in Redux
    // history("/"); // Push the user to the Home Page
  };

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <nav
      className={darkTheme ? "navbar navbar-dark" : "navbar navbar-light"}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a
          href="#"
          className="navbar-item"
          style={
            darkTheme
              ? { color: "rgba(255, 255, 255, 0.92)" }
              : { color: "#1A202C" }
          }
        >
          <MdImportantDevices style={{ marginRight: "1rem" }} />
          Live Hire
        </a>

        {!darkTheme ? (
          <FaMoon
            className="navbar-burger dark-theme-button"
            onClick={() => setDarkTheme(!darkTheme)}
          />
        ) : (
          <RiSunLine
            className="navbar-burger light-theme-button"
            onClick={() => setDarkTheme(!darkTheme)}
          />
        )}

        <a
          role="button"
          className={
            showMenu
              ? "navbar-burger is-active burger-button"
              : "navbar-burger burger-button"
          }
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setShowMenu(!showMenu)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={showMenu ? "navbar-menu is-active" : "navbar-menu"}
      >
        <div className="navbar-end">
          <a className="navbar-item" href="#">
            <button
              className={darkTheme ? "post-job-button dark" : "post-job-button"}
            >
              Post job
            </button>
          </a>

          <a
            className={
              darkTheme
                ? "navbar-item navbar-item-dark"
                : "navbar-item navbar-item-light"
            }
          >
            Find Jobs
          </a>
          <a
            className={
              darkTheme
                ? "navbar-item navbar-item-dark"
                : "navbar-item navbar-item-light"
            }
          >
            About Us
          </a>
          {!userInfo && (
            <>
              <a
                className={
                  darkTheme
                    ? "navbar-item navbar-item-dark"
                    : "navbar-item navbar-item-light"
                }
              >
                Sign up
              </a>
              <a
                className={
                  darkTheme
                    ? "navbar-item navbar-item-dark"
                    : "navbar-item navbar-item-light"
                }
              >
                Login
              </a>
            </>
          )}

          {userInfo && (
            <div
              class={
                showDropdown
                  ? "navbar-item dropdown is-active"
                  : "navbar-item dropdown"
              }
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div class="dropdown-trigger">
                <button
                  class={darkTheme ? "button dark" : "button"}
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                >
                  <span className="first-letter">
                    <p>{userInfo?.name[0].toUpperCase()}</p>
                  </span>
                  <span>{toTitleCase(userInfo?.name)}</span>
                  <span class="icon is-small">
                    {showDropdown ? <AiFillCaretUp /> : <AiFillCaretDown />}
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  {userInfo?.userType.toLowerCase() === "user" && (
                    <a to="/saved" class="dropdown-item">
                      Saved jobs <span className="count">5</span>
                    </a>
                  )}
                  {userInfo?.userType.toLowerCase() === "employer" && (
                    <a class="dropdown-item">Applications</a>
                  )}
                  <a class="dropdown-item">Interview Manager</a>
                  {userInfo?.userType.toLowerCase() === "user" && (
                    <a class="dropdown-item">Update Profile</a>
                  )}
                  <a href="#" class="dropdown-item" onClick={logoutHandler}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          )}

          {!darkTheme ? (
            <a className="navbar-item">
              <button
                className="dark-theme-button"
                onClick={() => setDarkTheme(!darkTheme)}
              >
                <FaMoon />
              </button>
            </a>
          ) : (
            <a className="navbar-item">
              <button
                className="light-theme-button"
                onClick={() => setDarkTheme(!darkTheme)}
              >
                <RiSunLine />
              </button>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
