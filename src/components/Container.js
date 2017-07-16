import React, { Component } from 'react';

import CustomMap from './map/Map';
import Header from './header/Header';
import FavoriteBanner from './favorite_banner/Banner';
import FavoriteList from './header/FavoriteList';
import { toggleMarkerFavorite } from './map/utils';

import stores from '../data/store_directory.json';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      stores,
      showFavoriteList: false,
      storeInfo: undefined,
      storeIndex: undefined
    };
  }

  addMarkerToStore = (marker, index) => {
    this.setState(prevState => {
      return {
        stores: [
          ...prevState.stores.slice(0, index),
          { ...prevState.stores[index], marker, isFavorite: false },
          ...prevState.stores.slice(index + 1)
        ]
      };
    });
  };

  markerLostFocus = () => {
    // there is marker data showing to user
    if (this.state.storeInfo) {
      this.setState({
        storeInfo: null
      });
    }
  };

  toggleMenu = () => {
    this.setState(prevState => {
      return {
        showFavoriteList: !prevState.showFavoriteList
      };
    });
  };

  toggleStoreToFavorites = index => {
    this.setState(prevState => {
      const storeToToggle = prevState.stores[index];
      const isFavorite = !storeToToggle.isFavorite;
      // update store, set isFavorite flag to true
      const storeUpdated = { ...storeToToggle, isFavorite };
      // update stores array
      // update storeInfo to display colored heart
      const newState = {
        stores: [
          ...prevState.stores.slice(0, index),
          storeUpdated,
          ...prevState.stores.slice(index + 1)
        ],
        storeInfo: storeUpdated
      };

      // update marker
      toggleMarkerFavorite(storeUpdated.marker, isFavorite);

      return newState;
    });
  };

  showStoreInfo = storeIndex => {
    this.setState(prevState => {
      return {
        storeInfo: prevState.stores[storeIndex],
        storeIndex
      };
    });
  };

  render() {
    return (
      <div style={divStyle}>
        <Header toggleMenu={this.toggleMenu} />
        <CustomMap
          addMarkerToStore={this.addMarkerToStore}
          stores={this.state.stores}
          showStoreInfo={this.showStoreInfo}
        >
          {this.state.storeInfo &&
            <FavoriteBanner
              store={this.state.storeInfo}
              storeIndex={this.state.storeIndex}
              toggleStoreToFavorites={this.toggleStoreToFavorites}
              closeBanner={this.markerLostFocus}
            />}
          {this.state.showFavoriteList &&
            <FavoriteList stores={this.state.stores} />}
        </CustomMap>
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
