import React, { Component } from 'react';
import FavoriteStores from './FavoriteStores';
import CustomMap from './Map';
import stores from '../data/store_directory.json';

class Container extends Component {
  constructor() {
    super();
    this.state = { stores };
  }

  render() {
    const stores = this.state.stores;

    return (
      <div style={divStyle}>
        <FavoriteStores />
        <CustomMap stores={stores} />
      </div>
    );
  }
}

var divStyle = {
  border: 'red',
  borderWidth: 2,
  borderStyle: 'solid',
  padding: 20
};

export default Container;
