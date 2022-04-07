import React, {useState, useEffect} from 'react';
import './workExperience.scss';
import {addUserWorkExp, getUserWorkExp, deleteUserWorkExp} from '../../../actions/userActions';

import { useDispatch, useSelector } from "react-redux";

// Components
import CreateForm from './CreateForm';

const WorkExperience = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const usersWorkExp = useSelector((state) => state.usersWorkExp);
  const { workExp } = usersWorkExp;
  
  const [showModal, setShowModal] = useState(false);
  const [newWorkExp, setNewWorkExp] = useState({
    companyName: "",
    jobTitle: "",
    shortDesc: "",
    started: "",
    ended: ""
  });

  const [error, setError] = useState(false);

  const addWorkExpHandler = async (e) => {
    e.preventDefault();

    if(newWorkExp.companyName == "" || 
       newWorkExp.jobTitle == "" ||
      newWorkExp.shortDesc == "" ||
      newWorkExp.started == "" || 
      newWorkExp.ended == "") {
      setError(true)
      console.log("Error should now be true")
    } else {
      setError(false);
        const data = { newWorkExp, userId: userInfo._id }
        // console.log(data, "DATA");
          dispatch(await addUserWorkExp(data));
        setShowModal(false);
        console.log("Added new WorkExp");
        setNewWorkExp({
          companyName: "",
          jobTitle: "",
          shortDesc: "",
          started: "",
          ended: ""
        });
        dispatch(getUserWorkExp(userInfo?._id));
    }

    

  }

  const deleteWorkExpHandler = async (e, thisWorkExp) => {
    e.preventDefault();
    const data = {thisWorkExp, userId: userInfo._id};
    dispatch(await deleteUserWorkExp(data));
    dispatch(getUserWorkExp(userInfo?._id));
  }

  useEffect(() => {
    dispatch(getUserWorkExp(userInfo?._id));
  }, [dispatch]);

  const closeModal = () => {
    setShowModal(false);
    setNewWorkExp({
    companyName: "",
    jobTitle: "",
    shortDesc: "",
    started: "",
    ended: ""
  });
    setError(false);
  }

  
  return (
    <div className="work-experience-section">
      <div className="field">
        <label className="label">Professional Experience</label>
        <label className="label label-subtitle">
           Let us know about your professional background, positions, companies... If you have been a freelancer or work on personal projects, include them here too.
        </label>
        {/* Example Job */}
        <div className="example-job">
          <h1 className="example-job-company">
            Example company name
          </h1>
          <h3 className="example-job-title">
            Example job title
          </h3>
          <p className="example-job-desc">
          Pellentesque in ipsum id orci porta dapibus. Nulla quis lorem ut libero malesuada feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
          </p>
          <p className="length-worked">
          <span><i className="fas fa-calendar"></i></span>
          <span className="mx-2">
          26/02/2020 - 26/04/2021
          </span>
          </p>
          {/*<p className="delete-work-exp">X</p>*/}
        </div>

        {
          workExp?.map((work) => (
          <div className="example-job" key={work.companyName}>
          <h1 className="example-job-company">
            {work.companyName}
          </h1>
          <h3 className="example-job-title">
            {work.jobTitle}
          </h3>
          <p className="example-job-desc">
          {work.shortDesc}
          </p>
          <p className="length-worked">
          <span><i className="fas fa-calendar"></i></span>
          <span className="mx-2">
          {work.started} - {work.ended}
          </span>
          </p>
            <p className="delete-work-exp" 
              onClick={(e) => deleteWorkExpHandler(e, work)}>
              X</p>
        </div>
          ))
        }


        {/* Add Work Experience */}
        <div className="add-section has-text-centered">
        <p className="subtitle">Add work experience</p>
        <button className="button add-new"
        onClick={() => setShowModal(true)}
        type="button">
          <span>
          <i className="fas fa-plus"></i>
          </span>
          <span className="mx-2">Add New</span>
        </button>
        </div>
        
        <div className={showModal ? "modal is-active" : "modal"}>
          <div className="modal-background"
          onClick={closeModal}></div>
          <div className="modal-card">
            <header className="modal-card-head has-text-centered">
              <p className="modal-card-title">
                Creating Company / Project
              </p>
              <button className="delete" aria-label="close"
              onClick={closeModal}
              type="button"></button>
            </header>
            <section className="modal-card-body">
            <CreateForm 
              newWorkExp={newWorkExp} 
              setNewWorkExp={setNewWorkExp}
              error={error}
              />
            </section>
            <footer className="modal-card-foot">
              <button className="button save-modal-button" onClick={addWorkExpHandler} type="button">Save changes</button>
              <button className="button cancel-modal-button"
              onClick={closeModal}
              type="button">Cancel</button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
};

export default WorkExperience;