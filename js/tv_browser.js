// API Docs at:
// http://www.tvmaze.com/api

var searchResults;

var detailsBox = document.getElementById('show-details');
var titleBox = document.createElement('div');
titleBox.style.fontSize = 'x-large';
var imageBox = document.createElement('div');
var image = document.createElement('img');
var summaryBox = document.createElement('div');

imageBox.appendChild(image);
detailsBox.appendChild(titleBox);
detailsBox.appendChild(imageBox);
detailsBox.appendChild(summaryBox);

var userInput = document.getElementById('show-search');
var submitButton = 	document.getElementById('submit');
var selection = document.getElementById("show-select");

function showDetails () {
    var idx = this.selectedIndex;
    var tvShow = searchResults[idx - 1];
    titleBox.innerHTML = tvShow.show.name;
    image.src = tvShow.show.image.medium;
    summaryBox.innerHTML = tvShow.show.summary;
}

selection.onchange = showDetails;

function showInput() {
	// console.log(userInput.value);
	var responseHandler = function() {
		var response = JSON.parse(this.responseText);
        searchResults = response;
        for (var i = selection.length - 1; i > 0; i--) { selection.remove(i); }  // clear all the options except the 1st one, have to start from the back otherwise I overshoot the array boundaries
		for (var i = 0; i < response.length; i++) {
			var title = response[i].show.name;
			// fill in the select element with an option element for each result
			var option = document.createElement('option');
			option.text = title; // sets the text for the dropdown option
			selection.add(option); // adding to select only works with add(option)
			// select.addEventListener('load', )
		}
		selection.options[0].text = ("Shows matching " + userInput.value); // make the first / default select option read "Shows matching keyword…".
		selection.style.display = 'block'; // unhides the selector field
	}

	var requestFailed = function() {
		alert("something went wrong " + this.statusText);
	}
	var request = new XMLHttpRequest();
	request.open('GET', 'http://api.tvmaze.com/search/shows?q=' + userInput.value);
	request.addEventListener('load', responseHandler);
	request.addEventListener('error', requestFailed);
	request.send(null);
}


submitButton.addEventListener('click', showInput);



// clear details upon new search (on click of submit)

