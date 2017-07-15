'use strict';
import React, { Component, PropTypes } from 'react';

import { createMarkers, getNewMap } from './map_utils';
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

  showMarkerData = markerData => {
    this.setState({
      markerData
    });
  };

  initMap() {
    getNewMap('Mexico City', this.refs.map).then(
      ({ map, geocoder }) => {
        const stores = this.state.stores;
        createMarkers(geocoder, map, this.showMarkerData, stores);
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
        {this.state.markerData
          ? <FavoriteBanner markerData={this.state.markerData} />
          : ''}
      </div>
    );
  }
}

const mapStyle = {
  width: '100%',
  height: '100vh'
};
