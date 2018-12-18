// API Docs at:
// http://www.tvmaze.com/api

// what to do when we receive the request
var response = [];
var search;


window.onload = function() {
    document.querySelector("button").addEventListener('click', submit);
}

function submit() {
    var input = document.querySelector("#show-search");
    search = input.value;
    console.log(search);

    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);
    request.addEventListener("error", requestFailed);

    // ready the system by calling open, & specifying the url with search value
    request.open("GET", ("http://api.tvmaze.com/search/shows?q=" + search));

    // send the request
    request.send();

    var requestFailed = function(){
      console.log("response text", this.responseText);
      console.log("status text", this.statusText);
      console.log("status code", this.status);
    };
}

var responseHandler = function() {
      console.log(this.responseText);
      response = JSON.parse( this.responseText );
      console.log( response );
      resultSearch();
    };

function resultSearch () {
    for ( var i = 0; i < response.length; i++) {
        var options = document.createElement("option");
        options.textContent = response[i].show.name;
        document.querySelector("#show-select").appendChild(options);
    }
}