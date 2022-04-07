import React, {useState, useEffect} from 'react';
import './findJobs.scss';
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import { getIsUserProfileUpdated } from '../../actions/userActions';

import './loader.css';

import Job from './Job/Job';
import Hero from './Hero/Hero';
import NewHero from './NewHero/NewHero';

const FindJobs = () => {
  // const result = interviews?.filter(search);
  const [jobExpanded, setJobExpanded] = useState(0);
  const [show, setShow] = useState(null);
  const [search, setSearch] = useState("");
  
  const dispatch = useDispatch();
  // Get the interviews stored in redux state
  const interviewList = useSelector((state) => state.interviewList);
  const { loading, interviews, error } = interviewList;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const [filteredInterviews, setFilteredInterviews] = useState(interviews);
  


  const expandJob = (job) => {
    job == jobExpanded ? setJobExpanded(0) : (
      setJobExpanded(job)
    )
  };

  const searchHandler = (searchText) => {
    let result = [];
    if(interviews) {
      let filteredData = interviews.filter(function(obj) {
        let title = obj.jobTitle.toString();
        title.toLowerCase().includes(searchText.toLowerCase()) && result.push(obj);
      });
    }
    setFilteredInterviews(result);
  }

  
  useEffect(() => {
    if(userInfo?.userType.toLowerCase() == "user") {
      dispatch(getIsUserProfileUpdated(userInfo?._id));
    }
  }, []);
    
  return (
    <div className="jobs-column">
      <NewHero 
        search={search} 
        setSearch={setSearch} 
        searchHandler={searchHandler}
        />

      <div className="jobs-container">
        {
          filteredInterviews?.length > 0 ? (
            <>
              {filteredInterviews?.map((interview) => (
                <Job 
                  eachJob={interview} 
                  expandJob={expandJob}
                  jobExpanded={jobExpanded}
                  key={interview?._id}
                  url={`/jobs/${interview._id}`}
                  />
              ))}
            </>
          ) : (    
          <>
            {interviews ? (    
              <>
              {
                interviews?.map((interview) => (
                  <Job 
                    eachJob={interview} 
                    expandJob={expandJob} 
                    jobExpanded={jobExpanded} 
                    key={interview._id} 
                    url={`/jobs/${interview._id}`}
                    />
                ))
              }
              </>
            ) : (
              <div className="has-text-centered">
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </>
          )
        }
      </div>
      </div>
  )
}

export default FindJobs;
