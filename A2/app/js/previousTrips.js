/** 
 * previousTrips.js 
 * code for running 1 dialog
 */
"use strict";
//for getting all the previous trips which tells which element in the html we want to replace with the trips. 
//In this case, we are replacing previousTrips with the table refrenced with the id previous-trips in previousTrips.html
let previousRef = document.getElementById("previous-trips")
//replaces empty table in html with header row
let output = `<tr>
<td>COUNTRY</td>
<td>DATE</td>
<td>DETAILS</td>
</tr>
`;
let user;
//to get the current logged in user, running a for loop
for (let i=0;i<accounts._accounts.length;i++)
  {
    user = getDataLocalStorageUser();
    let emailId = user._emailId;
    if (accounts._accounts[i]._emailId == emailId)
    {
      user = accounts._accounts[i];
      updateLocalStorageUser(user)
    }
  }

if (user != ""){
//to check the date and only show trips < today as we want to show previous trips
for (let i = 0; i < user._trips.length; i++) {
  let trip = user._trips[i];
  let tripDate = new Date(trip._date) //creating a Date class object
  if (tripDate < new Date()) { //for comparing today's date with the date user selected
    //to input new rows below header - country/date into columns
    // to get details of ith trip
    output += `
    <tr>
    <td class="mdl-data-table__cell--non-numeric">${trip._country}</td>
    <td>${trip._date}</td>
    <td onclick="showSummary(${i})" class="show-dialog1 icon-align"> 
    <i class="material-icons material-icons-white mdl-list__item-avatar">flight</i></td>
    </tr>`;
  }
}
previousRef.innerHTML = output; //for displaying
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