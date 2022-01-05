'use strict';

let KommonitorGeocoderApi = require('kommonitorGeocoderApi');

// axios is used to execute HTTP requests in a Promise-based manner
const axios = require("axios");

exports.geocode_querystring = async function (q, lon, lat, limit) {

    let url = process.env.PHOTON_URL + "/api?q=" + q + "&limit=" + limit;
    if (lon && typeof lon == 'number') {
        url += "&lon=" + lon;
    }
    if (lat && typeof lat == 'number') {
        url += "&lat=" + lat;
    }

    url = encodeURI(url);

    console.log("Proxying querystring request to photon instance with complete query URL: " + url);

    // proxy request to photon and map result to output format
    //GET /api/q=berlin&lat=52.3879&lon=13.0582&limit=15
    return await axios.get(url)
        .then(response => {
            // response.data should be the respective GeoJSON as String
            if (response && response.data && response.data.features) {
                console.log("Proxy request was successful and delivered " + response.data.features.length + " feature(s).");
            }
            return response.data;
        })
        .catch(error => {
            console.log("Error when fetching data from photon. Error was: " + error);
            throw error;
        });
};

exports.reverseGeocode = async function (lon, lat) {

    let url = process.env.PHOTON_URL + "/reverse?lon=" + lon + "&lat=" + lat;

    url = encodeURI(url);

    console.log("Proxying reverse geocode request to photon instance with complete query URL: " + url);

    // proxy request to photon and map result to output format
    //GET /reverse/lat=52.3879&lon=13.0582
    return await axios.get(url)
        .then(response => {
            // response.data should be the respective GeoJSON as String
            if (response && response.data && response.data.features) {
                console.log("Proxy request was successful and delivered " + response.data.features.length + " feature(s).");
            }
            return response.data;
        })
        .catch(error => {
            console.log("Error when fetching data from photon. Error was: " + error);
            throw error;
        });
};

exports.mapToKomMonitorModel = function (data) {
    // possible response of photon
    /*
    {
        "features": [
            {
                "geometry": {
                    "coordinates": [
                        6.984454821268532,
                        51.437492750000004
                    ],
                    "type": "Point"
                },
                "type": "Feature",
                "properties": {
                    "osm_id": 287106124,
                    "extent": [
                        6.9843666,
                        51.4375637,
                        6.9845423,
                        51.4374221
                    ],
                    "country": "Deutschland",
                    "city": "Essen",
                    "countrycode": "DE",
                    "postcode": "45147",
                    "type": "house",
                    "osm_type": "W",
                    "osm_key": "building",
                    "housenumber": "3",
                    "street": "Müllerstraße",
                    "district": "Holsterhausen",
                    "osm_value": "apartments",
                    "state": "Nordrhein-Westfalen"
                }
            }
        ],
        "type": "FeatureCollection"
    }
    */

    // target model
    /*
    {
        "type": "FeatureCollection",
        "features": [
            {
            "geometry": {
                "type": "Point",
                "coordinates": [
                7.1234,
                51.4321
                ]
            },
            "properties": {
                "category": "building",
                "type": "apartments",
                "display_name": "3, Müllerstraße, Holsterhausen, Essen, Nordrhein-Westfalen, 45147, Deutschland",
                "country": "Deutschland",
                "state": "Nordrhein-Westfalen",
                "postcode": "45147",
                "city": "Essen",
                "district": "Holsterhausen",
                "street": "Müllerstraße",
                "housenumber": "13c"
            }
            }
        ]
    }
    */

    let geocoderOutput = new KommonitorGeocoderApi.GeocodingOutputType();
    geocoderOutput.features = [];

    for (const inputFeature of data.features) {
        let outputFeature = new KommonitorGeocoderApi.GeocodingFeatureType();
        outputFeature.geometry = inputFeature.geometry;
        outputFeature.properties = exports.mapFeatureToKomMonitorModel(inputFeature.properties);
    
        geocoderOutput.features.push(outputFeature);
    }

    return geocoderOutput;

};

exports.mapFeatureToKomMonitorModel = function (inputFeatureProperties) {
    let outputProperties = new KommonitorGeocoderApi.GeocodingPropertiesType();
    outputProperties.category = inputFeatureProperties["osm_key"];
    outputProperties.type = inputFeatureProperties["osm_value"];
    outputProperties.country = inputFeatureProperties["country"];
    outputProperties.state = inputFeatureProperties["state"];
    outputProperties.district = inputFeatureProperties["district"];
    outputProperties.city = inputFeatureProperties["city"];
    outputProperties.street = inputFeatureProperties["street"];
    outputProperties.housenumber = inputFeatureProperties["housenumber"];
    outputProperties.postcode = inputFeatureProperties["postcode"];

    outputProperties.displayName = "";
    if (outputProperties.housenumber) {
        outputProperties.displayName += outputProperties.housenumber + ", ";
    }
    if (outputProperties.street) {
        outputProperties.displayName += outputProperties.street + ", ";
    }
    if (outputProperties.district) {
        outputProperties.displayName += outputProperties.district + ", ";
    }
    if (outputProperties.postcode) {
        outputProperties.displayName += outputProperties.postcode + ", ";
    }

    outputProperties.displayName += outputProperties.city + ", " + outputProperties.state + ", " + outputProperties.country;

    return outputProperties;
};

