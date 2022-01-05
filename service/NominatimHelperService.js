'use strict';

let KommonitorGeocoderApi = require('kommonitorGeocoderApi');

// axios is used to execute HTTP requests in a Promise-based manner
const axios = require("axios");

exports.geocode_querystring = async function (q, lon, lat, limit) {

    // https://nominatim.org/release-docs/latest/api/Search/#examples
    let url = process.env.NOMINATIM_URL + "?q=" + q + "&limit=" + limit + "&format=geojson&addressdetails=1&extratags=1&namedetails=1";
    if (lon && typeof lon == 'number' && lat && typeof lat == 'number') {
        let x_lowerLeft = lon - 0.001;
        let x_upperRightLeft = lon + 0.001;
        let y_lowerLeft = lat - 0.001;
        let y_upperRightLeft = lat + 0.001; 
        
        url += "&viewbox=" + x_lowerLeft + "," + y_lowerLeft + "," + x_upperRightLeft + "," + y_upperRightLeft;
    }

    url = encodeURI(url);

    console.log("Proxying querystring request to nominatim instance with complete query URL: " + url);

    // proxy request to nominatim and map result to output format
    return await axios.get(url)
        .then(response => {
            // response.data should be the respective GeoJSON as String
            if (response && response.data && response.data.features) {
                console.log("Proxy request was successful and delivered " + response.data.features.length + " feature(s).");
            }
            return response.data;
        })
        .catch(error => {
            console.log("Error when fetching data from nominatim. Error was: " + error);
            throw error;
        });
};

exports.geocode_structuredQuery = async function (country,state,city,district,postcode,street,housenumber,lon,lat, limit){
    // https://nominatim.org/release-docs/latest/api/Search/#examples
    let url = process.env.NOMINATIM_URL + "?limit=" + limit + "&format=geojson&addressdetails=1&extratags=1&namedetails=1";
    if (lon && typeof lon == 'number' && lat && typeof lat == 'number') {
        let x_lowerLeft = lon - 0.001;
        let x_upperRightLeft = lon + 0.001;
        let y_lowerLeft = lat - 0.001;
        let y_upperRightLeft = lat + 0.001; 
        
        url += "&viewbox=" + x_lowerLeft + "," + y_lowerLeft + "," + x_upperRightLeft + "," + y_upperRightLeft;
    }
    if(country){
        url += "&country=" + country;
    }
    if(state){
        url += "&state=" + state;
    }
    if(postcode){
        url += "&postalcode=" + postcode;
    }
    if(city){
        url += "&city=" + city;
    }
    // street and housenumber should be used within on parameter,
    // hence distuingish here
    if(street && housenumber){
        url += "&street=" + housenumber + " " + street;
    }
    else if(street){
        url += "&street=" + street;
    }
    else if(housenumber){
        url += "&street=" + housenumber;
    }

    url = encodeURI(url);

    console.log("Proxying structured query request to nominatim instance with complete query URL: " + url);

    // proxy request to nominatim and map result to output format
    return await axios.get(url)
        .then(response => {
            // response.data should be the respective GeoJSON as String
            if (response && response.data && response.data.features) {
                console.log("Proxy request was successful and delivered " + response.data.features.length + " feature(s).");
            }
            return response.data;
        })
        .catch(error => {
            console.log("Error when fetching data from nominatim. Error was: " + error);
            throw error;
        });
}

exports.reverseGeocode = async function (lon, lat) {

    let url = process.env.NOMINATIM_URL + "/reverse?format=geojson&addressdetails=1&extratags=1&namedetails=1";
    if (lon && typeof lon == 'number') {
        url += "&lon=" + lon;
    }
    if (lat && typeof lat == 'number') {
        url += "&lat=" + lat;
    }

    url = encodeURI(url);

    console.log("Proxying reverse geocode request to nominatim instance with complete query URL: " + url);

    // proxy request to nominatim and map result to output format
    return await axios.get(url)
        .then(response => {
            // response.data should be the respective GeoJSON as String
            if (response && response.data && response.data.features) {
                console.log("Proxy request was successful and delivered " + response.data.features.length + " feature(s).");
            }
            return response.data;
        })
        .catch(error => {
            console.log("Error when fetching data from nominatim. Error was: " + error);
            throw error;
        });
};

exports.mapToKomMonitorModel = function (data) {
    // possible response of nominatim
    /*
    {
        "type": "FeatureCollection",
        "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "place_id": 4136205,
                    "osm_type": "way",
                    "osm_id": 276247082,
                    "display_name": "13c, Herrenbank, Altenessen-Nord, Altenessen, Stadtbezirk V, Essen, Nordrhein-Westfalen, 45329, Deutschland",
                    "place_rank": 30,
                    "category": "building",
                    "type": "yes",
                    "importance": 0.21100000000000002,
                    "address": {
                        "house_number": "13c",
                        "road": "Herrenbank",
                        "neighbourhood": "Altenessen-Nord",
                        "suburb": "Altenessen",
                        "city_district": "Stadtbezirk V",
                        "city": "Essen",
                        "state": "Nordrhein-Westfalen",
                        "postcode": "45329",
                        "country": "Deutschland",
                        "country_code": "de"
                    },
                    "extratags": {},
                    "namedetails": {}
                },
                "bbox": [
                    7.0155032,
                    51.5033525,
                    7.0156351,
                    51.5034654
                ],
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        7.015569150000003,
                        51.503408949999994
                    ]
                }
            }
        ]
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
    outputProperties.category = inputFeatureProperties["category"];
    outputProperties.type = inputFeatureProperties["type"];
    outputProperties.country = inputFeatureProperties.address["country"];
    outputProperties.state = inputFeatureProperties.address["state"];
    outputProperties.district = inputFeatureProperties.address["suburb"];
    outputProperties.city = inputFeatureProperties.address["city"];
    outputProperties.street = inputFeatureProperties.address["road"];
    outputProperties.housenumber = inputFeatureProperties.address["house_number"];
    outputProperties.postcode = inputFeatureProperties.address["postcode"];

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

