// API Docs at:
// http://www.tvmaze.com/api

var url = "";

var response = [];

var displayResults = function(response){
  console.log('hi');
  console.log(response);
  for (var i = 0; i< response.length; i++){
    console.log(response[i].show.name);
  }
}

var submitRequest = function(event){
  var searchTerm = document.querySelector('#show-search').value;

  console.log(searchTerm);

  url = "http://api.tvmaze.com/search/shows?q=" + searchTerm;
  console.log(url);

  // what to do when we recieve the request
  var responseHandler = function() {
    // console.log("response text", this.responseText);
    // console.log("status text", this.statusText);
    // console.log("status code", this.status);

    response = JSON.parse( this.responseText);

    // return response;
    displayResults(response);
    };

  // make a new request
  var request = new XMLHttpRequest();

  // listen for the request response
  request.addEventListener("load", responseHandler);
  request.addEventListener("error", responseHandler);

  // ready the system by calling open, and specifying the url
  request.open("GET", url);

  // send the request
  request.send();


}

var submitBtn = document.querySelector('#search-btn');

submitBtn.addEventListener('click',submitRequest);
