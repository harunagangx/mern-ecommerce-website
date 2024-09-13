import React, { Fragment, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
import './SearchBar.scss';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <form className="searchBox" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search...."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <span>
          <BiSearch size={20} />
        </span>
      </form>
    </Fragment>
  );
};

export default SearchBar;
