// API Docs at:
// http://www.tvmaze.com/api
//var optsArr = [];

var responseHandler = function() {
  console.log("response text", this.responseText);
  var respOfShows = JSON.parse( this.responseTexts );
  console.log( response );
};

var requestFailed = function(){ //function to call if request fails
  console.log("response text", this.responseText);
  console.log("status text", this.statusText);
  console.log("status code", this.status);
};

var linkToPage = function(){
	var request = new XMLHttpRequest(); //create a new request
	request.addEventListener("load", responseHandler); 
	request.open("GET", "url");//specify the url and opening to send and receive
	request.addEventListener("error", requestFailed);
	request.send(); //to send request
	 };

var firstOpt = document.getElementById('firstOpt');
var userInput = document.getElementsByTagName('input')[0];
var selection = document.getElementById('show-select');
var addAnewOpt = function() {
	var actualShows = document.createElement('option');
	actualShows.setAttribute("value", "");
	firstOpt.innerText = "Shows matching " +userInput.value+ "...";
	//if userInput has part of the name of the respOfShows
	respOfShows.forEach(function(element){
		var match = element.includes(userInput);
		if (match == true) {
			actualShows.textContent = respOfShows;
			selection.appendChild(actualShows);
		}
});
}
var submitBtn = document.getElementsByTagName('button')[0];
submitBtn.addEventListener('click', addAnewOpt);


//actualShows.addEventListener('click', linkToPage);













