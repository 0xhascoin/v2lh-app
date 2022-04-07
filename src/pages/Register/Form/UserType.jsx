import React from 'react';

const UserType = ({ user, changeUserType }) => {
  return (
    <>
      <h1 className="title">Who are you ?</h1>
      <div className="usertype-container">
        <button className={user.userType == "Employer" ? "emp selected" : "emp"}
          onClick={() => changeUserType("Employer")}>Employer
          {user.userType == "Employer" && <i className="fas fa-check"></i>}</button>
        <button className={user.userType == "User" ? "us selected" : "us"}
          onClick={() => changeUserType("User")}>Job seeker
          {user.userType == "User" && <i className="fas fa-check"></i>}</button>
      </div>
    </>
  )
}

export default UserType;