// API Docs at:
// http://www.tvmaze.com/api

window.onload = function() {

    var responseHandler = function() {
      console.log("response text", this.responseText);
      var response = JSON.parse( this.responseText );
      console.log( response );
    };

    var submitQuery = function(event) {
        var input = document.querySelector("#show-search");
        var query = input.value;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {

        }
        xhttp.open("GET", "http://api.tvmaze.com/search/shows?q=" + query);
        xhttp.send();

        xhttp.addEventListener("load", responseHandler);
    }
    document.querySelector("#submit").addEventListener("click", submitQuery);
}