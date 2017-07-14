export const createMarker = (storeObj, map, geocoder) => {
  geocoder.geocode({ address: storeObj.Address }, function(results, status) {
    if (status === 'OK') {
      const marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      console.warn(
        `Marker could not be created, name: ${storeObj.Name}, address: ${storeObj.Address}, status: ${status}`
      );
    }
  });
};
