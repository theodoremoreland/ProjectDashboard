import { ReactElement, useState, useCallback } from 'react';

// MUI
import { IconButton, Menu, MenuItem } from '@mui/material';

// Components
import SearchBar from '../SearchBar/SearchBar';

// Images
import QueryStatsIcon from "../../images/query_stats.svg?react";
import HelpIcon from "../../images/help.svg?react";
import MenuIcon from "../../images/menu.svg?react";

// Styles
import './NavBar.css';

interface Props {
  setShowAnalytics: (show: boolean) => void;
  setShowHelpModal: (show: boolean) => void;
}

const NavBar = ({ setShowAnalytics, setShowHelpModal }: Props): ReactElement => {
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);

    const handleMobileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
      setMobileMenuAnchorEl(event.currentTarget);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
      setMobileMenuAnchorEl(null);
  }, []);

    return (
      <nav id="app-nav">
        <h1>Project List</h1>
        <SearchBar />
        <ul id='desktop-menu'>
          <li 
            id="analytics-nav"
            title='Analytics'
            role='presentation'
            onClick={() => setShowAnalytics(true)}
          >
            <QueryStatsIcon className="query_stats icon" />
          </li>
          <li
            id="nav-help"
            title='Help'
            role='presentation'
            onClick={() => setShowHelpModal(true)}
          >
            <HelpIcon className="help icon" />
          </li>
        </ul>
        <IconButton
                id="mobile-menu-icon"
                aria-label="menu"
                aria-controls={isMobileMenuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isMobileMenuOpen ? 'true' : undefined}
                onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
        </IconButton>
        <Menu
          id="mobile-menu"
          anchorEl={mobileMenuAnchorEl}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <MenuItem
            id="analytics-nav"
            title='Analytics'
            role='presentation'
            onClick={() => {
              setShowAnalytics(true);
              handleMobileMenuClose();
            }}
          >
            <QueryStatsIcon className="query_stats icon" />
          </MenuItem>
          <MenuItem
            id="nav-help"
            title='Help'
            role='presentation'
            onClick={() => {
              setShowHelpModal(true);
              handleMobileMenuClose();
            }}
          >
            <HelpIcon className="help icon" />
          </MenuItem> 
        </Menu>
      </nav>
    )
};


export default NavBar;
