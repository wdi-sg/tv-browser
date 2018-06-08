// API Docs at:
// http://www.tvmaze.com/api

//var optsArr = [];
var responseHandler = function() {
  console.log("response text", this.responseText);
  var response = JSON.parse( this.responseText );
  console.log( response );
};

var requestFailed = function(){
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

var linkToPage = function(){
	var request = new XMLHttpRequest();
	request.addEventListener("load", responseHandler); 
	request.open("GET", "url");
	request.addEventListener("error", requestFailed);
	request.send();
	 };

var userInput = document.getElementsByTagName('input')[0];
var selection = document.getElementById('show-select');
var addAnewOpt = function() {
	var newOpt = document.createElement('option');
	newOpt.setAttribute("value", "");
	newOpt.textContent = userInput.value
	selection.appendChild(newOpt);
	//newOpt.addEventListener('click', linkToPage);
}
var submitBtn = document.getElementsByTagName('button')[0];
submitBtn.addEventListener('click', addAnewOpt)
















