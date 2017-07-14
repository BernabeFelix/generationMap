import React, { Component } from 'react';
import load from 'little-loader';
import { createMarker } from './Marker';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A';

export default class GenerationMap extends Component {
  componentDidMount() {
    const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    load(
      googleMapsUrl, //url
      this.createMap, //callback
      this
    ); //context
  }

  createMarkers() {
    const { geocoder, map } = this.state;
    const { stores } = this.props;

    stores.forEach(storeObj => createMarker(storeObj, map, geocoder));
  }

  createMap(err) {
    if (!err) {
      const initialPosition = 'Mexico City';
      const geocoder = new google.maps.Geocoder();
      const self = this;

      // get mexico city's location
      geocoder.geocode({ address: initialPosition }, function(results, status) {
        if (status === 'OK') {
          // create map instance
          const map = new google.maps.Map(self.refs.map, {
            center: results[0].geometry.location,
            zoom: 10
          });
          // save instances
          self.setState({
            geocoder,
            map
          });

          // create markers
          self.createMarkers();
        } else {
          // show alert in case an error happens with mexico city's location
          alert(
            'The Map could not be initialized because for the following reason: ' +
              status
          );
        }
      });
    }
  }

  render() {
    return <div ref="map" style={mapStyle} />;
  }
}

const mapStyle = {
  width: '100vw',
  height: '400px'
};
