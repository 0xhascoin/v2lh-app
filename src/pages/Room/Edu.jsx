import React from 'react';
import './edu.scss';

const Edu = ({ user }) => {
  return (
    <div className="work-exp">
      <h2 className="work-exp-title">
        Education
        <hr />
      </h2>
    {user?.userEdu?.map((edu) => (
      <div className="work-exp-example">
        <h2 className="example-title">
          {edu.course}
        </h2>
        <p className="company-name">
          {edu.university}
        </p>
        <p className="date">{edu.from} - {edu.till}</p>
      </div>
    ))}
    </div>
  )
};

export default Edu;