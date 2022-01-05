'use strict';

var utils = require('../utils/writer.js');
var Geocode = require('../service/GeocodeService');

module.exports.geocodeByQueryString = function geocodeByQueryString (req, res, next, q, lon, lat) {
  Geocode.geocodeByQueryString(q, lon, lat)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.geocodeByStructuredQuery = function geocodeByStructuredQuery (req, res, next, country, state, city, district, postcode, street, housenumber, lon, lat) {
  Geocode.geocodeByStructuredQuery(country, state, city, district, postcode, street, housenumber, lon, lat)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
