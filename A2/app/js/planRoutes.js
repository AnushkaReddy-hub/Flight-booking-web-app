/** 
 * planRoutes.js 
 * This file contains the following functions :
 * showSummary()
 * removeRoute(i)
 * finishTrip()
 * code for displaying maps with specifications
 */

"use strict";
//Checking Country localstorage for homepage -> tripplanner transition'

let countryRef = document.getElementById("countries");
let countriesOutput = "";
for (let i = 0; i < countryData.length; i++) {
    countriesOutput += `<option value="${countryData[i]}">${countryData[i]}</option>`
}
countryRef.innerHTML = countriesOutput; //for displaying

let countryStorage=localStorage.getItem(COUNTRY_KEY); //for getting the country
let country=""; //a variable to store the country

if (countryStorage!=undefined)
{
    countryRef.value=countryStorage;
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

window.onload = getAirportData();

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
    country = countryRef.value
    let url = "https://eng1003.monash/OpenFlights/airports/";
    let data = {
        country: `${country}`,
        callback: "viewAllRoutes"
    }
    webServiceRequest(url, data);
}

//getRouteData()
//
//This function is responsible to get the airport route data once the airport is selected out of the ROUTES API. That's one of the difference between the viewallroutes
//and viewroutes4.js. It calls the web service request with the url of route and the airport selected.
//
//returns: This function returns nothing.
function getRouteData(airportId) {
    let url = "https://eng1003.monash/OpenFlights/routes/";
    let data = {
        sourceAirport: `${airportId}`,
        callback: "showRoutes"
    }
    webServiceRequest(url, data);
}

//panToAirport()
//
//This function is created to pan to the selected airport. We are getting the selected airports by "airports" id and getting it's value. We've called the 
//removeMarkers function to remove all the markers and then we add the marker for the selected airport inside of the for loop
//
//returns: This function returns nothing.
function panToAirport()
{
    let airportList = document.getElementById("airports");
    let airportVal = airportList.value;
    if (airportVal != 0){
        removeMarkers()
        for (let i = 0; i < airports.length; i++) {
            if (airportVal == airports[i].name) 
            {
                let marker = new mapboxgl.Marker({ "color": "rgb(255,193,7)" })
                markers.push(marker);
                let latitude = airports[i].latitude;;
                let longitude = airports[i].longitude;;
                let coordinates = [longitude, latitude];
                marker.setLngLat(coordinates);
                marker.addTo(map);
                let description = `<h3>Airport: ${airports[i].name}<br></h3>
                <h3>City: ${airports[i].city} <h3>`;
                let popup = new mapboxgl.Popup({offset: 45});
                popup.setHTML(description);
                marker.setPopup(popup);
                map.panTo([airports[i].longitude, airports[i].latitude]);
                getRouteData(airports[i].airportId)
            }
        }
    }
    
}


//showRoutes(result)
//
//This function is responsible to get the route data out of the ROUTES API. It calls the web service request with the url of route and the country selected by the 
//user to come up with the data of all the routes of that country.
//
//returns: This function returns nothing.
function showRoutes(result) {
    
    routes = [];
    coords = [];
    let startCoords = [];
    let endCoords = [];
    for (let i = 0; i < result.length; i++) { 
        let routeId = i;
        let route = new Route(routeId)
        route._airline = result[i].airline;
        route._equipment = result[i].equipment;
        
    
        for (let j = 0; j < airports.length; j++)
        {

            if (result[i].sourceAirportId == airports[j].airportId)
            {
                startCoords = [airports[j].longitude, airports[j].latitude];
                startAirport = airports[j];
                route._start = startAirport;
            }
            if (result[i].destinationAirportId == airports[j].airportId)
            {
                endCoords = [airports[j].longitude, airports[j].latitude];
                endAirport = airports[j];
                route._end = endAirport;
                routeDetails = result[i];
                let marker = new mapboxgl.Marker({ "color": "rgb(255,193,7)" })
                markers.push(marker);
                let latitude = airports[j].latitude;;
                let longitude = airports[j].longitude;;
                let coordinates = [longitude, latitude];
                marker.setLngLat(coordinates);
                marker.addTo(map);
                let description = `<h3>Airport: ${airports[j].name}<br></h3>
                <h3>City: ${airports[j].city} <h3>`;
                let popup = new mapboxgl.Popup({offset: 45});
                popup.setHTML(description);
                marker.setPopup(popup);

                routes.push(route)
                
            } 
        }
        
        //condition to check if it's international or domestic
        if (startCoords.length != 0 && endCoords.length != 0) {
            coords.push(startCoords)
            coords.push(endCoords);
        }
    }
    
    removeLayerWithId("routes")
    showPath()
    let routeList = document.getElementById("routes");
        let routeOutput = `<option value="0"></option>`;
        for (let k = 0; k < routes.length; k++) {
            routeOutput += `<option value="${k}">${routes[k].airline}, ${routes[k]._end.name}</option>`
        }
        routeList.innerHTML = routeOutput; 
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
			properties: {
                description: ""
            },
			geometry: {
				type: "LineString",
				coordinates: []
			}
		}
	};

    //let airportRoutes = [];
	for (let i=0; i<coords.length;i++){
    object.data.geometry.coordinates.push(coords[i]);
    
    }
	

	map.addLayer({
		id: "routes",
		type: "line",
		source: object,
		layout: { "line-join": "round", "line-cap": "round" },
		paint: { "line-color": "#888", "line-width": 6 }
    });

}

