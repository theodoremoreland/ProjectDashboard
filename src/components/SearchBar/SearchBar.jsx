import React, { useState, useContext, useCallback, useEffect, useRef } from 'react';

// Third party
import Fuse from 'fuse.js';

// Context
import { ProjectsContext } from '../../contexts/ProjectsContext';

// Images
import { ReactComponent as CancelIcon } from '../../images/cancel.svg';

// Styles
import './SearchBar.css';


const SearchBar = () => {
    const { repos, setSelectedProject } = useContext(ProjectsContext);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState(repos);
    const [showResults, setShowResults] = useState(false);
    const inputRef = useRef(null);

    const handleSearchResultClick = useCallback((projectData) => {
      setSearchValue('');
      setSelectedProject(projectData);
    }, [setSelectedProject]);

    const handleCancelClick = useCallback(() => {
      setSearchValue('');
      inputRef?.current?.focus();
    }
    , [inputRef]);

    useEffect(() => {
      const hasFocus = inputRef?.current === document.activeElement;

      if (hasFocus && searchValue && repos) {
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
      <>
        {searchValue && <div id="clickaway-area" onClick={() => setSearchValue("")}></div> }
        <div id="search-bar">
          <input
            ref={inputRef}
            id="search"
            type="text"
            placeholder="Search..."
            autoComplete="off"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && <span id='delete' onClick={handleCancelClick}>
            <CancelIcon className='icon' />
          </span>}
          {
            searchValue &&
            <ul id='search-results'>
            {
              searchResults?.length > 0 ? searchResults
                .map((searchResult) => {
                  const repo = searchResult.item;

                  if (!repo) {
                    return null;
                  }

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
                              : <p className='none'>No matching topics</p>}
                          </div>
                        </li>
                })
                : <li className='search-result'>No results found</li>
            }
          </ul>
          }
        </div>
      </>
    )
}

export default SearchBar;