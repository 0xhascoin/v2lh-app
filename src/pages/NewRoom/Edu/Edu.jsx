import React from "react";
import "./edu.scss";

import { AiTwotoneCalendar } from "react-icons/ai";
import { FaUniversity } from "react-icons/fa";

const userEdu = [
  {
    course: "Computer Science",
    university: "DeMontfort University",
    from: "10-01-2020",
    till: "10-01-2022",
  },
];

const Edu = ({ darkTheme }) => {
  return (
    <div className={darkTheme ? "work-exp dark" : "work-exp"}>
      <h2 className="work-exp-title">
        Education
        <hr />
      </h2>
      {userEdu?.map((edu) => (
        <div className="work-exp-example">
          <h2 className="example-title">{edu.course}</h2>
          <p className="company-name">
            <FaUniversity />
            <span className="mx-1" />
            {edu.university}
          </p>
          <p className="date">
            <AiTwotoneCalendar />
            <span className="mx-1" />
            {edu.from} - {edu.till}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Edu;
