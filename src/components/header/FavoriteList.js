import React from 'react';

import StoreInfo from '../favorite_banner/StoreInfo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, Subheader } from 'material-ui';

const FavoriteStores = ({ stores }) => {
  const removeFromFavorites = () => {
    console.log('item deleted');
  };

  return (
    <div style={styles}>
      <MuiThemeProvider>
        <List>
          <Subheader style={{ fontFamily: 'Roboto, sans-serif' }}>
            My Favorite Stores
          </Subheader>
          {stores
            .filter(store => store.isFavorite)
            .map((store, i) =>
              <StoreInfo
                key={i}
                closeBanner={removeFromFavorites}
                store={store}
              />
            )}
        </List>
      </MuiThemeProvider>
    </div>
  );
};

const styles = {
  height: '100%',
  width: '200px',
  backgroundColor: 'white',
  zIndex: 1,
  position: 'absolute',
  top: 0
};

export default FavoriteStores;
