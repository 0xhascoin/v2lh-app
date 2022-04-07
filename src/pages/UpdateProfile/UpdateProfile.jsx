import React, {useEffect, useState} from 'react';
import './updateProfile.scss';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {updateUsersCV, getIsUserProfileUpdated} from '../../actions/userActions'


// Components
import Navbar from '../../components/Navbar/Navbar';

const UpdateProfile = () => {
  const [cv, setCv] = useState({
    aboutMe: "",
    workExp: "",
    mySkills: ""
  });

  const updateMyCv = (e) => {
    e.preventDefault();
    // console.log(userInfo?._id, "UserInfoID")
    dispatch(updateUsersCV(userInfo?._id, cv.aboutMe, cv.workExp, cv.mySkills))
    dispatch(getIsUserProfileUpdated(userInfo?._id));

  }

  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if(!userInfo) {
      history.push("/");
    }
    console.log(userInfo, "User Info")
  }, [])

  return (
    <>
      <Navbar />
      <div className="column update-profile">
        <div className="hero">
          <h1>Update Profile</h1>
        </div>
          <form className="form update-profile-container"
          onSubmit={updateMyCv}>
          <div class="field my-5">
          <label class="label">Name</label>
          {/*{companyNameError && (
            <span className="error-text has-text-danger has-text-light">
              Company Name must be more than 3 characters
            </span>
          )}*/}
          <div class="control">
            <input class="input" 
            type="text" 
            placeholder={userInfo?.name} 
            disabled
            />
          </div>
        </div>
          <div class="field my-5">
          <label class="label">Email</label>
          {/*{companyNameError && (
            <span className="error-text has-text-danger has-text-light">
              Company Name must be more than 3 characters
            </span>
          )}*/}
          <div class="control">
            <input class="input" 
            type="email" 
            placeholder={userInfo?.email} 
            disabled
            />
          </div>
        </div>
          <div class="field my-5">
          <label class="label">Location</label>
          {/*{companyNameError && (
            <span className="error-text has-text-danger has-text-light">
              Company Name must be more than 3 characters
            </span>
          )}*/}
          <div class="control">
            <input class="input" 
            type="text" 
            placeholder={userInfo?.location} 
            disabled
            />
          </div>
        </div>
        {userInfo?.userType.toLowerCase() != "employer" && (
          <>

          <div class="field">
            <label class="label">About me <span className="required">(required)</span></label>
            {/*{bonusSkillsError && (
              <span className="error-text has-text-danger has-text-light">
                Bonus skills must be more than 30 chars
              </span>
            )}*/}
            <div class="control">
              <textarea class="textarea" rows="5"
              value={cv.aboutMe}
              onChange={(e) => setCv({...cv, aboutMe: e.target.value})}
              placeholder={userInfo?.userCV?.aboutMe}
                ></textarea>
            </div>
          </div>
          <div class="field">
            <label class="label">Previous work experience <span className="required">(required)</span></label>
            {/*{bonusSkillsError && (
              <span className="error-text has-text-danger has-text-light">
                Bonus skills must be more than 30 chars
              </span>
            )}*/}
            <div class="control">
              <textarea class="textarea" rows="5"
              value={cv.workExp}
              onChange={(e) => setCv({...cv, workExp: e.target.value})}
              placeholder={userInfo?.userCV?.workExp}
                ></textarea>
            </div>
          </div>
          <div class="field">
            <label class="label">My skills <span className="required">(required)</span></label>
            {/*{bonusSkillsError && (
              <span className="error-text has-text-danger has-text-light">
                Bonus skills must be more than 30 chars
              </span>
            )}*/}
            <div class="control">
              <textarea class="textarea" rows="5"
              value={cv.mySkills}
              onChange={(e) => setCv({...cv, mySkills: e.target.value})}
              placeholder={userInfo?.userCV?.mySkills}
                ></textarea>
            </div>
          </div>
          </>
        )}
        <button className="button is-link" type="submit">Update Profile</button>
          </form>
      </div>
    </>
  )
}

export default UpdateProfile;