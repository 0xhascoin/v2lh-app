import React, {useEffect} from 'react';
import '../SavedJobs/savedJobs.scss'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllJobsUserAppliedTo } from "../../actions/userActions";
import { getAllUserInterviews } from '../../actions/interviewActions';



import Navbar from '../../components/Navbar/Navbar'
import Job from '../../components/FindJobs/Job/Job'

const Interviews = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getAllJobsAppliedTo = useSelector((state) => state.getAllJobsAppliedTo);
  const { jobsAppliedTo } = getAllJobsAppliedTo;

  const userInterviewList = useSelector((state) => state.userInterviewList);
  const { usersInterviews } = userInterviewList;

  useEffect(() => {
    if(!userInfo) {
      history.push('/');
    }

    if(userInfo?.userType.toLowerCase() == "user") {
      dispatch(getAllJobsUserAppliedTo(userInfo?._id));
    } else if(userInfo?.userType.toLowerCase() == "employer") {
      dispatch(getAllUserInterviews(userInfo?._id));
    }
  }, []);

  // console.log(jobsAppliedTo, "jobsAppliedTo")

  
  return (
    <div>
      <Navbar />
      <div className="saved-interviews">
        {jobsAppliedTo || usersInterviews ? (
          <>
          {userInfo?.userType.toLowerCase() == "user" ? (
            <div className="jobs-container">
              {jobsAppliedTo?.map((interview) => (
                <Job 
                  eachJob={interview} 
                  key={interview?._id}
                  page="interview"
                  url={`/interview/${interview?._id}`}
                    />
                  
              ))}
            </div>
          ): (
            <div className="jobs-container">
            {usersInterviews?.map((interview) => (
              <Job 
                eachJob={interview} 
                key={interview?._id}
                page="interview"
                url={`/interview/${interview?._id}`}
                  />
                
            ))}
          </div>
          )}          
          </>
        ) : (
          <div className="has-text-centered">
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
      )}
      </div>
    </div>
  )
};

export default Interviews;