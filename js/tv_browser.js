// API Docs at:
// http://www.tvmaze.com/api

var responseHandler = function() {
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};


window.onload = function() {

    // make a new request
var request = new XMLHttpRequest();


request.addEventListener("error", responseHandler);
request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url
request.open("GET", "http://tvmaze.com/api");

// send the request
request.send();
}