import React from 'react';
import './whoSection.scss';

const WhoSection = () => {
  return (
    <div className="who-section">
    
      <h1 className="title">
        Get to know who's behind Live Hire
      </h1>
      <p className="subtitle">
        VueJobs has been developed by Vue.js and Laravel enthusiasts whose aim is to contribute to the growing community by helping companies find Vue.js talent around the world. When you register with Vue.js jobs, companies will be able to list jobs and developers will have the chance to apply for those jobs.
      </p>

      <div className="who-box">
        <h1 className="title">
          Adam Hasan
        </h1>
        <p className="subtitle">
        I'm a frontend/backend developer and UI designer.<br /> I have a deep interest in pixel perfect, user-centric design with a special focus on the user experience.
        </p>
      
      </div>
    
    
    </div>
  )
};

export default WhoSection;