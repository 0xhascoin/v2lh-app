import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getAllInterviews } from '../../actions/interviewActions';
import { getIsUserProfileUpdated } from '../../actions/userActions';

// Components
import Navbar from '../../components/Navbar/Navbar';
import FindJobs from '../../components/FindJobs/FindJobs';

const HomePage = () => {

  const [jobExpanded, setJobExpanded] = useState(0);
  const [show, setShow] = useState(null);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  
    // Get the interviews stored in redux state
  const interviewList = useSelector((state) => state.interviewList);
  const { loading, interviews, error } = interviewList;


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {
    dispatch(getAllInterviews());
    // dispatch(getIsUserProfileUpdated(userInfo?._id));
  }, []);
  
  useEffect(() => {
    dispatch(getAllInterviews());
    console.log("Get all")
    // dispatch(getIsUserProfileUpdated(userInfo?._id));
  }, [dispatch]);


  
  return(
    <>
    <Navbar />
    <FindJobs />
    </>
  )
};

export default HomePage;