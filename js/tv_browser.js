// API Docs at:
// http://www.tvmaze.com/api

var allResult = [];
var inputSearch = document.querySelector('#show-search');
var searchTerm;
var selectShowDropDown = document.querySelector('#show-select');
;
var listOfShowNames;

// what to do when we recieve the request
var responseHandler = function() {

    // Store the response text
        // The returned response text is a string, so we need to convert it back to JSON format
    allResult = JSON.parse(this.responseText);

    console.log(allResult);

    // Filter for show name
    for(var i = 0; i < allResult.length; i++) {

        listOfShowNames = document.createElement('option');

        listOfShowNames.innerHTML = allResult[i].show.name;

        selectShowDropDown.appendChild(listOfShowNames);
    }

};

// Make a new request
var request = new XMLHttpRequest();

// Listen for the request response
request.addEventListener("load", responseHandler);

var clicked = false;

// Define the function to execute when user click button
var searchAPI = function(event) {

    // Submit button is clicked
        // Set clicked = true
        // Show select element
        // Else, set clicked = false
        // Hide select element

        clicked = true;


    if(inputSearch !== "" && clicked === true) {

        console.log("User is searching... Show drop down");
        // Add hide class and hide show class to #show-select field by default
        selectShowDropDown.classList.remove('hide');
        selectShowDropDown.classList.add('show');

    } else {
        // Remove hide class and add show class to #show-select field on click Submit button
        clicked = false;
        selectShowDropDown.classList.remove('show');
        selectShowDropDown.classList.add('hide');

    }

    // Get the value that user input
    searchTerm = inputSearch.value;

    // Check if can get search term correctly
    console.log("User wants to search for " + searchTerm);

    // Ready the system by calling open, and specifying the URL
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + searchTerm);

    // send the request
    request.send();

};

// Define the event listener on click button
document.querySelector('button').addEventListener('click', searchAPI);





