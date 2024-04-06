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

        results.sort((a, b) => {
          return a.refIndex - b.refIndex;
        });

        setSearchResults(results);
      }

    }, [searchValue, repos]);

    return (
        <div id="search-bar">
          <input
            id="search"
            type="text"
            placeholder="Search..."
            autoComplete="off"
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
                  const matchingTopics = new Fuse(repo.topics, {
                    threshold: 0.3
                  });
                  const topics = matchingTopics.search(searchValue);

                  return <li
                          key={repo.name}
                          className='search-result'
                          onClick={() => handleSearchResultClick(repo)}
                        >
                          <p className='title'>{repo.name}</p>
                          <img src={repo.image} alt={repo.name} />
                          <div className='topics'>
                            {topics.length > 0
                              ? topics.map((topicResult) => {
                                  const topic = topicResult.item;
      
                                  return <span key={topic} className='topic'>{topic}</span>;
                                })
                              : <p>No matching topics</p>}
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