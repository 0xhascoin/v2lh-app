import React, {useState, useEffect} from 'react';
import './newHero.scss';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { getIsUserProfileUpdated } from '../../../actions/userActions';


const NewHero = ({search, setSearch, searchHandler}) => {
  const [showNotification, setShowNotification] = useState(false);
  const clearSearch = () => {
    setSearch("");
    searchHandler("")
  };
  const dispatch = useDispatch();

  const isUserProfileUpdated = useSelector((state) => state.isUserProfileUpdated);
  const { userProfileUpdated } = isUserProfileUpdated;
  const [profileUpdated, setProfileUpdated] = useState(userProfileUpdated);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
    
  return (
    <section className="hero">
      {userInfo && userProfileUpdated == false && (
      <> 
        {userInfo?.userType.toLowerCase() == "user" && profileUpdated == false && (   
          <Link to="/edit/account" className="columns update-profile-notification">
            <div 
              className="column notification-logo is-1">
            </div>
            <div 
              className="column notification-text">
              <p className="title">Update profile</p>
              <p className="subtitle">
                You need to update your profile details before               applying to a job.
              </p>
            </div>
            <div 
              className="column notification-button is-1 has-text-centered">
              ->
            </div>
          </Link>
        )}
      </>
      )}
      <div className="columns hero-body">
        <div className="column left-col is-6">
          <h1 className="left-col-title">
            Remote Web3 Jobs
          </h1>
          <p className="left-col-subtitle">
            Discover remote Web3 Jobs around the world at companies working on
            blockchain, smart contract, DeFi, NFT, crypto etc. Connect and hire
            remote workers in web3 space.
          </p>
          <input className="left-col-input input" type="text" placeholder="E.g. front-end developer, designer" 
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            />
          <div className="left-col-buttons">
            <button 
              className="button is-light"
              onClick={clearSearch}
              >
              Clear input
            </button>
            <button 
              className="button is-dark"
              onClick={() => searchHandler(search)}>
              Search job
            </button>
          </div>
        </div>
        <div className="column right-col">
          <img src="https://images.ctfassets.net/c5bd0wqjc7v0/5o0IbUnXunFKmiSC31gK6j/c9da092eda3ebc34941dfa3d107437f4/Type_Circles_4x.png?fl=progressive&q=100&w=560" className="hero-img" />
        </div>
      </div>
    </section>
  )
};

export default NewHero;