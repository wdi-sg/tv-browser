window.onload = function(){
// API Docs at:
// http://www.tvmaze.com/api	

var dataObj;
// what to do when we recieve the request
var responseHandler = function() {
  console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  console.log( response );
  for (var i=0;i<response.length;i++){
  	if(response[i].show.image != null){
  		var newImg = document.createElement("IMG");
  		newImg.setAttribute("src",response[i].show.image.original)
  		newImg.setAttribute("class","contentImg");
  		document.getElementById("show-detail").appendChild(newImg);
  	}
  	var newDiv = document.createElement("div");
  	newDiv.setAttribute("class","contentDiv");
  	newDiv.innerHTML = "NAME: "+response[i].show.name.toUpperCase();
  	document.getElementById("show-detail").appendChild(newDiv);
  	var newOpt = document.createElement("option");
  	newOpt.setAttribute("value",response[i].show.name);
  	newOpt.innerHTML = response[i].show.name;
  	document.getElementById("show-select").appendChild(newOpt);
  }
};
// make a new request
var request = new XMLHttpRequest();

function doSubmit(event){ 
 	var input = document.querySelector('#show-search'); 
 	var part = input.value; 
 	var url = "http://api.tvmaze.com/search/shows?q="+part;

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