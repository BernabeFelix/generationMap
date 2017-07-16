import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

const Header = ({ toggleMenu }) => {
  return (
    <MuiThemeProvider>
      <AppBar
        title="Generation Stores Map"
        iconElementLeft={
          <IconButton onClick={toggleMenu}>
            <NavigationMenu />
          </IconButton>
        }
      />
    </MuiThemeProvider>
  );
};

export default Header;
