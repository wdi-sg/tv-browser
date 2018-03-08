//  http://api.tvmaze.com/singlesearch/shows?q=

// get #show-select
var showSelect = document.querySelector('#show-select');
// get submit button
var submitButton = document.getElementById('submit-button')
// unhide field upon submission
var showSearch = document.getElementById('show-search');
var searchValue = showSearch.value;
console.log(searchValue);
var createOption = document.createElement('option');

submitButton.addEventListener('click', function() {
	event.preventDefault();

	showSelect.style.display = 'block';


// get user's input from the search bar

// shows matching...
createOption.textContent = "Shows matching " + searchValue;
showSelect.appendChild(createOption);
// form a search string using the API and the user input

// open XHR to send the search request to the server
var request = new XMLHttpRequest();
request.addEventListener('load', populateShows);
request.open('GET', "http://api.tvmaze.com/search/shows?q=" + searchValue, true);
request.send();

});
// populate shows
//loop through all names and create <option>, set textContent to name, append to showSelect
function populateShows() {
	var shows = JSON.parse(this.responseText);
	createOption.textContent = "Shows matching " + searchValue;
	showSelect.innerHTML = "";
	showSelect.appendChild(createOption);

	shows.forEach(function(response) {
		createOption.textContent = response.show.name;
		createOption.value = response.show.name;
		showSelect.appendChild(createOption);
	})
}
// get name, img, url of a poster, and summary for each shows on json.
var showDetail = document.getElementById('show-detail');
showSelect.addEventListener('change', function(event) {
	event.preventDefault();
	var show = this.value;
	console.log("SHOW : " + show);

	var request = new XMLHttpRequest();
	request.addEventListener('load', populateShows);
	request.open('GET', "http://api.tvmaze.com/search/shows?q=" + show, true);
	request.send();
});

function populateDetails() {
	var details = JSON.parse(this.responseText);
	var title = document.createElement('h1');
	var poster = document.createElement('img');
	var summary = document.createElement('div');

	title.textContent = details.name;
	poster.src = details.image.medium;
	summary.innerHTML = details.summary;

	showDetail.innerHTML = "";
	showDetail.appendChild(title);
	showDetail.appendChild(poster);
	showDetail.appendChild(summary);

};


