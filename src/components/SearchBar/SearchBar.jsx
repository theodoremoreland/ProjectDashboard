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
            placeholder="Search by topic..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <ul id='search-results'>
            {
              repos && repos
                .map((repo) => 
                <li key={repo.name} className='search-result'>
                  <p className='title'>{repo.name}</p>
                  <div className='topics'>
                    {repo.topics.map((topic) => <span key={topic} className='topic'>{topic}</span>)}
                  </div>
                </li>)
            }
          </ul>
        </div>
      

    )
}

export default SearchBar;