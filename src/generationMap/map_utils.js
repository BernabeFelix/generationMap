'use strict';
import load from 'little-loader';

export const createMarker = (storeObj, map, geocoder) => {
  getLocationByName(geocoder, storeObj.Address).then(
    position => {
      const marker = new google.maps.Marker({ map, position });
    },
    error => {
      console.warn(
        `Marker could not be created, name: ${storeObj.Name}, address: ${storeObj.Address}, error: ${error}`
      );
    }
  );
};

export const getNewMap = (initialPosition, mapRef) => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A';
  const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;

  return new Promise((resolve, reject) => {
    load(googleMapsUrl, error => {
      if (error) {
        reject(error);
        return;
      }

      // create geocoder instance
      const geocoder = new google.maps.Geocoder();

      // get mexico city's location
      getLocationByName(geocoder, initialPosition).then(
        location => {
          // create map instance
          const map = new google.maps.Map(mapRef, {
            center: location,
            zoom: 10
          });

          resolve({ map, geocoder });
        },
        error => reject(error)
      );
    }); //end load
  }); //end promise
};

function getLocationByName(geocoder, address) {
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status !== 'OK') {
        reject(status);
        return;
      }

      resolve(results[0].geometry.location);
    });
  });
}
