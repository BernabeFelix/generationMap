import React, { PropTypes } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BottomNavigation,
  BottomNavigationItem
} from 'material-ui/BottomNavigation';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

const FavoriteToggle = ({ store, toggleStoreToFavorites }) => {
  return (
    <MuiThemeProvider>
      <BottomNavigation selectedIndex={store.isFavorite ? 0 : -1}>
        <BottomNavigationItem
          label="Favorites"
          icon={<ActionFavorite />}
          onClick={toggleStoreToFavorites}
        />
      </BottomNavigation>
    </MuiThemeProvider>
  );
};

FavoriteToggle.propTypes = {
  store: PropTypes.object.isRequired,
  toggleStoreToFavorites: PropTypes.func.isRequired
};

export default FavoriteToggle;
