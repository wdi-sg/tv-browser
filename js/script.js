// document.addEventListener('DOMContentLoaded', ... )
window.onload = function(){

    //document.querySelector('');

    console.log("hello");

    // what to do when we recieve the request
    var responseHandler = function() {
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
    };

    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // // ready the system by calling open, and specifying the url
    // request.open("GET", "https://swapi.co/api/people/2");

    // // send the request
    // request.send();

    var requestFailed = function(){
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
    };

    request.addEventListener("error", requestFailed);

    var doSubmit = function(event){ var input = document.querySelector('#url'); var url = input.value;

    console.log("working");

    request.open("GET", url);

    request.send();

    };

    document.getElementById("submit").addEventListener("click", doSubmit);



};