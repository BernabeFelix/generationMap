'use strict';
import React, { Component, PropTypes } from 'react';
import { createMarker, getNewMap } from './map_utils';

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

    // todo: create only 50 markers by sec (api limits)
    stores.forEach((storeObj, i) => {
      createMarker(storeObj, map, geocoder).then(newMarker => {
        if (newMarker) {
          newMarker.addListener('click', () =>
            this.props.markerClickCallback(storeObj)
          );
        }
      });
    });
  }

  render() {
    return <div ref="map" style={mapStyle} />;
  }
}

const mapStyle = {
  width: '100vw',
  height: '400px'
};
