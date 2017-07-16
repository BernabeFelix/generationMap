import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

const Header = ({ height, toggleMenu }) => {
  return (
    <MuiThemeProvider>
      <AppBar
        iconElementLeft={
          <IconButton onClick={toggleMenu}>
            <NavigationMenu />
          </IconButton>
        }
        style={{ height }}
        title="Generation Stores Map"
      />
    </MuiThemeProvider>
  );
};

export default Header;
