import React, { PropTypes } from 'react';

import StoreInfo from '../favorite_banner/StoreInfo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, Subheader } from 'material-ui';

const FavoriteStores = ({ removeStore, show, stores, width }) => {
  const subheaderStr = show ? 'My Favorite Stores' : '';
  const styles = {
    height: '100%',
    width: show ? width : 0,
    backgroundColor: 'white',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    transition: 'width 1s'
  };

  return (
    <div style={styles}>
      <MuiThemeProvider>
        <List>
          <Subheader style={{ fontFamily: 'Roboto, sans-serif' }}>
            {subheaderStr}
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
  show: PropTypes.bool.isRequired,
  stores: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired
};

export default FavoriteStores;
