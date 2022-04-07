import React, {useEffect} from 'react';
import '../SavedJobs/savedJobs.scss';
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import { getAllMyJobs } from '../../actions/userActions';
import { getAllUserInterviews } from '../../actions/interviewActions';

import Navbar from '../../components/Navbar/Navbar';
import Job from "../../components/FindJobs/Job/Job";

const MyJobs = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getMyJobs = useSelector((state) => state.getMyJobs);
  const { myJobs } = getMyJobs;

  const userInterviewList = useSelector((state) => state.userInterviewList);
  const { usersInterviews } = userInterviewList;
  
  useEffect(() => {
    if(userInfo?.userType.toLowerCase() != "employer") {
        history.push("/");
    }
    console.log(userInfo?._id, "USERINFO ID")
    dispatch(getAllUserInterviews(userInfo?._id));
  }, []);

  // useEffect(() => {
  //   dispatch(getAllUserInterviews(userInfo?._id));
  // }, [getAllMyJobs])

  return (
    <>
    <Navbar />
    <div className="column saved-interviews">
    <div className="hero">
      <h1>My Jobs</h1>
    </div>

    {usersInterviews ? (
        <div className="jobs-container">
          {usersInterviews?.map((interview) => (
            <Job eachJob={interview} key={interview._id}
            page="myjobs"
              url={`/jobs/${interview._id}/applications`}/>
          ))}
        </div>
      ) : (
        <div className="has-text-centered">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
      )}
    </div>
    </>
  )
};

export default MyJobs;