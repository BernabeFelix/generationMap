'use strict';
import React, { Component, PropTypes } from 'react';

import {
  createMarkers,
  getLocationByName,
  getNewMap,
  loadMapApi
} from './utils';

export default class GenerationMap extends Component {
  static propTypes = {
    addMarkerToStore: PropTypes.func.isRequired,
    headerHeight: PropTypes.string.isRequired,
    markerLostFocus: PropTypes.func.isRequired,
    showStoreInfo: PropTypes.func.isRequired,
    stores: PropTypes.array.isRequired
  };

  mapStyle = {
    width: '100%',
    height: `calc(100vh - ${this.props.headerHeight})`
  };

  componentDidMount() {
    this.initMap();
  }

  async initMap() {
    await loadMapApi();
    // create geocoder instance
    const geocoder = new google.maps.Geocoder();
    this.setState({ geocoder });
    // get location
    const location = await getLocationByName(geocoder, 'Mexico City');
    // get map instance
    const map = getNewMap(location, this.refs.map, this.props.markerLostFocus);
    this.setState({ map });
    // create markers
    const { addMarkerToStore, showStoreInfo, stores } = this.props;
    createMarkers(addMarkerToStore, geocoder, map, showStoreInfo, stores);
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div ref="map" style={this.mapStyle} />
        {this.props.children}
      </div>
    );
  }
}
