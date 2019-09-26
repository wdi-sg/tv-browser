// API Docs at:
// http://www.tvmaze.com/api

console.log("hello");

//global variables
var inputTrigger = document.querySelector("#submit");

// var requestForItems = function (url) {


    //create two variables for successful or failed response
    //activated when user query is logged

    var triggerEvent = function () {
        var input = document.querySelector("#show-search");
        var valueOfInput = input.value; //Definition of value: The value property sets or returns the value of the value attribute of a text field

        // make a new request
        var request = new XMLHttpRequest();

        // ready the system by calling open, and specifying the url
        //"q=lauren" means you're searching for lauren. modified it to take any input
        request.open("GET", "http://api.tvmaze.com/search/people?q=" + valueOfInput);

        var responseHandler = function() {
          console.log("response text", this.responseText);
          console.log("status text", this.statusText);
          console.log("status code", this.status);
          var myResponse = JSON.parse( this.responseText );
          console.log( myResponse );
        };

        var requestFailed = function() {
          console.log("response text", this.responseText);
          console.log("status text", this.statusText);
          console.log("status code", this.status);
        };

        // listen for the request response
        request.addEventListener("load", responseHandler);
        request.addEventListener("error", requestFailed);

        // send the request
        request.send();
};

submit.addEventListener('click', triggerEvent);