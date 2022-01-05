'use strict';

var utils = require('../utils/writer.js');
var Geocoder = require('../service/GeocoderService');

module.exports.geocodeByQueryString = function geocodeByQueryString (req, res, next, q, lon, lat) {
  Geocoder.geocodeByQueryString(q, lon, lat)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.geocodeByStructuredQuery = function geocodeByStructuredQuery (req, res, next, country, state, city, district, postcode, street, housenumber, lon, lat) {
  Geocoder.geocodeByStructuredQuery(country, state, city, district, postcode, street, housenumber, lon, lat)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
