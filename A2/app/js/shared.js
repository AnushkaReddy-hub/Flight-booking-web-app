/** 
 * shared.js
 * This file contains the 4 major classes which are the backbone of the app, which is Route, Trip, Account and AccountList.
 * This file contains the following functions :
 * checkIfAccountDataExistsLocalStorage
 * updateLocalStorageAccount
 * updateLocalStorageUser
 * getDataLocalStorageAirports
 * updateLocalStorageTrip
 * getDataLocalStorageAccount
 * getDataLocalStorageUser
 * getDataLocalStorageTrip
 * This file also contains a global AccountList instance variable
 * code that will run on load here
 */

"use strict";

// Constants used as KEYS for LocalStorage
const ACCOUNTS_DATA_KEY = "accountLocalData";
const USER_DATA_KEY = "userLocalData";
const TRIP_DATA_KEY="tripLocalData";
const AIRPORTS_DATA_KEY="airportLocalData";
const COUNTRY_KEY="countryLocalData";

//A class Route to keep account of Routes of the trip
class Route
{
    // constructor (routeId) 
    //
    //This function takes one parameter routeId. This will help to create a Route class's Object.
    //Here _ means private attributes of the class. This means of this object. When defining a object, it will automatically set the _routeId to routeId, _start, 
    //_end, _equipment and _airline to a blank string.
    //
    // returns: This function does not return anything.
    constructor(routeId)
    {
        // private attributes
        this._routeId = routeId;
        this._start = "";
        this._end = "";
        this._equipment = "";
        this._airline = "";
    }

    //get routeId(), get start(), get end(), get equipment(), get airline()
    //
    //These functions are called the accessors to access the containing elements of this class.
    //
    // returns: These functions returns the following respectively _routeId, _start, _end, _equipment, _airline and _contents.
    get routeId()
    {
        return this._routeId;
    }

    get start()
    {
        return this._start;
    }

    get end()
    {
        return this._end;
    }

    get equipment()
    {
        return this._equipment;
    }

    get airline()
    {
        return this._airline;
    }

    //set routeId(id), start(sourceAirport), end(destinationAirport), equipment(type), airline(text)
    //
    //These functions are called mutators which allows to easily change the set routeId, _start to sourceAirport, end to destinationAirport, equipment to type 
    //and airline respectively of the particular object, which is taken care by this.
    //
    //returns: These functions returns nothing.
    set routeId(id)
    {
        this._routeId = id;
    }

    set start(sourceAirport)
    {
        this._start = sourceAirport;
    }

    set end(destinationAirport)
    {
        this._end = destinationAirport;
    }

    set equipment(type)
    {
        this._equipment = type;
    }

    set airline(text)
    {
        this._airline = text;
    }

    // fromData(data)
    //
    // This function to ‘restore’ the data into a class instance. It takes one parameter data, which is going to be a object.
    // 
    // returns: This functions returns nothing.
    fromData(data)
    {
        this._routeId = data.routeId;
        this._start = data._start;
        this._end = data._end;
        this._airline = data._airline;
        this._equipment = data._equipment;
    }
}
//A class Trip to keep account of Trip of the trip being planned.
class Trip
{
    //constructor (tripId) 
    //
    //This function takes one parameter tripId. This will help to create a Trip class's Object.
    //Here _ means private attributes of the class. This means of this object. When defining a object, it will automatically set the _tripId to tripId and 
    //_date, _country, _start, _end to a blank string. Since we wanted routes to be an array of routes we have set _routes to a blank array by default and _stops
    //to 0 by default. 
    //
    //returns: This function does not return anything.
    constructor(tripId)
    {
        this._tripId = tripId;
        this._date = ""; //must be added
        this._country = ""; //must be added
        this._routes = [];
        this._start = "";
        this._end = "";
        this._stops = 0;
    }

    //get tripId(), get date(), get country(), get routes(),  get start(),  get end(),stops()
    //
    //These functions are called the accessors to access the containing elements of this class.
    //
    //returns: These functions returns the following respectively _tripId, _date, _country, _routes, _start,_end and __stops.
    get tripId()
    {
        return this._tripId;
    }

