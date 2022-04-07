import React from 'react';
import './jobDetails.scss';

const JobDetails = ({companyDescription, jobDetails, key}) => {
  return (
  <div className="column is-8 job-details-col">
          <h1 className="company-description-title">
            Company description
      </h1>
          <p className="company-description-text">
            {companyDescription}
        
    <br /> <br />

      
      </p>
          <br />
          <h1 className="company-description-title">
            Job description
      </h1>
          <p className="company-description-label">
            Responsibilities
      </p>
      <br />
          <p className="company-description-text">

            {jobDetails.responsibilities}
        
      </p>
          <br /> <br />
          <p className="company-description-label">
            Requirements
      </p>
      <br />
          <p className="company-description-text">

           {jobDetails.requirements}
        
      </p>
          <br /> <br />
          <p className="company-description-label">
            Bonus skills
      </p> <br />
          <p className="company-description-text">

            {jobDetails.bonusSkills}
        
      </p>

        </div>
  )
}

export default JobDetails;