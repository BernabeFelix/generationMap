import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

const MenuBar = () => {
  return (
    <AppBar
      title="Generation Stores Map"
      iconElementLeft={
        <IconButton onClick={() => console.log('open menu')}>
          <NavigationMenu />
        </IconButton>
      }
    />
  );
};

export default MenuBar;
