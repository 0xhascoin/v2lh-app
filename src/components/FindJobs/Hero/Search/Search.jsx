import React, {useState} from 'react';
import './search.scss';

const Search = ({search, setSearch, searchHandler}) => {


  const clearSearch = () => {
    setSearch("");
    searchHandler("")
  }
  return (
    <>
    <div className="columns search is-vcentered">
    <div className="column is-1 icon-col">
      <i className="fas fa-search"></i>
    </div>
    <div className="column search-col">
      <input className="input" type="text" placeholder="Job title or keyword" onChange={(e) => setSearch(e.target.value)}
      value={search} />
    </div>
    <div className="column is-3 button-col has-text-centered">
      <button className="button clear-button" onClick={clearSearch}>Clear</button>
      <button className="button search-button" onClick={() => searchHandler(search)}>Search</button>
    </div>
    </div>
    </>
  )
};

export default Search;