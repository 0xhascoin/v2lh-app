import React from 'react';
import './benefits.scss';

const Benefits = () => {
  return (
    <div className="benefits-section">
      <h1 className="title has-text-centered">
        3 benefits of posting with us
      </h1>
      <div className="columns benefits-col has-text-centered">
        <div className="column">
          <h1 className="title">1</h1>
          <h2 className="benefit-reason">
            We promote your open roles
          </h2>
          <p className="subtitle">
            Count on one of the world’s most niche job site to help you attract the talent you need.
          </p>
        </div>
        <div className="column">
          <h1 className="title">2</h1>
          <h2 className="benefit-reason">
            You set an interview date
          </h2>
          <p className="subtitle">
            You set an interview date and our system gives every quality candidate an alert to attend on the date.
          </p>
        </div>
        <div className="column">
          <h1 className="title">3</h1>
          <h2 className="benefit-reason">
            You interview on Live Hire
          </h2>
          <p className="subtitle">
            Quickly interview dozens and rate your candidates all on Live Hire's proprietary solution built for interviewing.
          </p>
        </div>

      </div>
    </div>
  )
};

export default Benefits;