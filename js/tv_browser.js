// API Docs at:
// http://www.tvmaze.com/api

window.onload = function() {
    // what to do when we recieve the request

var responseHandler = function() {
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};


    var doRequest = function(){

    var userInput = document.querySelector('#show-search');

    var id = userInput.value;

    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    request.open("GET", "http://www.tvmaze.com/search?q="+id);


    request.send();

}

    document.querySelector('#submit').addEventListener('click', doRequest);
}