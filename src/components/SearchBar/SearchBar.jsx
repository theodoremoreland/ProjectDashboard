import React, { useState, useContext } from 'react';

// Context
import { ProjectsContext } from '../../contexts/ProjectsContext';

// Styles
import './SearchBar.css';


const SearchBar = () => {
    const { repos } = useContext(ProjectsContext);
    const [searchValue, setSearchValue] = useState('');


    return (
        <div id="search-bar">
          <input
            id="search"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      

    )
}

export default SearchBar;