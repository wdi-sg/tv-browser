// // API Docs at:
// // http://www.tvmaze.com/api
// //var optsArr = [];





var userInput = document.getElementsByTagName('input')[0];
var firstOpt = document.getElementById('firstOpt');

// var showMatching = function(dataOfShows){
// 	firstOpt.innerText = "Shows matching " +userInput.value+ "...";

// }
var submitBtn = document.getElementsByTagName('button')[0];
var selection = document.getElementById('show-select');
;

submitBtn.addEventListener('click', function(){
	firstOpt.innerText = "Shows matching " +userInput.value+ "...";
//ajax
	var responseHandler = function() {
  //console.log("response text", this.responseText);
  	var dataOfShows = JSON.parse( this.responseText ); //access the data we just downoladed, by parsing the content that lives in the url into this variable
   	for(var i = 0; i < dataOfShows.length; i++){
   		var showOptions = document.createElement('option');
   		showOptions.innerText = dataOfShows[i].show.name;
   		selection.appendChild(showOptions);
  		//console.log( dataOfShows[i].show.name );	
  }
};

	var request = new XMLHttpRequest(); //establish a connection with the url that we specify and lets us send and receive data
	request.open('GET', 'http://api.tvmaze.com/search/shows?q=girls'); //to receive (GETTING) data from the url specified
	request.addEventListener("load", responseHandler); // and to listen for loading and do what should happend when the data is loaded
	request.send(); // to send request
	
});



// var responseHandler = function() {
//   // console.log("response text", this.responseText);
//   var respOfShows = JSON.parse( this.responseTexts ); //access the data we just downoladed
//   //console.log( response );
// };

// var requestFailed = function(){ //function to call if request fails
//   console.log("response text", this.responseText);
//   console.log("status text", this.statusText);
//   console.log("status code", this.status);
// };

// // var linkToPage = function(){
// 	var request = new XMLHttpRequest(); //create a new request
// 	request.addEventListener("load", responseHandler); //listen for the request respose
// 	request.open("GET", "http://api.tvmaze.com/search/shows?q=girls");//ready the systen by calling open and specify the url and opening to send and receive
// 	request.addEventListener("error", requestFailed);
// 	request.send(); //to send request
// 	 // };

// var firstOpt = document.getElementById('firstOpt');
// var userInput = document.getElementsByTagName('input')[0];
// var selection = document.getElementById('show-select');
// var addAnewOpt = function() {
// 	responseHandler(respOfShows);
// 	var actualShows = document.createElement('option');
// 	actualShows.setAttribute("value", "");
// 	firstOpt.innerText = "Shows matching " +userInput.value+ "...";
// 	//if userInput has part of the name of the respOfShows
// 	respOfShows.forEach(function(element){
// 		var match = element.includes(userInput);
// 		if (match == true) {
// 			actualShows.textContent = respOfShows;
// 			selection.appendChild(actualShows);
// 		}
// });
// }
// var submitBtn = document.getElementsByTagName('button')[0];
// submitBtn.addEventListener('click', addAnewOpt);


//actualShows.addEventListener('click', linkToPage);




































