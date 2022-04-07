import React from 'react';
import './workExp.scss';

const WorkExp = ({user}) => {
  console.log(user, "User")
  return (
    <div className="work-exp">
      <h2 className="work-exp-title">
        Work Experience
        <hr />
      </h2>
      {user?.workExp?.map((work) => (
      <div className="work-exp-example">
        <h2 className="example-title">
          {work.jobTitle}
        </h2>
        <p className="company-name">
          {work.companyName}
        </p>
        <p className="date">{work.started} - {work.ended}</p>
        <p className="short-desc">
          {work.shortDesc}
        </p>
      </div>
      ))}
    </div>
  )
};

export default WorkExp;