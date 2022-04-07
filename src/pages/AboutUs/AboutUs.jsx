import React from 'react';
import './aboutUs.scss';

// Components
import Navbar from '../../components/Navbar/Navbar';
import Hero from './Hero/Hero';
import WhoSection from './WhoSection/WhoSection';
import Benefits from './Benefits/Benefits';
import HiringSection from './HiringSection/HiringSection';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <Navbar />
      <Hero />
      <WhoSection />
      <Benefits />
      <HiringSection />
    </div>
  )
};


export default AboutUs;