// API Docs at:
// http://www.tvmaze.com/api


// window.onload=runCode;

var myShowData = {};

var doSubmit = function(event){  };
document.querySelector('#submit').addEventListener('click', runCode); 

var responseHandler = function() {
  // console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  console.log( response);

var showOption = document.getElementById('show-select');
// output each bit of show info to the DOM/HTML
for (var i = 0; i < response.length; i++) {
 	console.log( "id: " + response[i].show.id + " name: " + response[i].show.name );
 	myShowData.push('id:' + response[i].show.id)
 //
 // output show detail
    var showList = document.createElement('option');
	showList.setAttribute('value', response[i].show.id);
	showList.textContent = response[i].show.name;
	showOption.appendChild(showList);
}
document.querySelector('#show-select').addEventListener('change', displayTvShow); 
};

// place options after search form (or other area)
// choose option and post the full data on the show- title, image and description.

var displayTvShow = function () {
	var input = document.querySelector('#show-select'); 
	console.log ('input value: ' + inputValue)
	// display info on screen
	var outputShow = 
	// document.getElementById('show-detail').innerHTML = timerChange;
}

function runCode (){
// make a new request
var input = document.querySelector('#show-search'); 
var inputValue = input.value;
var request = new XMLHttpRequest();

// listen for the request response
request.addEventListener("load", responseHandler);
request.addEventListener("error", requestFailed);

// ready the system by calling open, and specifying the url
request.open("GET", "http://api.tvmaze.com/search/shows?q="+inputValue);
// send the request
request.send();
}

var requestFailed = function(){
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

