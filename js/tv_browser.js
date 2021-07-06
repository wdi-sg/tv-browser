// API Docs at:
// http://www.tvmaze.com/api

window.onload = function() {
    // what to do when we recieve the request
    var doRequest = function(event){
        var input = document.getElementById('show-search');
        var link = input.value
        request.open("GET", "http://api.tvmaze.com/search/shows?q=" + link);
        request.send();
}
var responseHandler = function() {
    var response = JSON.parse( this.responseText );
    console.log( response );
    var request = new XMLHttpRequest();
};

var request = new XMLHttpRequest();

document.querySelector('#submit').addEventListener('click', doRequest);
request.addEventListener("load", responseHandler);

}