// API Docs at:
// http://www.tvmaze.com/api


var doSubmit = function(event){
    var input = document.querySelector('#show-search');
    var searchField = input.value;


    // make a new request
var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", responseHandler);


// ready the system by calling open, and specifying the url
request.open("GET", url);

// send the request
request.send();

}

document.querySelector('button').addEventListener('click', doSubmit);