'use strict';
import React, { Component } from 'react';
import { createMarker, getNewMap } from './map_utils';

export default class GenerationMap extends Component {
  componentDidMount() {
    this.initMap();
  }

  initMap() {
    getNewMap('Mexico City', this.refs.map).then(
      ({ map, geocoder }) => {
        this.setState({ map, geocoder });
        this.createMarkers();
      },
      error => {
        alert(`The Map could not be initialized because ${error}`);
      }
    );
  }

  createMarkers() {
    const { geocoder, map } = this.state;
    const { stores } = this.props;

    stores.forEach(storeObj => createMarker(storeObj, map, geocoder));
  }

  render() {
    return <div ref="map" style={mapStyle} />;
  }
}

const mapStyle = {
  width: '100vw',
  height: '400px'
};
