'use strict';

let PhotonHelper = require('./PhotonHelperService');
let NominatimHelper = require('./NominatimHelperService');

let limit = process.env.LIMIT_DEFAULT || 15;

exports.performGeocoding_queryString = async function (q, lon, lat) {

    lon = Number(lon);
    lat = Number(lat);

    // proxy request to photon and map result to output format
    let photonResponse = await PhotonHelper.geocode_querystring(q, lon, lat, limit);
    let geocoderOutput = PhotonHelper.mapToKomMonitorModel(photonResponse);

    return geocoderOutput;
};

exports.performGeocoding_structuredQuery = async function (country,state,city,district,postcode,street,housenumber,lon,lat) {

    lon = Number(lon);
    lat = Number(lat);

    // proxy request to nominatim and map result to output format
    let nominatimResponse = await NominatimHelper.geocode_structuredQuery(country,state,city,district,postcode,street,housenumber,lon,lat, limit);
    let geocoderOutput = NominatimHelper.mapToKomMonitorModel(nominatimResponse);

    return geocoderOutput;
};


exports.performReverseGeocoding = async function (lon, lat) {

    lon = Number(lon);
    lat = Number(lat);

    // proxy request to photon and map result to output format
    let photonResponse = await PhotonHelper.reverseGeocode(lon, lat);
    let geocoderOutput = PhotonHelper.mapToKomMonitorModel(photonResponse);
    

    return geocoderOutput;
};



