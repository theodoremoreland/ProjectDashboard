import React, { useEffect, useState, useRef } from 'react';

// Third party
import List from 'list.js';

// Styles
import './SearchBar.css';

var options = {
    valueNames: [
      'name',
      'born',
      { data: ['id'] },
      { name: 'timestamp', attr: 'data-timestamp' },
      { name: 'link', attr: 'href' },
      { name: 'image', attr: 'src' }
    ]
  };

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const hackerListRef = useRef(null);

    useEffect(() => {
        if (!hackerListRef.current) return;

        var hackerList = new List(hackerListRef.current, options);
  
        hackerList.add({
          name: 'Jonas',
          born: '1985',
          id: 2,
          timestamp: '1337',
          link: 'http://arnklint.com',
          image: 'jonas.gif'
        });
    }, []);

    return (
        <>
        <input type="text" id="search" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        <div id="hacker-list" ref={hackerListRef}>
        <ul className='list'>
        
        <li data-id="1">
            <a href="http://javve.com" class="link name">Jonny</a>
            <p class="born timestamp" data-timestamp="1234">1986</p>
            <img class="image" src="javve.jpg" />
        </li>
        </ul>
        </div>
        </>
      

    )
}

export default SearchBar;