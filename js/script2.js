window.onload = function(){
// API Docs at:
// http://www.tvmaze.com/api	
var tvNames;
// what to do when we recieve the request
var responseHandler = function() {
  console.log("response text", this.responseText);
  tvNames = JSON.parse( this.responseText );
  console.log( tvNames );
};
// make a new request
var request = new XMLHttpRequest();

function doSubmit(event){ 

 	var input = document.querySelector('#show-search'); 
 	var part = input.value; 
 	var url = "https://api.twitter.com/1.1/search/tweets.json?q="+part;

	// ready the system by calling open, and specifying the url
	request.open("GET", url);
	
	// send the request
	request.send();

 };

document.querySelector('#submit').addEventListener('click', doSubmit);

// ready the system by calling open, and specifying the url

var requestFailed = function(){
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

// listen for the request response	
request.addEventListener("load", responseHandler);
request.addEventListener("error", requestFailed);







}