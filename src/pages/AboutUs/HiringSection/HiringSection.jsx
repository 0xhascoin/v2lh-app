import React from 'react';
import './hiringSection.scss';

import screenshot from './screenshot.png';

const HiringSection = () => {
  return (
    <div className="columns hiring-section is-vcentered">
      <div className="column is-5">
        <h1 className="title">
          Designed and built for virtual interviewing
        </h1>
        <p className="subtitle">
          With no apps to download or links to manage, Live Hire provides a seamless virtual interview experience for employers and candidates alike.
        </p>
      </div>
      <div className="column">
      <img src={screenshot} className="col-img" />
      </div>
    </div>
  )
};

export default HiringSection;