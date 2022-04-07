import React from 'react';
import './hero.scss';

// Components
import Search from './Search/Search';

const Hero = ({search, setSearch, searchHandler}) => {
  return (
    <section className="hero">
      <div className="hero-body">
        <p className="remote-subtitle">
          Remote jobs
        </p>
        <p className="remote-title">
          Remote jobs
        </p>
        <p className="info-text">
          Find your next remote job at companies like <span className="highlight">Intercom</span>, <span className="highlight">Spotify</span>, <span className="highlight">Square</span> and <span className="highlight">Twitter</span>
        </p>
        <Search search={search} setSearch={setSearch} searchHandler={searchHandler}/>
      </div>
    </section>
  )
}

export default Hero;