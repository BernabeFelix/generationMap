'use strict';
import React, { Component, PropTypes } from 'react';

import { createMarkers, getNewMap, toggleMarketFavorite } from './utils';
import FavoriteBanner from '../favorite_banner/Banner';
import stores from '../../data/store_directory.json';

export default class GenerationMap extends Component {
  constructor() {
    super();
    this.state = { stores };
  }

  componentDidMount() {
    this.initMap();
  }

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
      toggleMarketFavorite(storeUpdated.marker, isFavorite);

      return newState;
    });
  };

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

  showStoreInfo = storeIndex => {
    this.setState(prevState => {
      return {
        storeInfo: prevState.stores[storeIndex],
        storeIndex
      };
    });
  };

  initMap() {
    getNewMap('Mexico City', this.refs.map, this.markerLostFocus).then(
      ({ map, geocoder }) => {
        const stores = this.state.stores;
        createMarkers(
          this.addMarkerToStore,
          geocoder,
          map,
          this.showStoreInfo,
          stores
        );
        this.setState({ geocoder, map });
      },
      error => {
        alert(`The Map could not be initialized because ${error}`);
      }
    );
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div ref="map" style={mapStyle} />
        {this.state.storeInfo
          ? <FavoriteBanner
              store={this.state.storeInfo}
              storeIndex={this.state.storeIndex}
              toggleStoreToFavorites={this.toggleStoreToFavorites}
              closeBanner={this.markerLostFocus}
            />
          : ''}
      </div>
    );
  }
}

const mapStyle = {
  width: '100%',
  height: '100vh'
};
