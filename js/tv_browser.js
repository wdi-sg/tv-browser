// API Docs at:
// http://www.tvmaze.com/api

//Use the input to get the search term from the user.
//Display the results in the dom.

// Pseudo-code
// 3)Wait for request
var responseHandler = function(){
  document.getElementById("show-detail").textContent = this.responseText;
}
var errorHandler = function(){
  document.getElementById("show-detail").textContent = this.statusText;
}
// 4)Retrieve request
var sendRequest = function(url){
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);
  request.addEventListener("error", errorHandler);
  request.open("GET", url);
  request.send();
}
// 1)Get input from search
var onBtnClick = function(){
  var input = document.getElementById("show-search");
  var searchInput = input.value;
  var url = 'http://api.tvmaze.com/search/shows?q=' + encodeURIComponent(searchInput);
  sendRequest(url);
  // displayResult(url);
}
// 2)Submit button sends the request to the server
document.getElementById("btn").addEventListener("click", onBtnClick);

// var displayResult = function(url){
//   var display = document.createElement("p");
//   display.innerText = Object.url;
// }


// 5)Display request in the dropdown list
