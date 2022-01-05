'use strict';


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

