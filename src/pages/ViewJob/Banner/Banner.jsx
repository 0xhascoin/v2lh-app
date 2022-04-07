import React from 'react';
import './banner.scss';

const Banner = ({jobLevel, jobLength}) => {
  return (
    <div className="columns banner has-text-centered">
    <div className="column is-2">
      <p className="banner-label">
        Location
      </p>
      <p className="banner-value">
        Remote
      </p>
      </div>
    <div className="column is-2">
      <p className="banner-label">
        Job Type
      </p>
      <p className="banner-value">
        {jobLength}
      </p>
      </div>
    <div className="column is-2">
      <p className="banner-label">
        Job Level
      </p>
      <p className="banner-value">
        {jobLevel}
      </p>
      </div>
    </div>
  )
}

export default Banner;