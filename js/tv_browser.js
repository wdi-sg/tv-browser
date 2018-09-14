// API Docs at:
// http://www.tvmaze.com/api

// console.log("hello");

var body = document.querySelector('show-detail');

window.onload = function() {
    // what to do when we recieve the request

    var responseHandler = function() {

      // console.log("response text", this.responseText);

      var response = JSON.parse( this.responseText );

      console.log( response );

    };

    var doSomething = function(event){

        var input = document.querySelector('#show-search');

        var url = ('http://api.tvmaze.com/search/shows?q=' + input.value);

        var urlRequest = new XMLHttpRequest();

        urlRequest.addEventListener('load', responseHandler);

        urlRequest.open("GET", url);

        // send the request
        urlRequest.send();
    };

    document.querySelector("#submit").addEventListener('click', doSomething);
};