/** 
 * scheduledTrips.js 
 * This file contains the following functions-
 * removeTrip(i)
 * confirmRemove(i)
 * code to replace empty table in scheduledTrips.html
 */
"use strict";
//code to replace empty table in scheduledTrips.html
let scheduledRef = document.getElementById("scheduled-trips")
//to replace empty table in html with header row
let output = `<tr>
    <td>COUNTRY</td>
    <td>DATE</td>
    <td>DETAILS</td>
    <td>CANCEL</td>
    </tr>`
  ;
let user = ""; //to empty the user variable as it's a temporary variable to store
//to get the current logged in user
for (let i = 0; i < accounts._accounts.length; i++) {
  user = getDataLocalStorageUser();
  let emailId = user._emailId;
  if (accounts._accounts[i]._emailId == emailId) {
    user = accounts._accounts[i];
    updateLocalStorageUser(user) //stores the current user
  }
}
//date check, only show trips >= today
if (user != "") { //if any user is logged in, it will go inside of the if statement
  for (let i = 0; i < user._trips.length; i++) {
    let trip = user._trips[i];
    let tripDate = new Date(trip._date) //creating a Date class object
    if (tripDate >= new Date()) { //for comparing today's date with the date user selected
      //to input new row in the country/date into columns in previoustrips.html
      output += `<tr>
    <td class="mdl-data-table__cell--non-numeric">${trip._country}</td>
    <td>${trip._date}</td>
    <td onclick="showSummary(${i})" class="show-dialog2 icon-align"> 
    <i class="material-icons material-icons-white mdl-list__item-avatar">flight</i></td>
    <td class="icon-center"><button onclick="removeTrip(${i})" class="show-dialog1 mdl-button mdl-js-button mdl-button--raised icon-center">
         <i class="material-icons material-icons-cancel">close</i></button></td>
    </tr>`;
    }
  }
  scheduledRef.innerHTML = output; //for displaying
}

//removeTrip(i)
//
//This function is for removing the Trip whose index is passed.
//
//returns: This function returns nothing.
function removeTrip(i) {
  let trip = user._trips[i]; //to get the user's trips from userlocaldata
  let cancelRef1 = document.getElementById("cancelled-trip") //gets details of the trip
  let cancelRef2 = document.getElementById("remove-trip") //shows the cancel dialog
  let output1 = ""; //since it is a temporary variable
  let output2 = ""; //since it is a temporary variable
  //to get the details of ith trip
  output1 += `
    <thead>
      <tr>
        <th class="mdl-data-table__cell--non-numeric table-country-header">${trip._country}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="mdl-data-table__cell--non-numeric">${trip._date}</td>
      </tr>
    </tbody>`;
  //to display the confirm remove button
  output2 += ` <button onclick="confirmRemove(${i})" class="mdl-button-confirmButton mdl-js-button mdl-button--raised mdl-button--colored">
    CONFIRM
  </button>`
  cancelRef1.innerHTML = output1; //for displaying
  cancelRef2.innerHTML = output2; //for displaying
}

//confirmRemove(i)
//
//This function is for making the confirm remove button work. Removes that trip using the function of Account class. Then updates the Local Storage User and Local 
//Storage Account It redirects to scheduledTrips.html.
//
//returns: This function returns nothing.
function confirmRemove(i)
{
  for (let i=0;i<accounts._accounts.length;i++)
  {
      let emailId = user._emailId;
      if (accounts._accounts[i]._emailId == emailId)
      {
          user = accounts._accounts[i];
          updateLocalStorageUser(user)
      }
  }
    user.removeTrip(i);
    
    updateLocalStorageUser(user);
    updateLocalStorageAccount(accounts);
    window.location = "scheduledTrips.html";
}

function showSummary(i) {
  let trip = user._trips[i];

  let summaryCountry = `Country: <br> ${trip._country}`
  let summaryCountryRef = document.getElementById("summary-country")
  summaryCountryRef.innerHTML = summaryCountry;

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

  ////Adds Routes to the scrollable table in the Trip Summary
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
  </tr>`
      }
      routeRef.innerHTML = output;
  }
  updateLocalStorageTrip(trip);
}