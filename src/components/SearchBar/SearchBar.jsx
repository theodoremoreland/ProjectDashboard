import React, { useState, useContext, useCallback, useEffect } from 'react';

// Third party
import { debounce } from 'lodash';
import Fuse from 'fuse.js';

// Context
import { ProjectsContext } from '../../contexts/ProjectsContext';

// Styles
import './SearchBar.css';


const SearchBar = () => {
    const { repos, setSelectedProject } = useContext(ProjectsContext);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState(repos);

    const handleSearchResultClick = useCallback((projectData) => {
      setSearchValue('');
      setSelectedProject(projectData);
    }, [setSelectedProject]);

    useEffect(() => {
      if (searchValue && repos) {
        const fuse = new Fuse(repos, {
          keys: ['name', 'topics'],
          threshold: 0.3
        });
        const results = fuse.search(searchValue);
        setSearchResults(results);
      }

    }, [searchValue, repos]);

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
              searchResults ? searchResults
                .map((searchResult) => {
                  const repo = searchResult.item;
                  return <li
                          key={repo.name}
                          className='search-result'
                          onClick={() => handleSearchResultClick(repo)}
                        >
                          <p className='title'>{repo.name}</p>
                          <div className='topics'>
                            {repo.topics.map((topic) => <span key={topic} className='topic'>{topic}</span>)}
                          </div>
                        </li>
                })
                : <li className='search-result'>No results found</li>
            }
          </ul>
          }
        </div>
    )
}

export default SearchBar;