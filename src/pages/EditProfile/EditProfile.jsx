import React, {useState} from 'react';
import './editProfile.scss';
import { useSelector, useDispatch } from "react-redux";
import {updateUsersCV} from '../../actions/userActions'


// Components
import Navbar from '../../components/Navbar/Navbar';
import WorkExperience from './WorkExperience/WorkExperience';
import Education from './Education/Education';

const EditProfile = () => {

  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    title: "",
    aboutMe: "",
    twitterUrl: "",
    githubUrl: ""
  });

  const [error, setError] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    console.log("Updating Profile")
    if(userDetails.title == "" ||
      userDetails.aboutMe == "" ||
      userDetails.twitterUrl == "" ||
      userDetails.githubUrl == "") {
      setError(true);
      } else {
        setError(false);
      dispatch(await updateUsersCV(userInfo?._id, userDetails.title, userDetails.aboutMe, userDetails.twitterUrl, userDetails.githubUrl))
      }
  }
  
  return (
    <>
      <Navbar />
        <div className="edit-profile-page">
          <form className="form">
          {error && (
            <p className="has-text-danger subtitle">
              Please fill in all the details
            </p>
          )}
          <h1 className="title">{userInfo?.name}</h1>
          <div className="field my-5">
            <label className="label">Professional title</label>
            <div className="control">
              <input 
              className="input" 
              type="text"
              placeholder="Frontend developer, Full-stack, etc"
                value={userDetails.title}
                onChange={(e) => setUserDetails({...userDetails, title: e.target.value})}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Describe yourself</label>
            <label className="label label-subtitle">
            Introduce yourself with enthusiasm in a few lines and do not forget to make a list of the different projects in which you can work, the methodologies you use, your technical skills and even the deliverables that you can show.
            </label>
            <div className="control">
              <textarea 
              className="textarea"
              placeholder="Describe yourself"
              value={userDetails.aboutMe}
                onChange={(e) => setUserDetails({...userDetails, aboutMe: e.target.value})}></textarea>
            </div>
          </div>
           <div className="columns">

          <div className="field column is-4">
            <label className="label">Twitter url </label>
            <div className="control has-icons-left" style={{ minWidth: "100%" }}>
            <input 
              className="input" 
              type="text"
              placeholder="Twitter Link"
              value={userDetails.twitterUrl}
                onChange={(e) => setUserDetails({...userDetails, twitterUrl: e.target.value})}
              />
              <span className="icon is-small is-left">
                <i className="fab fa-twitter"></i>
              </span>
            </div>
          </div>
          <div className="field column is-4">
            <label className="label">GitHub Link </label>
            <div className="control has-icons-left" style={{ minWidth: "100%" }}>
            <input 
              className="input" 
              type="text"
              placeholder="Github Link"
              value={userDetails.githubUrl}
                onChange={(e) => setUserDetails({...userDetails, githubUrl: e.target.value})}
              />
              <span className="icon is-small is-left">
                <i className="fab fa-github"></i>
              </span>
            </div>
          </div>
        </div>
          <hr />
          <WorkExperience />
          <hr />
          <Education />
          <hr />
        <div className="submit-profile-box">    
          <button className="button submit-profile-button" type="button"
            onClick={updateProfileHandler}>
            Update profile
          </button>
        </div>
      </form>
    </div>
    </>
  )
};

export default EditProfile;