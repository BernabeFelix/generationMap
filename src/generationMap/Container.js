import React, { Component } from 'react';
import FavoriteStores from './FavoriteStores';
import CustomMap from './Map';

class Container extends Component {
  render() {
    return (
      <div style={divStyle}>
        <FavoriteStores />
        <CustomMap />
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
