import React, { Component } from 'react';

import CustomMap from './map/Map';
import Header from './header/Header';
import FavoriteBanner from './favorite_banner/Banner';
import FavoriteList from './favorite_list/List';
import { toggleMarkerFavorite } from './map/utils';
import isMobile from '../utils/detectMobile';

import stores from '../data/store_directory.json';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      stores,
      showFavoriteList: false,
      storeSelected: undefined,
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

  unSelectStore = () => {
    // there is marker data showing to user
    if (this.state.storeSelected) {
      this.setState({
        storeSelected: null
      });
    }
  };

  showStoreInfo = storeIndex => {
    this.setState(prevState => {
      return {
        storeSelected: prevState.stores[storeIndex],
        storeIndex
      };
    });
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
      // update storeSelected to display colored heart
      const newState = {
        stores: [
          ...prevState.stores.slice(0, index),
          storeUpdated,
          ...prevState.stores.slice(index + 1)
        ],
        storeSelected: storeUpdated
      };

      // update marker
      toggleMarkerFavorite(storeUpdated.marker, isFavorite);

      return newState;
    });
  };

  render() {
    const listWidth = isMobile.any() ? '200px' : '400px';

    return (
      <div style={divStyle}>
        <Header toggleMenu={this.toggleMenu} />
        <CustomMap
          addMarkerToStore={this.addMarkerToStore}
          markerLostFocus={this.unSelectStore}
          stores={this.state.stores}
          showStoreInfo={this.showStoreInfo}
        >
          {this.state.storeSelected &&
            <FavoriteBanner
              closeBanner={this.unSelectStore}
              listWidth={listWidth}
              listOpen={this.state.showFavoriteList}
              store={this.state.storeSelected}
              storeIndex={this.state.storeIndex}
              toggleStoreToFavorites={this.toggleStoreToFavorites}
            />}

          <FavoriteList
            removeStore={this.toggleStoreToFavorites}
            show={this.state.showFavoriteList}
            stores={this.state.stores}
            width={listWidth}
          />
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
