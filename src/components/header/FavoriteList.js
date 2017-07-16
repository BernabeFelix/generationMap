import React from 'react';

const FavoriteStores = props => {
  const renderStore = (store, i) => {
    return (
      <div key={i}>
        <span>
          {store.Name}
        </span>
        <span>
          {store.Address}
        </span>
      </div>
    );
  };

  return (
    <div style={styles}>
      {props.stores.filter(store => store.isFavorite).map(renderStore)}
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
