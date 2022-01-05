'use strict';


/**
 * proxies reverse-geocode request to underlying geocoding service in order to find address details for given longitude, latitude coordinates
 * proxies reverse-geocode request to underlying geocoding service in order to find address details for given longitude, latitude coordinates
 *
 * lon String required longitude
 * lat String required latitude
 * returns GeocodingOutputType
 **/
exports.reverseGeocode = function(lon,lat) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "features" : [ {
    "geometry" : {
      "coordinates" : [ 7.1234, 51.4321 ],
      "type" : "Point"
    },
    "properties" : {
      "country" : "Deutschland",
      "city" : "Essen",
      "housenumber" : "13c",
      "street" : "Müllerstraße",
      "district" : "Holsterhausen",
      "postcode" : "45147",
      "state" : "Nordrhein-Westfalen",
      "category" : "building",
      "type" : "apartments",
      "display_name" : "3, Müllerstraße, Holsterhausen, Essen, Nordrhein-Westfalen, 45147, Deutschland"
    }
  }, {
    "geometry" : {
      "coordinates" : [ 7.1234, 51.4321 ],
      "type" : "Point"
    },
    "properties" : {
      "country" : "Deutschland",
      "city" : "Essen",
      "housenumber" : "13c",
      "street" : "Müllerstraße",
      "district" : "Holsterhausen",
      "postcode" : "45147",
      "state" : "Nordrhein-Westfalen",
      "category" : "building",
      "type" : "apartments",
      "display_name" : "3, Müllerstraße, Holsterhausen, Essen, Nordrhein-Westfalen, 45147, Deutschland"
    }
  } ],
  "type" : "FeatureCollection"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

