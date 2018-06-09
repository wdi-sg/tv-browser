// API Docs at:
// http://www.tvmaze.com/api
window.onload = function() {

function responseHandler() {
	var data = JSON.parse(this.responseText)
	
	var displayArea = document.querySelector('#show-detail')
	
	console.log(data)
	for (var i = 0; i < data.length; i++) {
		var title = document.createElement('h2');
		var summary = document.createElement('div');
		var image = document.createElement('img');

		if (data[i].show.image === null) {
			// do nothing
		} else {
			image.setAttribute("src", data[i].show.image.medium)
		}

		var showName = data[i].show.name
		var showSummary = data[i].show.summary

		title.innerHTML = showName
		summary.innerHTML = showSummary

		displayArea.appendChild(title)
		displayArea.appendChild(image)
		displayArea.append(summary)

	}
}

function errorHandler() {
	console.log(this.statusText)
}


function newRequest(url) {
	var request = new XMLHttpRequest;
	request.addEventListener('load', responseHandler);
	request.addEventListener('error', errorHandler);
	request.open('GET', url);
	request.send();
}

function onClick() {
	var searchQuery = document.querySelector('#show-search').value
	var url = "http://api.tvmaze.com/search/shows?q=" + encodeURIComponent(searchQuery);
	newRequest(url);
}


document.querySelector('button').addEventListener('click', onClick);





}