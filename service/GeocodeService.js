'use strict';

let GeocoderHelper = require('./GeocoderServiceHelper');


/**
 * proxies search request to underlying geocoding service in order to find coordinates for entered location
 * proxies search request to underlying geocoding service in order to find coordinates for entered location
 *
 * q String the query string (e.g. 'Müllerstr. 3, Essen' or '3, Müllerstraße, 45147')
 * lon String optional longitude to prioritize results (optional)
 * lat String optional latitude to prioritize results (optional)
 * returns GeocodingOutputType
 **/
exports.geocodeByQueryString = function(q,lon,lat) {
  return new Promise(async function(resolve, reject) {

    try {
      let geocodingOutput = await GeocoderHelper.performGeocoding_queryString(q, lon, lat);

      resolve(geocodingOutput); 
    } catch (error) {
      console.error(error);
      reject(error);
    }    
  });
};

/**
 * proxies search batch request to underlying geocoding service in order to find coordinates for each entered location
 * proxies search batch request to underlying geocoding service in order to find coordinates for each entered location
 *
 * body List list of query string (e.g. 'Müllerstr. 3, Essen' or '3, Müllerstraße, 45147')
 * lon String optional longitude to prioritize results (optional)
 * lat String optional latitude to prioritize results (optional)
 * returns List
 **/
 exports.geocodeByQueryStringBatch = function(body,lon,lat) {
  return new Promise(async function(resolve, reject) {
    let resultArray = [];

    try {

      // body is an array of query strings
      for (const queryString of body) {
        let geocodingOutput = await GeocoderHelper.performGeocoding_queryString(queryString, lon, lat); 
        resultArray.push(geocodingOutput);
      }      

      resolve(resultArray); 
    } catch (error) {
      console.error(error);
      reject(error);
    }    
  });
};


/**
 * proxies search request to underlying geocoding service in order to find coordinates for entered structured data. No parameter is required. Instead any combination of structrured query elements may respond with 0 ... n result records in the form of a GeoJSON FeatureCollection, where each feature has more or less details with regard to address details
 * proxies search request to underlying geocoding service in order to find coordinates for entered structured data. No parameter is required. Instead any combination of structrured query elements may respond with 0 ... n result records in the form of a GeoJSON FeatureCollection, where each feature has more or less details with regard to address details
 *
 * country String optional country name (optional)
 * state String optional state name (optional)
 * city String optional city name (optional)
 * district String optional district name (optional)
 * postcode String optional postcode name (optional)
 * street String required street name (optional)
 * housenumber String optional housenumber name (optional)
 * lon String optional longitude to prioritize results (optional)
 * lat String optional latitude to prioritize results (optional)
 * returns GeocodingOutputType
 **/
exports.geocodeByStructuredQuery = function(country,state,city,district,postcode,street,housenumber,lon,lat) {
  return new Promise(async function(resolve, reject) {

    try {
      let geocodingOutput = await GeocoderHelper.performGeocoding_structuredQuery(country,state,city,district,postcode,street,housenumber,lon,lat);

      resolve(geocodingOutput); 
    } catch (error) {
      console.error(error);
      reject(error);
    }    
  });
};

/**
 * proxies search batch request to underlying geocoding service in order to find coordinates for entered structured data. No parameter is required. Instead any combination of structrured query elements may respond with 0 ... n result records in the form of a GeoJSON FeatureCollection, where each feature has more or less details with regard to address details
 * proxies search batch request to underlying geocoding service in order to find coordinates for entered structured data. No parameter is required. Instead any combination of structrured query elements may respond with 0 ... n result records in the form of a GeoJSON FeatureCollection, where each feature has more or less details with regard to address details
 *
 * body List list of structured geocoding inputs
 * lon String optional longitude to prioritize results (optional)
 * lat String optional latitude to prioritize results (optional)
 * returns List
 **/
 exports.geocodeByStructuredQueryBatch = function(body,lon,lat) {
  return new Promise(async function(resolve, reject) {

    let resultArray = [];

    try {

      // body is an array of query strings
      for (const queryStructuredInput of body) {
        let geocodingOutput = await GeocoderHelper.performGeocoding_structuredQuery(queryStructuredInput.country,queryStructuredInput.state,
          queryStructuredInput.city,queryStructuredInput.district,queryStructuredInput.postcode,queryStructuredInput.street,queryStructuredInput.housenumber,lon,lat);
        resultArray.push(geocodingOutput);
      }      

      resolve(resultArray); 
    } catch (error) {
      console.error(error);
      reject(error);
    }    
  });
};

