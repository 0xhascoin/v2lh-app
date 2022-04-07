import React from "react";
import { FiPhoneCall } from 'react-icons/fi'
import { HiPhoneMissedCall } from 'react-icons/hi'

const RoomHeader = () => {
  return (
    <div id="header" className="columns is-vcentered">
      <img
        className="column is-2 logo-col"
        src="https://vuejobs.com/storage/avatars/jckxh3800Lv2L2ijfiz5GhVQCkFaThbW5kl2tmHd.png"
      />
      <div className="column content-col">
        <h2 className="job-title">Senior Front-End Developer</h2>
        <p className="company-details">
          at <span className="company-name">Tyk Technologies</span>
        </p>
      </div>
      <div className="column call-col is-3 has-text-centered">
        <button className="button is-primary mx-1 my-1">Start call</button>
        <button className="button is-primary mx-1 my-1">
          <FiPhoneCall />
        </button>
        <button className="button is-danger mx-1 my-1">
          <HiPhoneMissedCall />
        </button>
      </div>
    </div>
  );
};

export default RoomHeader;
