import React, { useState, useContext, useCallback } from 'react';

// Context
import { ProjectsContext } from '../../contexts/ProjectsContext';

// Styles
import './SearchBar.css';


const SearchBar = () => {
    const { repos, setSelectedProject } = useContext(ProjectsContext);
    const [searchValue, setSearchValue] = useState('');

    const handleSearchResultClick = useCallback((projectData) => {
      setSearchValue('');
      setSelectedProject(projectData);
    }, [setSelectedProject]);

    return (
        <div id="search-bar">
          <input
            id="search"
            type="text"
            placeholder="Search by topic..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {
            searchValue &&
            <ul id='search-results'>
            {
              repos ? repos
                .map((repo) => 
                <li
                  key={repo.name}
                  className='search-result'
                  onClick={() => handleSearchResultClick(repo)}
                >
                  <p className='title'>{repo.name}</p>
                  <div className='topics'>
                    {repo.topics.map((topic) => <span key={topic} className='topic'>{topic}</span>)}
                  </div>
                </li>)
                : <li className='search-result'>No results found</li>
            }
          </ul>
          }
        </div>
    )
}

export default SearchBar;