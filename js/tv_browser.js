// API Docs at:
// http://www.tvmaze.com/api

// what to do when we recieve the request
var responseHandler = function() {
  // console.log("response text", this.responseText);
  // console.log("status text", this.statusText);
  // console.log("status code", this.status);

  var response = JSON.parse(this.responseText);
  console.log(response);

  //do all your response data manipulation
for(var i = 0; i < response.length; i++){
    console.log(response[0].show.name)

  var getShow = response[i].show.name
  var createOption = document.createElement("option")

createOption.innerText = getShow;

document.querySelector("#show-select").appendChild(createOption);

    }
};

var doSubmit = function(event){
    var input = document.querySelector('#show-search');
    var showSearch = input.value;

    // make a new request
var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url
request.open("GET", "http://api.tvmaze.com/search/shows?q=" + showSearch);

// send the request
request.send();
};

document.querySelector('#submit').addEventListener('click', doSubmit);


var responseHandler2 = function() {
  // console.log("response text", this.responseText);
  // console.log("status text", this.statusText);
  // console.log("status code", this.status);

  var response = JSON.parse(this.responseText);
  console.log(response);

  //do all your response data manipulation
for(var i = 0; i < response.length; i++){
    console.log(response[0])

  var getDetails = response[i];
  var createDiv = document.createElement("div");

createDiv.innerText = getDetails;

document.body.appendChild(createDiv);

    }
};


var doSubmit2 = function(event){
    var input = document.querySelector('option');
    var showDetails = input.innerText;

    // make a new request
var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", responseHandler);

// ready the system by calling open, and specifying the url
request.open("GET", "http://api.tvmaze.com/search/shows?q=" + showDetails + "&embed=episodes");

// send the request
request.send();
};

document.querySelector('#show-select').addEventListener('change', doSubmit2);