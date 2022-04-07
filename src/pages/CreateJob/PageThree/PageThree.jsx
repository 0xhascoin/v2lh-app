import React, {useEffect} from 'react';
import './pageThree.scss';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {createInterviewAction} from "../../../actions/interviewActions";

const PageThree = ({page, setPage, job}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {
  //   // If the user is not logged in OR they are not an Employer, push to the home page
  //   if (!userInfo || userInfo.userType !== "employer") {
  //     history.push("/");
  //   }
  // }, []);


  const createInterview = async (e) => {
    e.preventDefault();
    dispatch(
        await createInterviewAction(
          job.companyName,
          job.companyLogo,
          job.companyDescription,
          job.jobTitle,
          job.jobLength,
          job.jobLevel,
          job.jobDetails,
          job.currency,
          job.minSalary,
          userInfo.name,
          job.date,
          job.time,
        )
      );
      setPage(page+1);
  }

  return (
    <div className="page-three" id="page-three">
      <h1 className="page-two-title">Job Preview</h1>
      <p className="page-two-subtitle has-text-left"><hr />
        Check out how your job will look like. <br />
      </p>
      <form className="form has-text-left">
        <div className="field my-5">
          <label className="label" style={{ fontSize: "30px" }}>Job description</label>
          <hr />
          <label className="label">{job.jobTitle} - <span className="tag is-light">{job.jobLength}</span></label>
          <span className="tag is-info is-light" style={{marginBottom: '20px'}}>
            &#128197; {job.date} - {job.time}
          </span>
          <span className="tag is-warning is-light" style={{marginBottom: '20px', marginLeft: '10px'}}>
            {job.currency == "USD" && "$"} 
            {job.currency == "GBP" && "£"} 
            {job.currency == "EUR" && "EUR"} {job.minSalary} +
          </span>
          <label className="label">Responsibilities</label>
          <label className="label"><span className="required">{job.jobDetails.responsibilities}</span></label>
      
          <label className="label">Essential Skills & Requirements</label>
          <label className="label"><span className="required">{job.jobDetails.requirements}</span></label>

          <label className="label">Bonus Skills </label>
          <label className="label"><span className="required">{job.jobDetails.bonusSkills}</span></label>
        </div>
      </form>
      <button className="button is-primary back-button" onClick={() => setPage(page-1)}
      style={{backgroundColor: "#03071e", fontSize: ".9rem"}}>Go back</button>
      <button className="button is-primary next-button" onClick={(e) => createInterview(e)}
      style={{backgroundColor: "#03071e", fontSize: ".9rem"}}>Next</button>
    </div>
  )
};

export default PageThree;