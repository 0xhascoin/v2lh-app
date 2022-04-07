import React, { useState, useEffect } from 'react';
import './job.scss';

import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addIntToFavs, getUserFavs } from "../../../actions/userActions";




const Job = ({ eachJob, expandJob, jobExpanded, page, url }) => {
  // const dispatch = useDispatch();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const interviewList = useSelector((state) => state.interviewList);
  const { interviews } = interviewList;

  // const addIntToFavsHandler = (likedInterview) => {
  //   const data = { likedInterview, userId: userInfo._id }
  //   dispatch(addIntToFavs(data));
  // };

  // useEffect(() => {
  //   // console.log(userInfo.name)
  //   if (userInfo) {
  //     dispatch(getUserFavs(userInfo._id));
  //   }
  // }, [dispatch]);

  const print = (id) => {
    if (interviews && eachJob) {
      // console.log(interviews[0].likedInterview._id, id)
    }
  }


  return (
      <Link 
        to={url}>
        <div className="columns single-job is-vcentered">
          <img
            className={page == "interview" ? "column is-2 logo-col small" : "column is-2 logo-col"} 
            src={eachJob.companyLogo} 
            />
          <div className="column content-col">
            <p className="job-level has-text-centered">
              {eachJob.jobLevel} 
            </p>
            <h2 className="job-title">{eachJob.jobTitle}</h2>
            <p className="company-details">
              at <span className="company-name">{eachJob.companyName}</span>
              - Remote
              {page != "interview" && (
          
                <span className="application-count">
                  {eachJob?.applicationsCount} Applications
                </span>
              )}
                <span className="application-count">
                  {eachJob?.date}
                </span>

            </p>
            {page != "interview" && (
          
            <p className="company-description">
              {eachJob.companyDescription.length > 150 ? (
                eachJob.companyDescription.substring(0,250) + "...."
              ): (
                eachJob.companyDescription + "...."
              )}
            </p>
            )}
            {page != "interview" && (
          
            <p className="job-length">
              {numberWithCommas(eachJob.minSalary)} - {eachJob.currency}
            </p>
            )}
          </div>
        </div>
        </Link>
  )
};

export default Job;