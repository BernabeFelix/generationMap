import React, { PropTypes } from 'react';

import StoreInfo from '../favorite_banner/StoreInfo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, Subheader } from 'material-ui';

const FavoriteStores = ({ stores, removeStore }) => {
  return (
    <div style={styles}>
      <MuiThemeProvider>
        <List>
          <Subheader style={{ fontFamily: 'Roboto, sans-serif' }}>
            My Favorite Stores
          </Subheader>
          {stores
            .map((store, i) => {
              return { ...store, i };
            })
            .filter(store => store.isFavorite)
            .map((store, i) =>
              <StoreInfo
                key={i}
                closeBanner={removeStore.bind(null, store.i)}
                store={store}
              />
            )}
        </List>
      </MuiThemeProvider>
    </div>
  );
};

FavoriteStores.propTypes = {
  removeStore: PropTypes.func.isRequired,
  stores: PropTypes.array.isRequired
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
