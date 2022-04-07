import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getUserFavs, getAllJobsUserAppliedTo } from "../../actions/userActions";
import './savedJobs.scss'


import Job from "../../components/FindJobs/Job/Job"
import Navbar from "../../components/Navbar/Navbar"



const SavedJobs = () => {
  const [jobExpanded, setJobExpanded] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const userFavsList = useSelector((state) => state.userFavsList);
  
  const { userInfo } = userLogin;
  const { interviews: ints } = userFavsList;
  
  const getAllJobsAppliedTo = useSelector((state) => state.getAllJobsAppliedTo);
  const { jobsAppliedTo } = getAllJobsAppliedTo;

  const expandJob = (job) => {
    job == jobExpanded ? setJobExpanded(0) : (
      setJobExpanded(job)
    )
  };

  useEffect(() => {
    // console.log(userInfo.name)
    if (!userInfo || userInfo?.userType.toLowerCase() != "user") {
      history.push("/login");
    }  else {
      dispatch(getUserFavs(userInfo?._id))
      dispatch(getAllJobsUserAppliedTo(userInfo?._id))
    }
    ints && console.log(ints, "FAVS");
  }, []);

  if(ints?.length == 0) return "Loading..."
  
  return (
    <>
    <Navbar />
    <div className="column saved-interviews">
    <div className="hero">
      <h1>Saved Interviews</h1>
    </div>
        {jobsAppliedTo ? (
        <div className="jobs-container">
          {jobsAppliedTo?.map((interview) => (
            <Job eachJob={interview} jobExpanded={jobExpanded} expandJob={expandJob} key={interview?._id}
              page="saved"
              url={`/jobs/${interview._id}`}
                />
          ))}
        </div>
      ) : (
        <div className="has-text-centered">
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
      )}
    </div>
    </>
  )
}

export default SavedJobs;