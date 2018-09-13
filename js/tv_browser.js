// API Docs at:
// http://www.tvmaze.com/api



var doSubmit = function(event) {
  var input = document.querySelector('#show-search'); 
  var url = "http://api.tvmaze.com/search/shows?q=" + input.value; 

var responseHandler = function() {
  var response = JSON.parse(this.responseText);
  console.log(response);
};

var request = new XMLHttpRequest();
  request.addEventListener("load", responseHandler);
  request.open("GET", url);
  request.send();

};

document.querySelector("#submit").addEventListener("click", doSubmit);


