// API Docs at:
// http://www.tvmaze.com/api

// what to do when we recieve the request
var responseHandler = function() {
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

// Make a new request
var request = new XMLHttpRequest();

// Listen for the request response
request.addEventListener("load", responseHandler);

// Define the function to execute when user click button
var searchAPI = function(event) {

    // Which is the element that we are targeting at?
    var inputSearch = document.querySelector('#show-search');

    // Get the value that user input
    var searchTerm = inputSearch.value;

    // Check if can get search term correctly
    console.log("User wants to search for " + searchTerm);

    // Ready the system by calling open, and specifying the URL
    request.open("GET", "http://api.tvmaze.com/search/shows?q=" + searchTerm);

    // send the request
    request.send();

};

// Define the event listener on click button
document.querySelector('button').addEventListener('click', searchAPI);