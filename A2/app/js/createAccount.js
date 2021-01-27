/** 
 * createAccount.js 
 * This file contains only 1 function:
 * createAccount()
 * and code that runs on load for createAccount.html
 */
"use strict";
//createAccount()   
//
//This function is responsible for creating an account for the user. We are getting the name, emailId, 1 password for first time and the second password for 
//confirming that this is what the user wanted to enter. If both of these passwords aren't equal, then we show an error otherwise  we add that account, with the 
//details specified by the user using the add account function of the AccountList class. Then, we are setting the name, password and then the trip selected by the 
//user. Then we have updated the local storage with the trip, account and that of the user. We then redirected it to the index.html page. Once we create an account
//the trip is stored in the user and so it isn't needed anymore at tripLocalData, so we have set it to a blank string.
//
//returns: This function returns nothing
function createAccount()
{
        let nameRef  = document.getElementById("name");
        let emailIdRef = document.getElementById("emailId1");
        let password1Ref = document.getElementById("password1");
        let password2Ref = document.getElementById("password2");
        if(password1Ref.value == password2Ref.value)
        {
            accounts.addAccount(emailIdRef.value);
            let user = accounts.getAccount(accounts.count - 1); //to get the last account
            user.name = nameRef.value;
            user.password = password1Ref.value;
            if (getDataLocalStorageTrip() != undefined)
            {
                let trip = getDataLocalStorageTrip();
                user.addTrip(trip._tripId);
                //subtracting -1 to access the last trip
                user.getTripIndex(user._trips.length -1)._country = trip._country;
                user.getTripIndex(user._trips.length -1)._date = trip._date;
                user.getTripIndex(user._trips.length -1)._start = trip._start;
                user.getTripIndex(user._trips.length -1)._end = trip._end;
                user.getTripIndex(user._trips.length -1)._stops = trip._stops;
                trip = ""; //to clear the trip local data
                updateLocalStorageTrip(trip);
            }
            updateLocalStorageUser(user)
            updateLocalStorageAccount(accounts); //updating the new accounts array into the local storage
            alert("Account created successfully");
            window.location = "index.html"; 
        }
        else
        {
            alert("ERROR! Password does not match");
        }
}
//updating the created account on page load
let data = getDataLocalStorageAccount();
accounts.fromData(data);