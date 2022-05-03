import React from 'react';
import './workExp.scss';

import {AiTwotoneCalendar} from 'react-icons/ai'

const workExp = [
  {
    "jobTitle": "Front-end Developer",
    "companyName": "Facebook",
    "started": "12-06-2021",
    "ended": "12-06-2022",
    "shortDesc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
  },
  {
    "jobTitle": "Front-end Developer",
    "companyName": "Facebook",
    "started": "12-06-2021",
    "ended": "12-06-2022",
    "shortDesc": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
  },
]

const WorkExp = ({ darkTheme }) => {
  return (
    <div className={darkTheme ? "work-exp dark" : "work-exp"}>
      <h2 className="work-exp-title">
        Work Experience
        <hr />
      </h2>
      {workExp?.map((work) => (
      <div className="work-exp-example">
        <h2 className="example-title">
          {work.jobTitle}
        </h2>
        <p className="company-name">
          {work.companyName}
        </p>
        <p className="date">
          <AiTwotoneCalendar />
          <span className="mx-1" />          
          {work.started} - {work.ended}</p>
        <p className="short-desc">
          {work.shortDesc}
        </p>
      </div>
      ))}
    </div>
  )
};

export default WorkExp;