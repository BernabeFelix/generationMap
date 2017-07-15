import React, { Component } from 'react';
import FavoriteStores from './favorite_stores/List';
import CustomMap from './map/Map';

class Container extends Component {
  cleanPreviewStore = () => {
    this.setState({
      previewStore: {}
    });
  };

  render() {
    return (
      <div style={divStyle}>
        <FavoriteStores cleanPreviewStore={this.cleanPreviewStore} />
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
