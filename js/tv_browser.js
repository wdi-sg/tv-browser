// API Docs at:
// http://www.tvmaze.com/api

// global variable for 

var selected = document.getElementById('show-select');

var searchButton = function() {
	var searchSubmission = document.getElementById('search-button');
	searchSubmission.addEventListener('click', searchResults); 
};

// to get the url name for the list request 
var searchResults = function() {
	var url = document.getElementById('show-search').value; 
	// 	The value to be sent to the server
	showListRequest(url);
};

// textContent property sets or returns the text content of the specified node, and all its descendants. ny child nodes are removed and replaced by a single Text node containing the specified string.
// innerText same as textcontent but no applied to style, script, text elements hidden WITH CSS
// The innerHTML property is part (DOM) that allows Javascript code to manipulate a website being displayed. Specifically, it allows reading and replacing everything within a given DOM element (HTML tag)

// can try to use object.keys
// example

// var jem = {
// 	name: "jemima",
// 	age: "100"
// }


var addShowToList = function(showListResponse) {
	selected.innerHTML = '';
	var optionOne = document.createElement('option');
	optionOne.textContent = 'All results matching ' + document.getElementById('show-search').value;
	selected.appendChild(optionOne);
	for (i = 0; i < showListResponse.length; i++) {
		let item = document.createElement('option') 
		// let allows you to declare variables that are limited in scope to the block, statement, or expression on which it is used.
		item.textContent = showListResponse[i].show.name;
		item.setAttribute('id', showListResponse[i].show.id);
		selected.appendChild(item);
	};
	selected.style.display = 'block';
	selectedDetails(showListResponse);
};

var listRequestResponseHandle = function(event) {
	var showListResponse = JSON.parse(this.responseText);
	addShowToList(showListResponse);
};

var errorHandle = function() {
	alert('An error has occured');

};

// request for show list
var showListRequest = function(url) {
	var getShowList = new XMLHttpRequest();
	getShowList.addEventListener('load', listRequestResponseHandle);
	getShowList.addEventListener('error', errorHandle);
	getShowList.open('GET', 'http://api.tvmaze.com/search/shows?q=:' + url);
	getShowList.send();
};


var displaSelectedyDetails = function(selectedDetailsResponse) {
	while(document.getElementById('show-detail').firstChild) {
		document.getElementById('show-detail').removeChild(document.getElementById('show-detail').firstChild);
		// to clear the screen of the previous show
	};
	var selectedShowName = document.createElement('h1');
	selectedShowName.innerText = selected.value;
	document.getElementById('show-detail').appendChild(selectedShowName);
	var selectedShowImg = document.createElement('img');
	selectedShowImg.src = selectedDetailsResponse.image.medium;
	document.getElementById('show-detail').appendChild(selectedShowImg);
	var selectedShowSummary = document.createElement('p');
	selectedShowSummary.innerHTML = selectedDetailsResponse.summary;
	document.getElementById('show-detail').appendChild(selectedShowSummary);
	document.getElementById('show-detail').style.display = 'block';
};

var getSelectedDetailsResponseHandle = function() {
	var selectedDetailsResponse = JSON.parse(this.responseText);
	displaSelectedyDetails(selectedDetailsResponse);
};
// this refers to getselecteddetailsrequest


var selectedShowRequest = function(event) {
	var selectedShowArray = Array.from(selected.children);
	var clickedShow = selectedShowArray[event.target.selectedIndex];
	var clickedShowId = clickedShow.getAttribute('id');
	console.log(clickedShowId);
	var getSelectedDetailsRequest = new XMLHttpRequest();
	getSelectedDetailsRequest.addEventListener('load',getSelectedDetailsResponseHandle);
	getSelectedDetailsRequest.addEventListener('error',errorHandle);
	getSelectedDetailsRequest.open('GET', 'http://api.tvmaze.com/shows/' + clickedShowId);
	getSelectedDetailsRequest.send();
	 // CONTINUE TOMORRRRRRRRR HEREEEEEEEEEEEEEE
}


// event occurs when the checked state has been changed.
var selectedDetails = function(showListResponse) {
	selected.addEventListener('change', selectedShowRequest);
};

// var get


searchButton();
;

