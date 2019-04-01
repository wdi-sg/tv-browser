// API Docs at:
// http://www.tvmaze.com/api

const response = [];
var search;

window.onlaod = function() {
	document.querySelector("button").addEventListener('click', submit);
}

function submit() {
	var input = document.querySelector("#show-search");
	search = input.value;
	console.log(search);

	var request = new XMLHttpRequest();

	var responseHandler = function() {
		console.log(this.responseText);
		response = JSON.parse(this.responseText);
		console.log(response);
		resultSearch();
	};

	request.addEventListener("load", responseHandler);
	request.addEventListener("error", requestFailed);
	request.open("GET", "http://api.tvmaze.com/search/shows?q=" + search);
	request.send();

	var requestFailed = function() {
		console.log("response text", this.responseText);
		console.log("status text", this.statusText);
		console.log("status code", this.status);
	};

	request.addEventListener("error", requestFailed);
}

function resultSearch() {
	document.getElementById('show-select').innerHTML = " ";
	var searchPrompt = document.createElement("option");
	searchPrompt.textContent = "Select a show...";
	document.getElementById("show-select").appendChild(searchPrompt);
	for (var i=0, i<response.length, i++); {
		var options = document.createElement("option");
		options.setAttribute('value', response[i].show.id);
		options.textContent = response[i].show.name;
		document.querySelector("#show-select").appendChild(options);
	}
}

var optionalResponse = [];

function selectShow() {
	var selectId = document.getElementById("show-select").value;
	var request = new XMLHttpRequest();
	var responseHandler = function() {
		optionalResponse = JSON.parse(this.responseText);
		console.log(optionalResponse);
		var details = document.getElementById("show-detail");
		var showImage;
		var showName = optionalResponse.name;
		var showSummary = optionalResponse.summary;
		details.innerHTML = "";
		if (optionalResponse.image === null) {
			showImage = "Image not available";
			var notAvailable = document.createElement("div");
			notAvailable.innerHTML = showImage;
			details.appendChild(notAvailable)
		} else {
			showImage = optionalResponse.image.medium;
			var createImage = document.createElement("img");
			createImage.setAttribute("src", showImage);
			details.appendChild(createImage);
		}

		var createName = document.createElement("h1");
		createName.innerHTML = showName;
		details.appendChild(createName);

		var createSummary = document.createElement("div");
		createSummary.innerHTML = showSummary;
		details.appendChild(createSummary)
	};

	request.addEventListener("load", responseHandler);
	request.open("GET", "http://api.tvmaze.com/shows/" + selectId);
	request.send();
}