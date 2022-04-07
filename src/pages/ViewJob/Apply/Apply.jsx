import React, {useState, useEffect} from 'react';
import './apply.scss';
import {addIntToFavs, getUserFavs, getAUser} from '../../../actions/userActions';
import {addToApplications, getAllInterviews} from '../../../actions/interviewActions';

import { useDispatch, useSelector } from "react-redux";

const Apply = ({id, date, time, jobId, job}) => {
  // const [apply, setApply] = useState(null);

  const [showDates, setShowDates] = useState(false)
  const dispatch = useDispatch();

  const userFavsList = useSelector((state) => state.userFavsList);
  const { interviews } = userFavsList;

  const oneInterview = useSelector((state) => state.oneInterview);
  const { interview } = oneInterview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getUser = useSelector((state) => state.getUser);
  const { user } = getUser;

  const hasThisUserApplied = useSelector((state) => state.hasThisUserApplied);
  const { userApplied } = hasThisUserApplied;
  const [applied, setApplied] = useState(userApplied);
  
  // useEffect(() => {
  //   dispatch(getUserFavs(userInfo?._id))
  // }, [setApply]);

  console.log(userApplied, "userApplied")

  const checkIfApplied = () => {
    console.log("This interview ID: ", id)
    interviews?.map((eachJob) => {
      if(id == eachJob._id) {
        setApplied(true);
        console.log("APPLIED");
      }
    })
  };
  
  // useEffect(() => {
  //   // console.log("One Interview: ", interview[0]._id)
  //   // console.log("Interviews: ", interviews);
  //   interviews?.map((eachJob) => {
  //     if(id == eachJob?._id) {
  //       setApply(true);
  //       console.log("APPLIED");
  //     }
  //   })
  // },[]);
  
  // useEffect(() => {
  //   dispatch(getAllInterviews());
  // },[addToApplications]);


  const applyToJob = (likedInterview) => {
      // console.log(userInfo, "UserInfo ApplyToJob")
      // dispatch(await getUserFavs(userInfo._id));
    const data = { likedInterview, userId: userInfo._id };
    setApplied(true);
    dispatch(addIntToFavs(data));
    dispatch(addToApplications(likedInterview._id, user)); 
  };

  
  
  return (
    <div className="column actions-col">
    <div className="apply-container">
      <h2 className="apply-title">Apply here</h2>
      {userInfo ? (
        <>
        {userInfo?.userType.toLowerCase() != "employer" && (
          <>
            {userApplied || applied ? (
              <p>
                You already applied!
              </p>
            ): (
            <button className="button"
            onClick={() => applyToJob(job)}>
            Apply here!
            </button>
            )}
          </>
        )}
        </>
      ) : (
        <button className="button" disabled>
          Log in to apply
        </button>
      )}
      <button className="button interviews-button"
      onClick={() => setShowDates(!showDates)}>{showDates ? "Hide" : "View"} Interview Dates</button>
      {showDates && (
        <div className="interview-dates">
          {date} - {time}
        </div>
      )}
      </div>
    </div>
  )
}

export default Apply;