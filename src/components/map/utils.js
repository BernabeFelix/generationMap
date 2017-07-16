'use strict';
import load from 'little-loader';
import isMobile from '../../utils/detectMobile';

const defaultIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

export const createMarkers = (
  addMarkerToStore,
  geocoder,
  map,
  markerClickCallback,
  stores
) => {
  // Note: This has to be done because google maps api has a request limit
  const maxReqPerSec = 1;
  //todo: remove this comments
  const loops = 4; //Math.ceil(stores.length / maxReqPerSec); //e.g. 233/50 = 5
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
      ((storesChunk, i) => {
        return () => {
          createMarkersChunk(
            addMarkerToStore,
            geocoder,
            map,
            markerClickCallback,
            storesChunk,
            i * maxReqPerSec
          );
        };
      })(storesChunk, i),
      1000 * i
    );
  }
};

function createMarkersChunk(
  addMarkerToStore,
  geocoder,
  map,
  markerClickCallback,
  storesChunk,
  chunkInitialIndex
) {
  storesChunk.forEach((storeObj, i) => {
    createMarker(storeObj, map, geocoder).then(newMarker => {
      if (newMarker) {
        newMarker.addListener('click', () =>
          markerClickCallback(chunkInitialIndex + i)
        );
        addMarkerToStore(newMarker, chunkInitialIndex + i);
      }
    });
  });
}

function createMarker(storeObj, map, geocoder, clickCallback) {
  return getLocationByName(geocoder, storeObj.Address).then(
    position => {
      return new google.maps.Marker({
        icon: defaultIcon,
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

export const getNewMap = (initialPosition, mapRef, mapClickCallback) => {
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
            scrollwheel: false,
            zoom: isMobile.any() ? 12 : 10
          });

          map.addListener('click', mapClickCallback);

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

export const toggleMarketFavorite = (marker, isFavorite) => {
  const blueMarker = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
  marker.setIcon(isFavorite ? blueMarker : defaultIcon);
};
