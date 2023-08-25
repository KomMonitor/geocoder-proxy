'use strict';

let PhotonHelper = require('./PhotonHelperService');
let NominatimHelper = require('./NominatimHelperService');

let limit = process.env.LIMIT_DEFAULT || 15;

exports.performGeocoding_queryString = async function (q, lon, lat) {

    lon = Number(lon);
    lat = Number(lat);

    // proxy request to photon and map result to output format

    // due to some problems with keeping custom photon instance up-to-date from local nominatim instance
    // we temporarily use nominatim instead of photon for query string search 
    // let photonResponse = await PhotonHelper.geocode_querystring(q, lon, lat, limit);
    // let geocoderOutput = PhotonHelper.mapToKomMonitorModel(photonResponse);

    //
    let nominatimResponse = await NominatimHelper.geocode_querystring(q, lon, lat, limit);
    let geocoderOutput = NominatimHelper.mapToKomMonitorModel(nominatimResponse, q);

    return geocoderOutput;
};

exports.performGeocoding_structuredQuery = async function (country,state,city,district,postcode,street,housenumber,lon,lat) {

    lon = Number(lon);
    lat = Number(lat);

    // proxy request to nominatim and map result to output format
    let nominatimResponse = await NominatimHelper.geocode_structuredQuery(country,state,city,district,postcode,street,housenumber,lon,lat, limit);
    let queryString = "";
    if(city){
        queryString += city;
    }
    if(postcode){
        queryString += postcode;
    }
    if(street){
        queryString += street;
    }
    if(housenumber){
        queryString += housenumber;
    }
    let geocoderOutput = NominatimHelper.mapToKomMonitorModel(nominatimResponse, queryString);

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



