/** 
 * viewallRoutes.js
 * code that runs on load
 * This file contains the following functions :
 * webServiceRequest(url, data)
 * getAirportData()
 * showAirports(result)
 * getAllRouteData()
 * showAllRoutes(result)
 * removeLayerWithId(idToRemove)
 * showPath()
 * planPage()
 * removeMarkers()
 */

"use strict";

//made countryRef a global variable as we wanted to access the input country of the user in more than one function. 
//Checking Country localstorage for homepage -> tripplanner transition'
let countryRef = document.getElementById("countries"); //gets the selected country from the document
let countriesOutput = ""; //for the drop down list

for (let i = 0; i < countryData.length; i++) { //for all the countries
    countriesOutput += `<option value="${countryData[i]}">${countryData[i]}</option>`; //for populating countries
}

countryRef.innerHTML = countriesOutput; //for displaying

let countryStorage = localStorage.getItem(COUNTRY_KEY); //for getting the country
let country = ""; //a variable to store the country

if (countryStorage != undefined) {
    countryRef.value = countryStorage;
    country = countryRef.value;
}

// generates MapBox token and initializes a bunch of empty arrays in global scope as we wanted to access these in more than one function
mapboxgl.accessToken = "pk.eyJ1IjoidGVhbS0wOTQiLCJhIjoiY2tldXZtOXd2MWhxNDJ1b21kMTVqc2oxZCJ9.boFRONkPtgOP_E-VqtDMlQ";
let airports = [];
let routes = [];
let coords = [];
let startAirport = [];
let endAirport = [];
let routeDetails = [];
let markers = [];

//code for creating the map
let map = new mapboxgl.Map(
    {
        container: 'map',
        center: [144.9648731, -37.8182711],
        zoom: 4,
        style: 'mapbox://styles/mapbox/streets-v9'
    }
);

//webServiceRequest(url, data)
//
//This function is responsible to make web service request
//
//returns: This function returns nothing.
function webServiceRequest(url, data) {
    let params = ""; // Build URL parameters from data object
    for (let key in data) { // For each key in data object
        if (data.hasOwnProperty(key)) {
            if (params.length == 0) {
                params += "?"; //Since first parameter starts with '?'
            }
            else {
                params += "&"; //Subsequent parameter separated by '&'
            }
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);
            params += encodedKey + "=" + encodedValue;
        }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);
}

//getAirportData()
//
//This function is responsible to get the airport data out of the API. It calls the web service request with the url of airport and the country selected by the 
//user to come up with the data of the airports of that country.
//
//returns: This function returns nothing.
function getAirportData() {
    country = countryRef.value;
    let url = "https://eng1003.monash/OpenFlights/airports/";
    let data = {
        country: `${country}`,
        callback: "showAirports"
    }
    webServiceRequest(url, data);
}

//showAirports(result)
//
//This function is responsible to get the airport data out of the API. It calls the web service request with the url of airport and the country selected by the 
//user to come up with the data of the airports of that country.
//
//returns: This function returns nothing.
function showAirports(result) {
    airports = result; //storing the result inside the airports array
    removeMarkers(); //removes the marker of all other airports of that country
    map.panTo([airports[0].longitude, airports[0].latitude]); //Pans the map to the airports coordinates
    //the below code sets the marker and description of all the airports in the airports array
    for (let i = 0; i < airports.length; i++) {
        let marker = new mapboxgl.Marker({ "color": "rgb(255,193,7)" }); //marker specification
        markers.push(marker); //storing it in marker variable
        //the below code to get the coordinates of the airport and store all the airports longitude and latitude in the coordinates array as nested arrays to then display it. 
        let latitude = airports[i].latitude;
        let longitude = airports[i].longitude;
        let coordinates = [longitude, latitude];
        marker.setLngLat(coordinates);
        marker.addTo(map); //to add the markers to the map
        //the below code for description of every airport
        let description = `<h3>Airport: ${airports[i].name}<br></h3> 
            <h3>City: ${airports[i].city} <h3>`;
        let popup = new mapboxgl.Popup({ offset: 45 }); //for the popups
        popup.setHTML(description);
        marker.setPopup(popup);
    }
    getAllRouteData(); // to get all routes data of that country
}

//getAllRouteData()
//
//This function is responsible to get the route data out of the ROUTES API. It calls the web service request with the url of route and the country selected by the 
//user to come up with the data of the airports of that country.
//
//returns: This function returns nothing.
function getAllRouteData() {
    let url = "https://eng1003.monash/OpenFlights/allroutes/"; //url for API
    let data = {
        country: `${country}`,
        callback: "showAllRoutes"
    }
    webServiceRequest(url, data);
}

//showAllRoutes(result)
//
//This function is responsible to get the route data out of the ROUTES API. It calls the web service request with the url of route and the country selected by the 
//user to come up with the data of all the routes of that country.
//
//returns: This function returns nothing.
function showAllRoutes(result) {
    //initialization of 2 arrays
    routes = [];
    coords = [];
    let startCoords = [];
    let endCoords = [];
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < airports.length; j++) {

            if (result[i].sourceAirportId == airports[j].airportId) //start airport finding
            {
                startCoords = [airports[j].longitude, airports[j].latitude]; //coordinates setting of the start airport
                startAirport = airports[j];
            }
            if (result[i].destinationAirportId == airports[j].airportId) //end airport finding
            {
                endCoords = [airports[j].longitude, airports[j].latitude]; //coordinates setting of the end airport
                endAirport = airports[j];
                routeDetails = result[i];
            }
        }

        //condition to check if it's international or domestic
        if (startCoords.length != 0 && endCoords.length != 0) {
            coords.push(startCoords);
            coords.push(endCoords);
            routes.push(result[i]); //pushing the coordinates into the routes array
        }
        removeLayerWithId("routes"); //removes all the previous routes from all the other country but keeps for our specific country
        showPath(); //to show the path
    }

}

//removeLayerWithId(idToRemove)
//
//This function is responsible to remove the id passed into this function. It gets the layer from the map.
//
//returns: This function returns nothing.
function removeLayerWithId(idToRemove) {
    let hasPoly = map.getLayer(idToRemove);
    //?
    if (hasPoly !== undefined) {
        map.removeLayer(idToRemove);
        map.removeSource(idToRemove);
    }
}

//showPath()
//
//This function shows the path of the airports.
//
//returns: This function returns nothing.
function showPath() {
    let object = {
        type: "geojson",
        data: {
            type: "Feature",
            properties: {},
            geometry: {
                type: "LineString",
                coordinates: []
            }
        }
    };
    for (let j = 0; j < coords.length; j++) {
        object.data.geometry.coordinates.push(coords[j]);
    }
    //adds the layer for the lines
    map.addLayer({
        id: "routes",
        type: "line",
        source: object,
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#888", "line-width": 6 }
    });
}

//planPage()
//
//This function plans the trips by setting the country and updating the local storage of the trip.
//
//returns : This function returns nothing.
function planPage() {
    country = countryRef.value;
    localStorage.setItem(COUNTRY_KEY, country);
    let userTrip = new Trip("0"); //intializes a new object of Trip class and later gets overwritten
    updateLocalStorageTrip(userTrip);
    window.location = "tripPlanner.html"; //
}

//removeMarkers()
//
//This function is responsible to remove the markers whenever it's called
//
//returns: This function returns nothing.
function removeMarkers() {
    if (markers.length != 0) {
        for (let i = 0; i < markers.length; i++) {
            markers[i].remove();
        }
    }
}