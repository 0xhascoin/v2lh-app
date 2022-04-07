import React, { useState, useEffect } from 'react';
import './navbar.scss';
import { getUserFavs, logout, getAllMyJobs, getAllJobsUserAppliedTo } from "../../actions/userActions";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';



const Navbar = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const userFavsList = useSelector((state) => state.userFavsList);
  const { interviews } = userFavsList;

  const getMyJobs = useSelector((state) => state.getMyJobs);
  const { myJobs } = getMyJobs;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getAllJobsAppliedTo = useSelector((state) => state.getAllJobsAppliedTo);
  const { jobsAppliedTo } = getAllJobsAppliedTo;

  // Logout function
  const logoutHandler = () => {
    // disconnectSocket();
    dispatch(logout()); // Calls the Logout function in Redux
    history.push("/"); // Push the user to the Home Page
  };

    useEffect(() => {
      if(userInfo?.userType.toLowerCase() == "user") {
        dispatch(getAllJobsUserAppliedTo(userInfo?._id))
      } else {
        dispatch(getAllMyJobs(userInfo?._id));
      }

      console.log("Re-rendered Navbar")
  }, []);
  
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          Live Hire
    </Link>

        <a role="button" className={showMenu ? "navbar-burger is-active" : "navbar-burger"} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
          onClick={() => setShowMenu(!showMenu)}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className={showMenu ? "navbar-menu is-active" : "navbar-menu"}>
        <div className="navbar-start">
          <Link className={location?.pathname == "/" ? "navbar-item is-selected" : "navbar-item"}
          to="/">
            Remote jobs
          </Link>
          {userInfo && (
            <>
            {userInfo?.userType.toLowerCase() == "employer" && (
              <Link className={location?.pathname == "/myjobs" ? "navbar-item is-selected" : "navbar-item"}
                to="/myjobs">
                  <span>My Jobs</span>
              </Link>
            )}

            {userInfo?.userType.toLowerCase() == "user" && (
              <Link className={location?.pathname == "/saved" ? "navbar-item is-selected" : "navbar-item"}
              to="/saved">
                <span>Saved jobs</span>
              </Link>
            )}
            </>
          )}
          <Link className={location?.pathname == "/about" ? "navbar-item is-selected" : "navbar-item"} to="/about">
            About us
          </Link>

          {userInfo && (
            <Link className={location?.pathname == "/interviews" ? "navbar-item is-selected" : "navbar-item"} to="/interviews">
              My interviews
            </Link>
          )}
        </div>
        {!userInfo ? (
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button post-button"
                to="/create">
                  Post a job
                </Link>
                <Link to="/login" className="button login-button">
                  Login
            </Link>
                <Link to="/register"
                className="button register-button">
                  Register
            </Link>
              </div>
            </div>
          </div>
        ) : (
            <div className="navbar-end signed-in">
              <div className="navbar-item">
                <div className="buttons">
                  <Link className="button post-button"
                  to="/create">
                    Post a job
                  </Link>
                  <div className={dropdown ? "dropdown is-active" : "dropdown"}
                    onClick={() => setDropdown(!dropdown)}>
                    <div className="dropdown-trigger">
                      <button className="button dropdown-button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <i className="user-icon">
                          {userInfo?.name[0]}
                        </i>
                        <span className="dropdown-text">
                          {userInfo?.name}
                        </span>
                        <span className={!dropdown ? "icon is-small" : "icon is-small flip"}>
                          <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                      </button>
                    </div>
                    <div className="dropdown-menu has-text-left" id="dropdown-menu" role="menu">
                      <div className="dropdown-content">
                        <Link className="dropdown-item"
                        to="/edit/account">
                          Update Profile
      </Link>

                        <hr className="dropdown-divider" />
                        <a href="#" className="dropdown-item" onClick={logoutHandler}>
                          Logout
      </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
        )}

      </div>
    </nav>
  )
};

export default Navbar;