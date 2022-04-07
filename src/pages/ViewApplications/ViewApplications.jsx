import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import './viewApplications.scss';

import { getAllUsersThatApplied } from '../../actions/interviewActions'

import Navbar from '../../components/Navbar/Navbar';

const ViewApplications = (props) => {
  const id = props.match.params.id;
  const [allApplications, setAllApplications] = useState([]);
  const [jobExpanded, setJobExpanded] = useState("");

  const userLogin = useSelector((state) => state.userLogin);  
  const { userInfo } = userLogin;


  const dispatch = useDispatch();
  
  const getUsersThatApplied = useSelector((state) => state.getUsersThatApplied);
  const { usersThatApplied } = getUsersThatApplied;

  useEffect(() => {
    dispatch(getAllUsersThatApplied(id));
  }, []);

  console.log(usersThatApplied, "Users that applied")

  const toggleJobExpanded = (app) => {
    if(jobExpanded == app) {
      setJobExpanded("");
    } else {
      setJobExpanded(app);
    }
  }
  
  return (
    <div>
    <Navbar />
    {usersThatApplied?.map((application) => (
      <div className="application" key={application?._id}>
      <div className="columns application-row is-vcentered">
        <div className="column is-1 icon-col has-text-centered">
          <p>
            {application?.name.substring(0,1)}
          </p>
        </div>
        <div className="column text-col">
          <>
          <p>{application?.name}</p>
          <p className="socials">
            <a href={`http://twitter.com/${application?.userCV.twitterUrl}`}><i className="fab fa-twitter"></i></a>
            <a href={`http://github.com/${application?.userCV.githubUrl}`}><i className="fab fa-github"></i></a>
          </p>
          </>
        </div>
        <button type="button" className="column is-1 expand-col has-text-centered"
          onClick={() => toggleJobExpanded(application?._id)}
          >
          Expand
        </button>
      </div>
        
        
      {jobExpanded == application?._id && (      
        <div className="expand">
          <div className="about-me-section">
            <h1 className="about-me-title">About me</h1>
            <p className="about-me-desc">
              {application?.userCV.aboutMe}
            </p>
          </div>
          <div 
          style={{
            boxShadow: '0 8px 30px rgb(0 29 54/5%)',
          height: '10px', marginBottom: '20px',
          borderRadius: '20px', backgroundColor: '#f8f9fa'}}>
          </div>
          <div className="expand-workexp" >
            <p>Work experience</p>
            {application?.workExp?.map((work, index) => (
              <div className="example-job" key={index}>
                <h1 className="example-job-company">{work.companyName}</h1>
                <h3 className="example-job-title">{work.jobTitle}</h3>
                <p className="example-job-desc">{work.shortDesc}</p>
                <p className="length-worked">
                  <span><i className="fas fa-calendar"></i></span>
                  <span className="mx-2">{work.started} - {work.ended}</span>
                </p>
              </div>
            ))}
          </div>
          
          <div className="expand-workexp">
            <p>Education</p> 
            {application?.userEdu?.map((edu, index) => (
              <div className="example-job" key={index}>
                <h1 className="example-job-company">{edu.university}</h1>
                <h3 className="example-job-title">{edu.course}</h3>
                <p className="length-worked">
                  <span><i className="fas fa-calendar"></i></span>
                  <span className="mx-2">{edu.from} - {edu.till}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

        
      </div>
      ))}
    </div>
  )
};

export default withRouter(ViewApplications);