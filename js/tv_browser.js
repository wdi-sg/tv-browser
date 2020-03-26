// API Docs at:
// http://www.tvmaze.com/api
var doSubmit = function(event) { 
  var input = document.querySelector('#show-search');
  var query = input.value;
  var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);
  // request.addEventListener("error", errorHandler);
  request.open("GET", "http://api.tvmaze.com/search/shows?q="+ query);
  request.send();
}

var showSelector = document.querySelector("#show-select");

var responseHandler = function() {
  console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  console.log( response );
  console.log("statusText", this.statusText);
  console.log("status", this.status)
  document.querySelector("#show-detail").innerHTML = this.responseText;
  for (var i = 0; i < response.length; i++){
    var showName = response[i].show.name;
    var option = document.createElement("option");
    option.innerHTML = showName;
    showSelector.appendChild(option);
  }
};

// var errorHandler = function() {
//   console.log("response text", this.responseText);
//   // var response = JSON.parse( this.responseText );
//   console.log( response );
//   console.log("statusText", this.statusText);
//   console.log("status", this.status)
//   document.querySelector("#show-detail").innerHTML = this.responseText;
// };

document.querySelector("#submit").addEventListener('click', doSubmit);