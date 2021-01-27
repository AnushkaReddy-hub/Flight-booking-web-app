/** 
 * login.js
 * 
 * This file is created to run account related functions of the user which are as follows-
 * login()
 * logout()
 * The code that runs on load
 */
"use strict";
//login()  
//
//This function is responsible for logging an account of the user which is already created. We are getting the emailId and password from the user. We have created
//a loggedIn variable to change the logout and login button as appropriate. Then, we are finding that user by running a for loop and checking the email id and the
//password entered by the user. Then we have restored the trip associated with that user. local storage with the trip, account and that of the user. We then 
//redirected the user to index.html page. Then we throw the appropriate alert. This function helps the user to login by checking if the email id and password are 
//matching with the account details. When the user logs in, the button has to change, so we have written the code for it.
//
//returns: This function returns nothing
function login()
{
    let emailIdRef = document.getElementById("emailId");
    let passwordRef = document.getElementById("password");
    let emailId = emailIdRef.value;
    let password = passwordRef.value;
    let loggedIn = false;
    for (let i = 0; i < accounts._accounts.length; i++) 
    {        
        let user = accounts.getAccount(i); //to store the latest user (in the for loop)
        
        if(user._emailId == emailId && user._password == password)
        {
            loggedIn = true;
            alert("Login successful");
            if (getDataLocalStorageTrip() != undefined)
            {
                //restoring the trip associated with that account
                let trip = getDataLocalStorageTrip();
                user.addTrip(trip._tripId);
                user.getTripIndex(user._trips.length -1)._country = trip._country;
                user.getTripIndex(user._trips.length -1)._date = trip._date;
                user.getTripIndex(user._trips.length -1)._start = trip._start;
                user.getTripIndex(user._trips.length -1)._end = trip._end;
                user.getTripIndex(user._trips.length -1)._stops = trip._stops;
                trip = "";
                updateLocalStorageTrip(trip);
            }
            updateLocalStorageUser(user);
            updateLocalStorageAccount(accounts);
            window.location = "index.html"; //for redirecting
            let loggedRef = document.getElementById("loginButton"); //the login button
        let display =  `<button onclick="logout()" 
        class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--login">
        LOGOUT
        </button>`
        loggedRef.innerHTML = display; //to change the login button into logout button when the logout is clicked
        }
        
    }
    if (loggedIn == false) //if it didn't match with any email id and password
    {
        {
            alert("ERROR! Invalid Email id and password");
        }
    }
}

//logout()
//
//This function is responsible for logging an account out, of the user which was logged in.  This function changes the logout button has to login too.
//
//returns: This function returns nothing
function logout()
{
    let j = ""; //to clear the userLocalData because that tells if someone is logged in
    updateLocalStorageUser(j); //updates it
    let loggedRef = document.getElementById("loginButton");
    let display =  `<a href="login.html"
    class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--login">
    LOGIN
</a>`
loggedRef.innerHTML = display;
window.location = "index.html";
}

//code that runs on load here
let data = getDataLocalStorageAccount(); //restores the account logged in
accounts.fromData(data);
if(getDataLocalStorageUser()!= "") //changing the logged in and logout out button as appropriate on page load
{
    let loggedRef = document.getElementById("loginButton");
    let display =  `<button onclick="logout()"
        class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--login">
        LOGOUT
        </button>`
        loggedRef.innerHTML = display;
}      
else
{
    let loggedRef = document.getElementById("loginButton");
    let display =  `<a href="login.html"
    class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-button--login">
    LOGIN
</a>`
        loggedRef.innerHTML = display;
}