    get date()
    {
        return this._date;
    }

    get country()
    {
        return this._country;
    }

    get routes()
    {
        return this._routes;
    }

    get start()
    {
        return this._start;
    }

    get end()
    {
        return this._end;
    }

    get stops()
    {
        return this._stops;
    }

    //tripId(id), date(dateType), country(countryType), routes(array), start(data), end(data), stops(data)
    //
    //These functions are called mutators which allows to easily change the set tripId, date, country, routes, start, end, stops respectively of the particular
    //object, which is taken care by this.
    //
    //returns: These functions returns nothing.
    set tripId(id)
    {
        this._tripId = id;
    }

    set date(dateType)
    {
        this._date = dateType;
    }

    set country(countryType)
    {
        this._country = countryType;
    }

    set routes(array)
    {
        this._routes = array;
    }

    set start(data)
    {
        this._start = data;
    }

    set end(data)
    {
        this._end = data;
    }

    set stops(data)
    {
        this._stops = data;
    }

    //getRouteIndex(index)
    //
    //This function is for getting the routes whose index is passed.
    //
    //returns: This function returns the routes whose index is passed.
    getRouteIndex(index)
    {
        return this._routes[index];
    }

    //addRoute(routeId)
    //
    //This function is for adding any new route with the routeId as it's parameter. It creates a new Route class instance with that particular id which is passed 
    //and stored inside a object named route. Then it pushes this object into the _routes array of this class.
    //
    //returns: This function returns nothing.
    addRoute(routeId)
    {
        let route = new Route(routeId);
        this._routes.push(route);
        this._stops = this._routes.length-1; //?
    }

    //removeRoute(routeId)
    //
    //This function is for removing the route whose id is passed. We've used a for loop to find that route whose id is passed. When that route is found, 
    //we have used splice for removing the routes of that index whose id is equal to the passed id. 
    //
    //returns: This function returns nothing.
    removeRoute(routeId)
    {
        for (let i=0; i < this._routes.length;i++)
        {
            if (this._routes[i].routeId == routeId)
            {
                this._routes.splice(i, 1); //there is only 1 item to remove from routes array.
                
            }
        }
    }

    //fromData(data)
    //
    //This function to do the following:
    //Empty out the array of routes in the Lockerlist instance. For each item (Route instance) in the array, making a new Route instance to hold the data.
    //Calling the fromData method and pass it the data for this item. Add the newly made Route to the array, routes.
    //
    // returns: This functions returns nothing.
    fromData(data)
    {
        let dataValues = data._routes;
        this._routes = [];
        this._tripId = data._tripId;
        this._date = data._date;
        this._country = data._country;
        this._start = data._start;
        this._end = data._end;
        this._stops = data._stops;
        for(let i = 0; i < dataValues.length; i++)
        {
            let route = new Route();
            route.fromData(dataValues[i]);
            this._routes.push(route);
        }
    }
}

// A class Account to help make new accounts easily.
class Account
{
    //constructor (id) 
    //
    //This function takes one parameter emailId. This will help to create a Account class's Object.
    //Here _ means private attributes of the class. This means of this object. When defining a object, it will automatically set the emailId, which will be later
    //used to identify that particular account. Moreover, _name, _password is set to a blank string and it must be added. The trips associated with this account is
    //stored in _trips array, which is set to blank array here, by default.
    //
    // returns: This function does not return anything.
    constructor(emailId)
    {
        this._emailId = emailId;
        this._name = ""; //must be added
        this._password = ""; //must be added
        this._trips = [];
    }

    //get name(), get emailId(), get password(), get trips()
    //
    //These functions are called the accessors to access the containing elements of this class.
    //
    // returns: These functions returns the following respectively _name, _emailId, _password, _trips, _color and _contents.
    get name()
    {
        return this._name;
    }

    get emailId()
    {
        return this._emailId;
    }

    get password()
    {
        return this._password;
    }

