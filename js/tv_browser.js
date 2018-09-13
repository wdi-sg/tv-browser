// API Docs at:
// http://www.tvmaze.com/api

window.onload = function() {
// document.addEventListener("DOMContentLoaded", function(event) {

var displayArea = document.querySelector('#show-detail')
var selectShow = document.querySelector('#show-select')

function responseHandler() {
	var data = JSON.parse(this.responseText) // converts returned response to object
	
	console.log(data)
	selectShow.setAttribute("style", "display: block") // displays the <select> tag
	var optionDefault = "Select a show..." // to clear the select tag, so that the new options does not append
	selectShow.innerHTML = '<option value="">' + optionDefault + '</option>' // to add in the default option tag
	
	// push titles to options ----------------------------------------
	for (var i = 0; i < data.length; i++) { // add all options inside the select tag
		var option = document.createElement('option')
		option.textContent = data[i].show.name
		option.setAttribute("id", data[i].show.id) // set id in order to access the individual data later
		selectShow.appendChild(option)
	}
	// displayAllStuff(data)
}


// display items on DOM -------------------------------------------
// function displayAllStuff(data) {

// 	for (var i = 0; i < data.length; i++) {
// 		var title = document.createElement('h2');
// 		var summary = document.createElement('div');
// 		var image = document.createElement('img');

		// if (data[i].show.image === null) {
		// 	// do nothing
		// } else {
		// 	image.setAttribute("src", data[i].show.image.medium)
		// }

// 		var showName = data[i].show.name
// 		var showSummary = data[i].show.summary

// 		title.innerHTML = showName
// 		summary.innerHTML = showSummary

// 		displayArea.appendChild(title)
// 		displayArea.appendChild(image)
// 		displayArea.append(summary)

// 	}
// }


function responseHandler2() {
	var oneShowData = JSON.parse(this.responseText) // converts returned response to object
	console.log(oneShowData);
	displayOneShow(oneShowData)
}

// !! ---- not working!!
function errorHandler() {
	console.log("not working!!") 
	console.log(this.statusText) // in case of errors
}
// !! ---- not working!!

function displayOneShow(oneShowData) {

	var title = document.createElement('h1'); // create tag for show name
	var summary = document.createElement('div'); // create tag for show summary
	var image = document.createElement('img'); // create tag for image

	if (oneShowData.image === null) { // some of the shows do not have images
		// do nothing
	} else {
		image.setAttribute("src", oneShowData.image.medium) // add source of image to img tag
	}

	var showName = oneShowData.name
	var showSummary = oneShowData.summary

	title.innerHTML = showName // add title to h1 tag
	summary.innerHTML = showSummary	// add summary to div tag

	displayArea.innerHTML = ""; // clears the display area, if not when click on another option, it will append to bottom of displayArea

	displayArea.append(title)
	displayArea.appendChild(image)
	displayArea.appendChild(summary)
}

// creates a request for all related information
function newRequest(url) {
	var request = new XMLHttpRequest;
	request.addEventListener('load', responseHandler);
	request.addEventListener('error', errorHandler);
	request.open('GET', url);
	request.send();
}

// gets the input value (what was type in the search bar) and uses it tgt with the request function
function onClick() {
	displayArea.innerHTML = ""; // clears displayArea for refresh start!
	var searchQuery = document.querySelector('#show-search').value
	var url = "http://api.tvmaze.com/search/shows?q=" + encodeURIComponent(searchQuery);
	newRequest(url); // sends the request with input value as part of the url
}

// create another ajax call to access individual information
function requestShow(url2) {
	var request2 = new XMLHttpRequest;
	request2.addEventListener('load', responseHandler2);
	request2.addEventListener('error', errorHandler);
	request2.open('GET', url2);
	request2.send();
}

// what happens when the option is clicked
function onClickSelect() {
	var theChosenIndex = selectShow.selectedIndex; // the <select> tag is like an array, it has indexes
	var optionsArr = selectShow.options; // the array of <options>
	var theChosenId = optionsArr[theChosenIndex].id; // the id of the selected option

	var url2 = "http://api.tvmaze.com/shows/" + theChosenId // uses this id in the url to grab individual show details
	requestShow(url2); // sends the request with theChosenId as the request info
	
}

document.querySelector('button').addEventListener('click', onClick); // adds the click event to the submit button

selectShow.addEventListener('change', onClickSelect) // if <select> changes it will grab the id of the selected option (onClickSelect function) 


// });
}