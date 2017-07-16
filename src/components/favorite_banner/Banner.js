import React, { Component, PropTypes } from 'react';

import StoreInfo from './StoreInfo';
import FavoriteToggle from './FavoriteToggle';

const Banner = ({ closeBanner, store, storeIndex, toggleStoreToFavorites }) => {
  const toggleFavorites = () => {
    toggleStoreToFavorites(storeIndex);
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        bottom: '0',
        position: 'absolute',
        width: '100%'
      }}
    >
      <StoreInfo closeBanner={closeBanner} store={store} />
      <FavoriteToggle store={store} toggleStoreToFavorites={toggleFavorites} />
    </div>
  );
};

Banner.propTypes = {
  closeBanner: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
  storeIndex: PropTypes.number.isRequired,
  toggleStoreToFavorites: PropTypes.func.isRequired
};

export default Banner;
