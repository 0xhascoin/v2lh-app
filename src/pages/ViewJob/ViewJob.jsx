import React, {useEffect, useState} from 'react';
import './viewJob.scss';
import { withRouter, Link } from "react-router-dom";
import {addIntToFavs, getUserFavs, getAUser} from '../../actions/userActions';
import { getOneInterview, hasUserApplied } from "../../actions/interviewActions";
import { useDispatch, useSelector } from "react-redux";

import Navbar from '../../components/Navbar/Navbar';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import JobDetails from './JobDetails/JobDetails';
import Apply from './Apply/Apply';

const ViewJob = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();

  const oneInterview = useSelector((state) => state.oneInterview);
  const { interview } = oneInterview;

  const userFavsList = useSelector((state) => state.userFavsList);
  const { interviews } = userFavsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getUser = useSelector((state) => state.getUser);
  const { user } = getUser;
  
  

  

  useEffect(() => {
    dispatch(getOneInterview(props.match.params.id));
      if(userInfo?.userType.toLowerCase() == "user") {
        dispatch(hasUserApplied(
          props.match.params.id, userInfo?._id));
        // dispatch(getUserFavs(userInfo?._id));
        dispatch(getAUser(userInfo?._id));
        // console.log("User favs loaded.")
      }
  },[]);

  return (
    <>
    <Navbar />
    {interview ? (
      <>
        {interview?.map((int) => (

          <div key={int._id}>
            <Header companyLogo={int.companyLogo} companyName={int.companyName} jobTitle={int.jobTitle}/>
            <Banner jobLevel={int.jobLevel} jobLength={int.jobLength}/>
            <div className="columns job-details-container">
              <JobDetails companyDescription={int.companyDescription} jobDetails={int.jobDetails}/>
                <Apply 
                  date={int.date} 
                  time={int.time} 
                  jobId={int._id}
                  job={int}
                  id={id}
                 />
            </div>
          </div>
        ))}
      </>
    ) : (
      <div className="has-text-centered">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
    )}

    </>
  )
}

export default withRouter(ViewJob);