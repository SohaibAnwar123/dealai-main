import React from 'react';
import './SearchBar.css';
import SearchIcon from '../../assets/svg/searchIcon';

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <input type="text" placeholder="Search" className="search-input" />
    <SearchIcon/>
    </div>
  );
};

export default SearchBar;
