import React, { Component, PropTypes } from 'react';

import StoreInfo from './StoreInfo';
import FavoriteToggle from './FavoriteToggle';

const Banner = ({
  closeBanner,
  listWidth,
  listOpen,
  store,
  storeIndex,
  toggleStoreToFavorites
}) => {
  const styles = {
    backgroundColor: 'white',
    bottom: '0',
    position: 'absolute',
    transform: `translateX(${listOpen ? listWidth : '0'})`,
    transition: 'width 1s, transform 1s',
    width: `calc(100% - ${listOpen ? listWidth : '0%'})`
  };

  const toggleFavorites = () => {
    toggleStoreToFavorites(storeIndex);
  };

  return (
    <div style={styles}>
      <StoreInfo closeBanner={closeBanner} store={store} />
      <FavoriteToggle store={store} toggleStoreToFavorites={toggleFavorites} />
    </div>
  );
};

Banner.propTypes = {
  closeBanner: PropTypes.func.isRequired,
  listWidth: PropTypes.string.isRequired,
  listOpen: PropTypes.bool.isRequired,
  store: PropTypes.object.isRequired,
  storeIndex: PropTypes.number.isRequired,
  toggleStoreToFavorites: PropTypes.func.isRequired
};

export default Banner;
