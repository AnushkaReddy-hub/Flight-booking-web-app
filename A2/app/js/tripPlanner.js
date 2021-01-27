/** 
 * tripPlanner.js 
 * This file contains the following functions :
 * showSummary()
 * removeRoute(i)
 * finishTrip()
 */
//showSummary()
//
//This function is for showing the summary of the trip. We are getting that trip from the Local Storage Trip and storing in a variable, Trip. Then we are displaying
//that trip's country, date, start, end and stops.
//
//returns: This function returns nothing.
"use strict";
function showSummary() {
    let trip = getDataLocalStorageTrip()

    let countryRef = document.getElementById("countries")
    trip._country = countryRef.value;
    let summaryCountry = `Country: <br> ${trip._country}`
    let summaryCountryRef = document.getElementById("summary-country")
    summaryCountryRef.innerHTML = summaryCountry;

    let dateRef = document.getElementById("date")
    trip._date = dateRef.value;
    let summaryDate = `Date: <br> ${trip._date}`
    let summaryDateRef = document.getElementById("summary-date")
    summaryDateRef.innerHTML = summaryDate;

    let summaryStart = `Start: <br> ${trip._start}`
    let summaryStartRef = document.getElementById("summary-start")
    summaryStartRef.innerHTML = summaryStart;

    let summaryEnd = `End: <br> ${trip._end}`
    let summaryEndRef = document.getElementById("summary-end")
    summaryEndRef.innerHTML = summaryEnd;

    let summaryStops = `Stops: <br> ${trip._stops}`
    let summaryStopsRef = document.getElementById("summary-stops")
    summaryStopsRef.innerHTML = summaryStops;

    //Adds Routes to the scrollable table in the Trip Summary
    if (trip._routes.length > 0) {
        trip._start = trip._routes[0]._start.name;
        trip._end = trip._routes[trip._routes.length - 1]._end.name;
        trip._stops = trip._routes.length - 1;

        let routeRef = document.getElementById("routeLists")
        let output = "";
        for (let i = 0; i < trip._routes.length; i++) {
            output += `<tr>
    <td class="mdl-data-table__cell--non-numeric"><span class="mdl-list__item-primary-content">
    <i class="material-icons material-icons-large material-icons-summary mdl-list__item-avatar">flight</i></span></td>
    <td><span>${trip._routes[i]._start.name}-${trip._routes[i]._end.name}</span></td>
    <td class="mdl-data-table__cell--date">
    <a class="mdl-list__item-secondary-action" href="#" onclick="removeRoute(${i})"><i class="material-icons">close</i></a></td>
    </tr>`
        }
        routeRef.innerHTML = output;
    }
    updateLocalStorageTrip(trip);
}

//removeRoute(i)
//
//This function is for removing the passed index route in the routes array of the trip. We are getting that trip from the Local Storage Trip and then removing it 
//using splice. Then updating the new trip and setting the country for panning to a different country. Then we redirect the user.
//
//returns: This function returns nothing.
function removeRoute(i) {
    let trip = getDataLocalStorageTrip()
    trip._routes.splice(i, trip._routes.length - i)
    updateLocalStorageTrip(trip)
    localStorage.setItem(COUNTRY_KEY, country) //Because while reloading the page, this makes sure that the country in the box is the same as the user just selected
    window.location = "tripPlanner.html"
}

//finishTrip()
//
//This function is created to finish the trip by adding the date and finalizing the trip by adding the trip to the user. For example if the user forgets to add date, it will throw an 
//alert to enter it and if the user enters it then it will restore that trip from Local Storage of Trip. 
//
//returns: This function returns nothing.
function finishTrip() {
    let dateRef = document.getElementById("date");
    if (dateRef.value == undefined || dateRef.value == "" || dateRef.value == null) {
        alert("Please select a date for your trip");
    }
    else {
        //to restore the trip of that particular user who is logged in
        let trip = getDataLocalStorageTrip();
        if (getDataLocalStorageUser() != undefined && getDataLocalStorageUser() != null && getDataLocalStorageUser() != "") {
            let user;
            for (let i = 0; i < accounts._accounts.length; i++) {
                user = getDataLocalStorageUser();
                let emailId = user._emailId;
                if (accounts._accounts[i]._emailId == emailId) {
                    user = accounts._accounts[i];
                    updateLocalStorageUser(user); //for updating the user with the trip
                }
            }
            //the user will go inside this if loop if there's a trip in Local Storage
            if (getDataLocalStorageTrip() != undefined && getDataLocalStorageTrip() != null) {
                //to add the trip to the user
                user.addTrip(trip._tripId);
                user.getTripIndex(user._trips.length - 1)._country = trip._country;
                user.getTripIndex(user._trips.length - 1)._date = trip._date;
                user.getTripIndex(user._trips.length - 1)._start = trip._start;
                user.getTripIndex(user._trips.length - 1)._end = trip._end;
                user.getTripIndex(user._trips.length - 1)._stops = trip._stops;
                user.getTripIndex(user._trips.length - 1)._routes = trip._routes;
                trip = ""; //the trip variable acts as a temporary variable
                updateLocalStorageTrip(trip); //for updating
            }
            updateLocalStorageUser(user); //for updating
            updateLocalStorageAccount(accounts); //for updating
            window.location = "scheduledTrips.html"; //for redirecting
        }
        //This else statement because if no one is logged in, they have to go login first & then they can add the trip
        else {
            updateLocalStorageTrip(trip);
            window.location = "login.html";
        }
    }
}