    get trips()
    {
        return this._trips;
    }

    set name(newName)
    {
        this._name = newName;
    }

    set emailId(id)
    {
        this._emailId = id;
    }

    set password(newPassword)
    {
        this._password = newPassword;
    }

    set trips(newTrip)
    {
        this._trips = newTrip;
    }

    //getTripIndex(index)
    //
    //This function is for getting the Trips whose index is passed.
    //
    //returns: This function returns the Trips whose index is passed.
    getTripIndex(index)
    {
        return this._trips[index];
    }

    //addTrip(tripId)
    //
    //This function is for adding any new Trip with the tripId as it's parameter. It creates a new Trip class instance with that particular id which is passed 
    //and stored inside a object named trip. Then it pushes this object into the _trips array of this class.
    //
    //returns: This function returns nothing.
    addTrip(tripId)
    {
        let trip = new Trip(tripId);
        this._trips.push(trip);
    }

    //removeTrip(tripId)
    //
    //This function is for removing the trip whose id is passed. We've used a for loop to find that route whose id is passed. When that route is found, 
    //we have used splice for removing the trips of that index whose id is equal to the passed id. 
    //
    //returns: This function returns nothing.
    removeTrip(i)
    {
        /*for (let i=0; i < this._trips.length;i++)
        {
            if (this._trips[i].tripId == tripId)
            {
                this._trips.splice(i, 1);
                
            }
        }*/
        this._trips.splice(i, 1);
    }


    fromData(data)
    {
        let dataValues = data._trips;
        this._trips = [];
        this._name = data._name;
        this._emailId = data._emailId;
        this._password = data._password;
        
        for(let i = 0; i < dataValues.length; i++)
        {
            let trip = new Trip();
            trip.fromData(dataValues[i]);
            this._trips.push(trip);
        }
    }
}
//Account List
class AccountList
{
    constructor()
    {
        this._accounts = [];
    }

    get accounts()
    {
        return this._accounts;
    }

    set accounts(data)
    {
        this._accounts = data;
    }

    get count()
    {
        return this._accounts.length;
    }

    getAccount(index)
    {
        return this._accounts[index];
    }

    addAccount(emailId)
    {
        let account = new Account(emailId);
        this._accounts.push(account);
    }

    //fromData(data)
    //
    //This function to do the following:
    //Empty out the array of accounts. For each item (Account instance) in the array, making a new Account instance to hold the data.
    //Calling the fromData method and pass it the data for this item. Add the newly made Account to the array, accounts.
    //
    //returns: This functions returns nothing.
    fromData(data)
    {
        let dataValues = data._accounts;
        this._accounts = [];
        for(let i = 0; i < dataValues.length; i++)
        {
            let account = new Account();
            account.fromData(dataValues[i]);
            this._accounts.push(account);
        }
    }
}


//checkIfAccountDataExistsLocalStorage()
//
//This function is responsible for checking to see if data exists in local storage at the defined key. We've first retrieved the data at the key ACCOUNTS_DATA_KEY
//and then check to see if it : exists, contains null, contains undefined, contains a blank string.
//
//returns: This functions return true if it exists and doesn't contain any of the above. Otherwise, it returns false.
function checkIfAccountDataExistsLocalStorage()
{
    let data = localStorage.getItem(ACCOUNTS_DATA_KEY);
    if (data && data !== null && data !== undefined && data !== "")
    {
        return true;
    }
    else 
    {
        return false;
    }
}


//updateLocalStorageAccount(data)
//
//This function to call whenever we make any changes to the data, and will use it to update the 'backup' in local storage. We've done this by stringifying the data,
//then storing it in localstorage using the key ACCOUNTS_DATA_KEY and setting the new string into localstorage's ACCOUNTS_DATA_KEY.
//
//returns: This function returns nothing.
function updateLocalStorageAccount(data)
{
    let jsonString = JSON.stringify(data);
    localStorage.setItem(ACCOUNTS_DATA_KEY, jsonString); 
}

