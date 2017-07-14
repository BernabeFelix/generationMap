'use strict';
import load from 'little-loader';

export const createMarkers = (geocoder, map, markerClickCallback, stores) => {
  // Note: This has to be done because google maps api has a request limit
  const maxReqPerSec = 1;
  const loops = Math.ceil(stores.length / maxReqPerSec); //e.g. 233/50 = 5
  let storesChunk = [];

  for (var i = 0; i < loops; i++) {
    /* e.g. n = 233 loops = 5
    storesChunk 1 = stores.slice(0, 50)
    storesChunk 2 = stores.slice(50, 100)
    ...
    */
    if (i === loops.length - 1) {
      storesChunk = stores.slice(i * maxReqPerSec);
    } else {
      storesChunk = stores.slice(i * maxReqPerSec, (i + 1) * maxReqPerSec);
    }
    // create markers every sec
    setTimeout(
      (storesChunk => {
        return () => {
          createMarkersChunk(geocoder, map, markerClickCallback, storesChunk);
        };
      })(storesChunk),
      1000 * i
    );
  }
};

function createMarkersChunk(geocoder, map, markerClickCallback, storesChunk) {
  console.log(storesChunk);
  storesChunk.forEach((storeObj, i) => {
    createMarker(storeObj, map, geocoder).then(newMarker => {
      if (newMarker) {
        newMarker.addListener('click', () => markerClickCallback(storeObj));
      }
    });
  });
}

function createMarker(storeObj, map, geocoder, clickCallback) {
  return getLocationByName(geocoder, storeObj.Address).then(
    position => {
      return new google.maps.Marker({
        map,
        position,
        animation: google.maps.Animation.DROP
      });
    },
    error => {
      console.warn(
        `Marker could not be created, name: ${storeObj.Name}, address: ${storeObj.Address}, error: ${error}`
      );
      return false;
    }
  );
}

export const getNewMap = (initialPosition, mapRef) => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyBMKrNcvNkqm7zpmQpWWaWYav2J8NdCmg4';
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
