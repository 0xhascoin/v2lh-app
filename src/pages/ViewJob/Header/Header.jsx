import React from 'react';
import './header.scss';

const Header = ({companyLogo, companyName, jobTitle}) => {
  return (
    <div id="header" className="columns is-vcentered">
      <img className="column is-2 logo-col" src={companyLogo} />
       <div className="column content-col">
            <h2 className="job-title">{jobTitle}</h2>
            <p className="company-details">
              at <span className="company-name">{companyName}</span>
            </p>
          </div>
    </div>
  )
}

export default Header;