//updateLocalStorageUser(data)
//
//This function to call whenever we make any changes to the data, and will use it to update the 'backup' in local storage. We've done this by stringifying the data,
//then storing it in localstorage using the key USER_DATA_KEY and setting the new string into localstorage's USER_DATA_KEY.
//
//returns: This function returns nothing.
function updateLocalStorageUser(data)
{
    let jsonString = JSON.stringify(data);
    localStorage.setItem(USER_DATA_KEY, jsonString); 
}

// updateLocalStorageTrip(data)
//
//This function to call whenever we make any changes to the data, and will use it to update the 'backup' in local storage. We've done this by stringifying the data,
//then storing it in localstorage using the key TRIP_DATA_KEY and setting the new string into localstorage's TRIP_DATA_KEY.
//
//returns: This function returns nothing.
function updateLocalStorageTrip(data)
{
    let jsonString = JSON.stringify(data);
    localStorage.setItem(TRIP_DATA_KEY, jsonString); 
}

//updateLocalStorageAirports(data)
//
//This function to call whenever we make any changes to the data, and will use it to update the 'backup' in local storage. We've done this by stringifying the data,
//then storing it in localstorage using the key AIRPORTS_DATA_KEY and setting the new string into localstorage's AIRPORTS_DATA_KEY.
//
//returns: This function returns nothing.
function updateLocalStorageAirports(data)
{
    let jsonString = JSON.stringify(data);
    localStorage.setItem(AIRPORTS_DATA_KEY, jsonString); 
}

//getDataLocalStorage()
//
//This function retrieves the data stored at ACCOUNTS_DATA_KEY. This function is responsible for retrieving data from local storage at the key ACCOUNTS_DATA_KEY and 
//storing it in a variable data. Then we are parsing it back into an object, then returning it.
//
//returns: the parsed object, Account.
function getDataLocalStorageAccount()
{
    let jsonString = localStorage.getItem(ACCOUNTS_DATA_KEY);
    let data = JSON.parse(jsonString);
    return data;
}

//getDataLocalStorageUser()
//
//This function retrieves the data stored at USER_DATA_KEY. This function is responsible for retrieving data from local storage at the key USER_DATA_KEY and 
//storing it in a variable data. Then we are parsing it back into an object, then returning it.
//
//returns: the parsed object, User.
function getDataLocalStorageUser()
{
    let jsonString = localStorage.getItem(USER_DATA_KEY);
    let data = JSON.parse(jsonString);
    return data;
}

//getDataLocalStorageTrip()
//
//This function retrieves the data stored at TRIP_DATA_KEY. This function is responsible for retrieving data from local storage at the key TRIP_DATA_KEY and 
//storing it in a variable data. Then we are parsing it back into an object, then returning it.
//
//returns: the parsed object, Trip.
function getDataLocalStorageTrip()
{
    let jsonString = localStorage.getItem(TRIP_DATA_KEY);
    let data = JSON.parse(jsonString);
    return data;
}

//getDataLocalStorageAirports()
//
//This function retrieves the data stored at AIRPORTS_DATA_KEY. This function is responsible for retrieving data from local storage at the key AIRPORTS_DATA_KEY and 
//storing it in a variable data. Then we are parsing it back into an object, then returning it.
//
//returns: the parsed information inside the Airports Data Key.
function getDataLocalStorageAirports()
{
    let jsonString = localStorage.getItem(AIRPORTS_DATA_KEY);
    let data = JSON.parse(jsonString);
    return data;
}

// Global LockerList instance variable
let accounts = new AccountList();

// code that will run on load here
// If data exists, we've retrieved the accounts data using getDataLocalStorageAccount and restore the data into the global AccountList instance variable accounts.
// then we are updating the local storage.
// If it doesn't exist, then add a single account, and update local storage account using the above function updateLocalStorageAccount with the accounts.
if (checkIfAccountDataExistsLocalStorage())
{
    let data = getDataLocalStorageAccount();
    accounts.fromData(data);
    updateLocalStorageAccount(accounts)
}
else
{
    updateLocalStorageAccount(accounts)
}