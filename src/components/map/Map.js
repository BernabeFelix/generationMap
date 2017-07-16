'use strict';
import React, { Component, PropTypes } from 'react';

import { createMarkers, getNewMap } from './utils';

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

  initMap() {
    getNewMap('Mexico City', this.refs.map, this.props.markerLostFocus).then(
      ({ map, geocoder }) => {
        const stores = this.props.stores;
        createMarkers(
          this.props.addMarkerToStore,
          geocoder,
          map,
          this.props.showStoreInfo,
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
        <div ref="map" style={this.mapStyle} />
        {this.props.children}
      </div>
    );
  }
}
