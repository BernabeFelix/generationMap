'use strict';
import React, { Component, PropTypes } from 'react';

import { createMarkers, getNewMap, setMarketFavorite } from './utils';
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

  addStoreToFavorites = index => {
    this.setState(prevState => {
      // update store, set isFavorite flag to true
      const storeUpdated = { ...prevState.stores[index], isFavorite: true };
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
      setMarketFavorite(storeUpdated.marker);

      return newState;
    });
  };

  addMarkerToStore = (marker, index) => {
    this.setState(prevState => {
      return {
        stores: [
          ...prevState.stores.slice(0, index),
          { ...prevState.stores[index], marker },
          ...prevState.stores.slice(index + 1)
        ]
      };
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

  initMap() {
    getNewMap('Mexico City', this.refs.map).then(
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
              addStoreToFavorites={this.addStoreToFavorites}
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