map.on('click', "routes", function (e) {      
    let description = `
    <div class="mdl-dialog__content">
    <span class="route-header">ROUTE DETAILS</span>
      <div class = "mdl-grid">
          
          <div class = "mdl-cell mdl-cell--4-col">  
          
          <div class = "mdl-cell mdl-cell--8-col route-details">  
          <ul class="demo-list-icon mdl-list">
                <li class="mdl-list__item" route-details> 
           
          <span class="route-span"><i class="material-icons material-icons-large mdl-list__item-icon">flight_takeoff</i> ${startAirport.city}
                  </span> </li>
              </ul>
              
          
            
          </div>
      </div>
    </div>
        `         
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(description)
      
      
      .addTo(map);
    
});

function viewAllRoutes(result)
{
    airports = result;
    removeMarkers()
    map.panTo([airports[0].longitude, airports[0].latitude])   

    for (let i = 0; i < airports.length; i++) {
        let marker = new mapboxgl.Marker({ "color": "rgb(255,193,7)" })
        markers.push(marker);
        let latitude = airports[i].latitude;;
        let longitude = airports[i].longitude;;
        let coordinates = [longitude, latitude];
        marker.setLngLat(coordinates);
        marker.addTo(map);
            let description = `<h3>Airport: ${airports[i].name}<br></h3>
            <h3>City: ${airports[i].city} <h3>`;
            let popup = new mapboxgl.Popup({offset: 45});
            popup.setHTML(description);
            marker.setPopup(popup);
            getRouteData(airports[i].airportId)
        }

        let airportList = document.getElementById("airports");
        let airportOutput = `<option value="0"></option>`;
        for (let i = 0; i < airports.length; i++) {
            airportOutput += `<option value="${airports[i].name}">${airports[i].name}</option>`
        }
        airportList.innerHTML = airportOutput;   
         
}

//removeMarkers()
//
//This function is responsible to remove the markers whenever it's called
//
//returns: This function returns nothing.
function removeMarkers()
{
    if (markers.length != 0)
    {
        for (let i = 0; i < markers.length;i++)
        {
            markers[i].remove();
        }
    }
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



function addRoute()
{
    let routeRef = document.getElementById("routes")
    let routeVal = routeRef.value;
    
    if (confirm("Do you want to add this route to your trip?"))
    {
        let trip = getDataLocalStorageTrip();

    for (let i = 0;i < routes.length; i++)
    {
        
        if (routeVal == i)
        {
            let route = new Route(i)
            route._start = routes[i]._start;
            route._end = routes[i]._end;
            route._equipment = routes[i]._equipment;
            route._airline = routes[i]._airline;
            trip._routes.push(route)
            updateLocalStorageTrip(trip)
            let airportRef = document.getElementById("airports")
            airportRef.value = route._end.name;
            panToAirport()
        }
    }
    
    }
}
