'use strict';
import React, { Component, PropTypes } from 'react';
import { createMarkers, getNewMap } from './map_utils';

export default class GenerationMap extends Component {
  static propTypes = {
    markerClickCallback: PropTypes.func.isRequired,
    stores: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.initMap();
  }

  initMap() {
    getNewMap('Mexico City', this.refs.map).then(
      ({ map, geocoder }) => {
        const { stores, markerClickCallback } = this.props;
        createMarkers(geocoder, map, markerClickCallback, stores);
        this.setState({ geocoder, map });
      },
      error => {
        alert(`The Map could not be initialized because ${error}`);
      }
    );
  }

  render() {
    return <div ref="map" style={mapStyle} />;
  }
}

const mapStyle = {
  width: '100vw',
  height: '400px'
};
