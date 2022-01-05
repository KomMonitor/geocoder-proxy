'use strict';

var utils = require('../utils/writer.js');
var ReverseGeocode = require('../service/ReverseGeocodeService');

module.exports.reverseGeocode = function reverseGeocode (req, res, next, lon, lat) {
  ReverseGeocode.reverseGeocode(lon, lat)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};
