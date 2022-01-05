'use strict';

let GeocoderHelper = require('./GeocoderServiceHelper');

/**
 * proxies reverse-geocode request to underlying geocoding service in order to find address details for given longitude, latitude coordinates
 * proxies reverse-geocode request to underlying geocoding service in order to find address details for given longitude, latitude coordinates
 *
 * lon String required longitude
 * lat String required latitude
 * returns GeocodingOutputType
 **/
exports.reverseGeocode = function(lon,lat) {
  return new Promise(async function(resolve, reject) {

    try {
      let geocodingOutput = await GeocoderHelper.performReverseGeocoding(lon, lat);

      resolve(geocodingOutput); 
    } catch (error) {
      console.error(error);
      reject(error);
    }    
  });
}

