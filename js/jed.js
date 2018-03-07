// API Docs at:
// http://www.tvmaze.com/api
//wait for DOM to load

//global variables
var webResponse = [];
var findInput = "";
var showPicked = document.querySelector("#show-select");

window.onload = function() {
//on button click, run this function
	var onSubmit = function(event) {
		event.preventDefault();
		// make a new request
		var request = new XMLHttpRequest();
		// listen for the request response
		request.addEventListener("load", responseHandler);
		//find string in input box
		findInput = document.querySelector("#show-search");
		var inputValue = findInput.value;
		// make input box into string
		var valueURI = encodeURI(inputValue);
		var inputURL = "http://api.tvmaze.com/search/shows?q=" + valueURI;
		console.log(inputURL);
		// ready the system by calling open, and specifying the url
		request.open("GET", inputURL);
		request.send();
};

//add event listener for submit button
	var submitButton = document.querySelector("#submitButton");
	submitButton.addEventListener("click", onSubmit);

//show select element
	var showSelect = function() {
		var selectList = document.querySelector("#show-select");
		selectList.style.cssText = "visibility: visible;"
};

//populate the select element with ID
	var populateSelect = function() {
		var matchingOption = document.createElement("option");
		matchingOption.id = "optionMatch";
		matchingOption.innerText = "Shows matching " + findInput.value + "...";
		var parentSS = document.querySelector("#show-select");
		parentSS.appendChild(matchingOption);

		for (i = 0; i < webResponse.length; i++) {
			var sSoption = document.createElement("option");
			sSoption.id = "option" + i;
			sSoption.innerText = webResponse[i]["show"]["name"];
			parentSS.appendChild(sSoption);

		}
	};

// what to do when we recieve the request
	var responseHandler = function() {
		webResponse = JSON.parse(this.responseText)
		console.log("response text", webResponse);
		console.log("status text", this.statusText);
		console.log("status code", this.status);
	// response takes longer than the js, so need to wait for response before populating select
	// how to wait for response to load before triggering??????
		showSelect();
		populateSelect();
};

//populate show-detail
	var showDetails = function() {
		//print name
		for (i = 0; i < webResponse.length; i++) {
			if (webResponse[i]["show"]["name"] === showPicked.value) {
				var printName = document.createElement("h1");
				printName.innerText = webResponse[i]["show"]["name"]
				var showDetailDiv = document.querySelector("#show-detail");
				showDetailDiv.appendChild(printName);
				var printImage = document.createElement("img");
				printImage.src = webResponse[i]["show"]["image"]["original"];
				showDetailDiv.appendChild(printImage);

			}
		}
	}
	
//event listener for change in show-select
	showPicked.addEventListener("change", showDetails);









};






