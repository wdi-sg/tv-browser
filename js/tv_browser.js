// API Docs at:
// http://www.tvmaze.com/api


window.onload = function() {
  hideSelect();
};

var response=null;
var doSubmit = function(event){  };
document.querySelector('#submit').addEventListener('click', runCode); 


var hideSelect = function () { 
document.getElementById("show-select").style.visibility = "hidden";
};

var showSelect = function () { 
document.getElementById("show-select").style.visibility = "visible";
};


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


var responseHandler = function() {
  // console.log("response text", this.responseText);
 showSelect ()	
 // remove any old options
 document.getElementById('show-select').innerText = null
  response = JSON.parse( this.responseText );
  console.log( response);

var showOption = document.getElementById('show-select');
// output each bit of show info to the DOM/HTML
for (var i = 0; i < response.length; i++) {
 	console.log( "id: " + response[i].show.id + " name: " + response[i].show.name );
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
	var inputValue = input.value;
	inputValue = parseInt(inputValue);
	console.log ('input value: ' + inputValue)
	// get the proper show...
	for (var i = 0; i < response.length; i++) {
		if (response[i].show.id === inputValue ){
		 	console.log( "id: " + response[i].show.id + " name: " + response[i].show.name );
		 	var outputShow = "<h1>" + response[i].show.name + "</h1><br>\n";
		 	outputShow = outputShow + '<img src="' + response[i].show.image.medium + '"><br>';
		 	outputShow = outputShow + response[i].show.summary;
		} 

	// display info on screen

	
	document.getElementById('show-detail').innerHTML = outputShow;
	}
}


