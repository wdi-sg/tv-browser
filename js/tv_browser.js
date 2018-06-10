// // API Docs at:
// // http://www.tvmaze.com/api
// //var optsArr = [];
var showDetails = document.getElementById('show-detail');
var userInput = document.getElementsByTagName('input')[0];
var firstOpt = document.getElementById('firstOpt');

var submitBtn = document.getElementsByTagName('button')[0];
var selection = document.getElementById('show-select');

var dataOfShows = "";

	submitBtn.addEventListener('click', function(){
		firstOpt.innerText = "Shows matching " +userInput.value+ "...";
	//ajax
		var responseHandler = function() {
	  //console.log("response text", this.responseText);
	  	dataOfShows = JSON.parse( this.responseText ); //access the data we just downoladed, by parsing the content that lives in the url into this variable
	   	for(var i = 0; i < dataOfShows.length; i++){
	   		var showOptions = document.createElement('option');
	   		showOptions.innerText = dataOfShows[i].show.name;
	   		selection.appendChild(showOptions);
	  }
	};
		var request = new XMLHttpRequest(); //establish a connection with the url that we specify and lets us send and receive data
		request.open('GET', 'http://api.tvmaze.com/search/shows?q=girls'); //to receive (GETTING) data from the url specified
		request.addEventListener("load", responseHandler); // to listen for loading and do what should happend when the data is loaded
		request.send(); // to send request
	});


do{
	selection.addEventListener('change', function(){
	for(var x = 0; x < dataOfShows.length; x++){

		if (selection.value === dataOfShows[x].show.name){
			var showName = document.createElement('h4');
			showDetails.appendChild(showName);
			showName.innerText = dataOfShows[x].show.name;

			var showImage =  document.createElement('img');
			showDetails.appendChild(showImage);
			showImage.src = dataOfShows[x].show.image.medium;

			var showSummary = document.createElement('p');
			showDetails.appendChild(showSummary);
			showSummary.innerText = dataOfShows[x].show.summary;
	}

}
});
}while(selection.value !== "")
