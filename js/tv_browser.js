// API Docs at:
// http://www.tvmaze.com/api

  // all your code goes here

window.onload = function() {
	
	const url = "http://api.tvmaze.com/search/shows?q=";
	var showSearch = "";
	var response = "";

	var responseHandler = function() {

		// console.log("response text", this.responseText);
		response = JSON.parse(this.responseText);
		console.log(response);

		//for loop using response
		for (var i =0; i <response.length; i++) {
			var currentObject = response[i];
			var showName = currentObject.show.name;

		// create elements for dropdown box
		var newOption = document.createElement('option');
		newOption.value = showName;
		newOption.text = showName;

		//append elements for dropdown box
		var select = document.getElementById("show-select");
		select.style.display = "block";
		select.appendChild(newOption);
		};
	};

	// make a new request
	var request = new XMLHttpRequest();

	// listen for the request response
	request.addEventListener("load", responseHandler);


// submitting
document.getElementById('submit-button').addEventListener('click', function() {
	// pass value into showSearch
	showSearch = document.getElementById('show-search').value;

	// ready the system by calling open, and specifying the url
	request.open("GET", url + showSearch);

	// send the request
	request.send();

});



document.getElementById('show-select').addEventListener('change', function() {
	var selectedObject = "";
	var selectedChoice = this.value;
	console.log("Selected Choice/this value: " + selectedChoice);

	for (var j=0; j<response.length; j++) {
		var selectedObject = response[j];
		console.log(selectedObject);
		console.log(selectedObject.show.name);

	if (this.value == selectedObject.show.name) {
		var name = selectedObject.show.name;
		var img = selectedObject.show.image.medium;
		var summary = selectedObject.show.summary;
	};
	};

	var showDetail = document.getElementById('show-detail');

	// create and attach elements
    var nameElement = document.createElement('p');
    nameElement.innerText = name;

    var imageElement = document.createElement('img');
    imageElement.src = img;

    var summaryElement = document.createElement('p');
    summaryElement.innerHTML = summary;

    showDetail.appendChild(nameElement);
    showDetail.appendChild(imageElement);
    showDetail.appendChild(summaryElement);

	

});

 var requestFailed = function(){
	  	console.log("response text", this.responseText);
	  	console.log("status text", this.statusText);
	  	console.log("status code", this.status);
};
 request.addEventListener("error", requestFailed);


};





